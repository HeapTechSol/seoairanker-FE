import { FocusEvent, SyntheticEvent, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import Accordion from '@/components/Accordion'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import useHandleRecommendations from '@/container/sites/hooks/useHandleRecommendations'

import { EditIcon } from '@/assets/icons/svgs'
import { OgTagsDataTypes } from '@/container/sites/sitesTypes'

const SocialPreview = () => {
  const { state } = useLocation()
  const [editedId, setEditedId] = useState<string>()
  const editableRefs = useRef<(HTMLElement | null)[]>([])

  const {
    recommendationData,
    getRecommendationByType,
    recommendationDataLoading,
    updateRecommendationsLoading,
    updateRecommendation,
    handleUpdateRecommendations,
    approveRecommendationsLoading,
  } = useHandleRecommendations()

  const recommendation = recommendationData?.data.find((item) => item.link_id)

  const handleAllRecommendations = async () => {
    if (state?.siteId) {
      await handleUpdateRecommendations({
        model: 'og_tags',
        filter_conditions: { link_id: recommendation?.link_id, site_id: state?.siteId },
        update_data: { approved: true },
        bulk: true,
      })
    }
  }

  const onApprove = async (e: SyntheticEvent, type_id: string, linkId: string, status: boolean) => {
    setEditedId(type_id)
    e.stopPropagation()
    if (state?.siteId) {
      await handleUpdateRecommendations({
        model: 'og_tags',
        filter_conditions: { id: type_id, link_id: linkId, site_id: state?.siteId },
        update_data: { approved: status },
        bulk: false,
      })
    }
  }

  const editSuggestionHandler = (index: number, id: string) => {
    setEditedId(id)
    const element = editableRefs.current[index]
    if (element) {
      element.setAttribute('contentEditable', 'true')
      element.focus()
      const range = document.createRange()
      range.selectNodeContents(element)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
    }
  }

  const handleBlur = async (e: FocusEvent<HTMLElement>, type_id: string, index: number, currentText: string) => {
    const text = e.target.innerText
    if (state?.siteId && currentText != text) {
      await updateRecommendation({ site_id: state?.siteId, data: text, type: 'og_tag', type_id })
    }
    const element = editableRefs.current[index]
    element?.setAttribute('contentEditable', 'false')
  }

  const accordionDescription = (item: OgTagsDataTypes, index: number) => (
    <Flex vertical gap={4}>
      <Typography text="Existing:" />
      <Typography text={item?.existing_og_tag || ''} color="warning" />
      <Flex align="center" gap={16}>
        <Typography text="Suggestion:" />
        <span style={{ cursor: 'pointer' }} className="pointer-icon-fill" onClick={() => editSuggestionHandler(index, item.id)}>
          {EditIcon}
        </span>
      </Flex>
      <Typography
        color="warning"
        text={item?.suggested_og_tag}
        contentEditable={item.id === editedId}
        onBlur={(e) => handleBlur(e, item.id, index, item?.suggested_og_tag)}
        ref={(el) => (editableRefs.current[index] = el)}
      />
    </Flex>
  )

  const optimizedTitlesList = (recommendationData?.data as OgTagsDataTypes[])?.map((item, index) => ({
    url: item?.link_path,
    content: accordionDescription(item, index),
    approve: item.approved,
    id: item.id,
    linkId: item.link_id,
  }))

  const isApproved = recommendationData?.total_count == recommendationData?.approved_count

  useEffect(() => {
    getRecommendationByType({ page: 1, per_page: 10, type: 'og_tags' })
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container borderRadius boxShadow width={70} className="recommendation-list-container container-bg" padding={'40px 20px'}>
      <Flex vertical gap={16}>
        <Flex align="start">
          <Flex vertical gap={16}>
            <Typography type="h3" text="Add a Social Preview" />
            <Typography text="Ever share your site on social media? That image and text you see is your social preview. You can use that to best optimize clicks and engagement. Edit and approve the recommendation to add a social preview card across your site." />
          </Flex>
          <Button
            size="sm"
            variant="outlined"
            type="borderRadius"
            color="success"
            disabled={isApproved}
            loading={approveRecommendationsLoading}
            onClick={handleAllRecommendations}
          >
            Approve All ({recommendationData?.approved_count || 0}/{recommendationData?.total_count || 0})
          </Button>
        </Flex>
        <Flex vertical gap={10}>
          {optimizedTitlesList?.map((item) => (
            <Accordion
              title={item.url}
              description={item.content}
              color="primary"
              ActionButton={
                <Button
                  size="sm"
                  variant="outlined"
                  onClick={(e) => onApprove(e, item.id, item.linkId, !item.approve)}
                  type="borderRadius"
                  color={item.approve ? 'error' : 'success'}
                  loading={editedId === item.id && (approveRecommendationsLoading || updateRecommendationsLoading)}
                >
                  {item.approve ? 'Reject' : 'Approve'}
                </Button>
              }
            />
          ))}
        </Flex>
      </Flex>
      <Loader loading={recommendationDataLoading} />
    </Container>
  )
}

export default SocialPreview
