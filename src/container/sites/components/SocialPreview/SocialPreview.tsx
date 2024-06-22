import { FocusEvent, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Accordion from '@/components/Accordion'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import { OG_TagsRecommendations, RecommendationsCountTypes, RecommendationsListTypes } from '@/container/sites/sitesTypes'

import useHandleRecommendations from '@/container/sites/hooks/useHandleRecommendations'

import { EditIcon } from '@/assets/icons/svgs'

const SocialPreview = ({
  titlesList,
  recommendationCount,
}: {
  titlesList: RecommendationsListTypes['og_tags']
  recommendationCount: RecommendationsCountTypes
}) => {
  const { state } = useLocation()
  const [editedId, setEditedId] = useState<string>()
  const editableRefs = useRef<(HTMLElement | null)[]>([])

  const {
    approveAllSelectedRecommendation,
    approveAllSelectedLoading,
    updateRecommendationsLoading,
    approveSingleLoading,
    updateRecommendation,
    approveSingleRecommendation,
  } = useHandleRecommendations()

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

  const accordionDescription = (item: OG_TagsRecommendations, index:number) => (
    <Flex vertical gap={4}>
      <Typography text={item.url} type="h6" />
      <Typography text="Existing:" />
      <Typography text={item?.existing_og_tag || ''} color="warning" />
      <Flex align="center" gap={16}>
        <Typography text="Suggestion:" />
        <span style={{ cursor: 'pointer' }}  className="pointer-icon-fill" onClick={() => editSuggestionHandler(index, item.id)}>
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

  const optimizedTitlesList = titlesList?.map((item, index) => ({ url: item.url, content: accordionDescription(item,index), approve: item.approve, id: item.id }))

  const onApprove = async (e: React.SyntheticEvent, type_id: string, status: boolean) => {
    setEditedId(type_id)
    e.stopPropagation()
    if (state?.siteId) await approveSingleRecommendation({ site_id: state?.siteId, status: status ? 'False' : 'True', type: 'og_tag', type_id })
  }

  const isApproved =
    recommendationCount?.approved_og_tags_count == recommendationCount?.approved_og_tags_count + recommendationCount?.un_approved_og_tags_count

  const handleAllRecommendations = async () => {
    if (state?.siteId) await approveAllSelectedRecommendation({ site_id: state?.siteId, status: 'True', type: 'og_tag' })
  }

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
            loading={approveAllSelectedLoading}
            onClick={handleAllRecommendations}
          >
            Approve All ({recommendationCount?.approved_og_tags_count}/
            {recommendationCount?.approved_og_tags_count + recommendationCount?.un_approved_og_tags_count})
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
                  onClick={(e) => onApprove(e, item.id, item.approve)}
                  type="borderRadius"
                  color={item.approve ? 'error' : 'success'}
                  loading={editedId === item.id && (approveSingleLoading || updateRecommendationsLoading)}
                >
                  {item.approve ? 'Reject' : 'Approve'}
                </Button>
              }
            />
          ))}
        </Flex>
      </Flex>
    </Container>
  )
}

export default SocialPreview
