import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import Accordion from '@/components/Accordion'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import useHandleRecommendations from '@/container/sites/hooks/useHandleRecommendations'

import { EditIcon } from '@/assets/icons/svgs'
import { MetaDescriptionDataTypes } from '@/container/sites/sitesTypes'

const DescriptionPreview = () => {
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
        model: 'missing_meta_descriptions',
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
        model: 'missing_meta_descriptions',
        filter_conditions: { id: type_id, link_id: linkId, site_id: state?.siteId },
        update_data: { approved: status },
        bulk: false,
      })
    }
  }

  const accordionDescription = (item: MetaDescriptionDataTypes, index: number) => (
    <Flex vertical gap={4}>
      {!!item?.existing_meta_description?.length && (
        <>
          <Typography text="Content:" />
          <Typography text={`Description is currently ${item?.existing_meta_description?.length} characters vs 45+ recommendation`} color="warning" />
        </>
      )}
      <Typography text="Existing:" />
      <Typography text={item?.existing_meta_description || 'Blank'} color="warning" />
      <Flex align="center" gap={16}>
        <Typography text="Suggestion:" />
        <span style={{ cursor: 'pointer' }} className="pointer-icon-fill" onClick={() => editSuggestionHandler(index, item.id)}>
          {EditIcon}
        </span>
      </Flex>
      <Typography
        color="warning"
        text={item?.suggested_description}
        contentEditable={item.id === editedId}
        onBlur={(e) => handleBlur(e, item.id, index, item?.suggested_description)}
        ref={(el) => (editableRefs.current[index] = el)}
      />
    </Flex>
  )

  const optimizedTitlesList = (recommendationData?.data as MetaDescriptionDataTypes[])?.map((item, index) => ({
    url: item?.url_path,
    content: accordionDescription(item, index),
    approve: item.approved,
    id: item?.id,
    linkId: item.link_id,
  }))

  const isApproved = recommendationData?.total_count == recommendationData?.approved_count

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

  const handleBlur = async (e: React.FocusEvent<HTMLElement>, type_id: string, index: number, currentText: string) => {
    const text = e.target.innerText
    if (state?.siteId && currentText != text) {
      await updateRecommendation({ site_id: state?.siteId, data: text, type: 'description', type_id })
    }
    const element = editableRefs.current[index]
    element?.setAttribute('contentEditable', 'false')
  }

  useEffect(() => {
    getRecommendationByType({ page: 1, per_page: 10, type: 'missing_meta_descriptions' })
  }, [])

  return (
    <Container borderRadius boxShadow width={70} className="recommendation-list-container container-bg" padding={'40px 20px'}>
      <Flex vertical gap={16}>
        <Flex align="start">
          <Flex vertical gap={16}>
            <Typography type="h3" text="Optimize Description" />
            <Typography text="Currently Google will show up to 60 characters in the title of your search results, so use them! We've added suggested descriptions below which you may want to edit and approve. In general, we recommend including what the page is about, your brand name, as well as some adjectives or modifiers." />
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
          {optimizedTitlesList.map((item) => (
            <Accordion
              title={item.url}
              description={item.content}
              color="primary"
              ActionButton={
                <Button
                  size="sm"
                  variant="outlined"
                  onClick={(e) => onApprove(e, item.id, item.linkId, item.approve)}
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

export default DescriptionPreview
