import { FocusEvent, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Accordion from '@/components/Accordion'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import { HeadingRecommendations, RecommendationsCountTypes, RecommendationsListTypes } from '@/container/sites/sitesTypes'

import useHandleRecommendations from '@/container/sites/hooks/useHandleRecommendations'

import { EditIcon } from '@/assets/icons/svgs'

const HeadingRecommendationsPreview = ({
  titlesList,
  recommendationCount,
}: {
  titlesList: RecommendationsListTypes['headings_suggestions']
  recommendationCount: RecommendationsCountTypes
}) => {
  const { state } = useLocation()
  const [editedId, setEditedId] = useState<string>()
  const editableRefs = useRef<(HTMLElement | null)[]>([])

  const {
    approveAllSelectedRecommendation,
    approveAllSelectedLoading,
    approveSingleLoading,
    updateRecommendation,
    updateRecommendationsLoading,
    approveSingleRecommendation,
  } = useHandleRecommendations()

  const accordionDescription = (item: HeadingRecommendations, index: number) => (
    <Flex vertical gap={4}>
      <Typography text={item.url} type="h6" />
      {!!item?.heading_content?.length && (
        <>
          <Typography text="Content:" />
          <Typography text={item.heading_content} color="warning" />
        </>
      )}
      <Typography text="Existing:" />
      <Typography text={item?.current_heading || ''} color="warning" />
      <Flex align="center" gap={16}>
        <Typography text="Suggestion:" />
        <span style={{ cursor: 'pointer' }}  className="pointer-icon-fill" onClick={() => editSuggestionHandler(index, item.id)}>
          {EditIcon}
        </span>
      </Flex>
      <Typography
        color="warning"
        text={item?.suggested_heading}
        contentEditable={item.id === editedId}
        onBlur={(e) => handleBlur(e, item.id, index, item?.suggested_heading)}
        ref={(el) => (editableRefs.current[index] = el)}
      />
    </Flex>
  )

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
      await updateRecommendation({ site_id: state?.siteId, data: text, type: 'title', type_id })
    }
    const element = editableRefs.current[index]
    element?.setAttribute('contentEditable', 'false')
  }

  const optimizedTitlesList = titlesList?.map((item, index) => ({
    url: item.url,
    content: accordionDescription(item, index),
    approve: item.approve,
    id: item.id,
  }))

  const onApprove = async (e: React.SyntheticEvent, type_id: string, status: boolean) => {
    setEditedId(type_id)
    e.stopPropagation()
    if (state?.siteId)
      await approveSingleRecommendation({ site_id: state?.siteId, status: status ? 'False' : 'True', type: 'headings_suggestions', type_id })
  }

  const isApproved =
    recommendationCount?.approved_heading_count == recommendationCount?.approved_heading_count + recommendationCount?.un_approved_heading_count

  const handleAllRecommendations = async () => {
    if (state?.siteId) await approveAllSelectedRecommendation({ site_id: state?.siteId, status: 'True', type: 'headings_suggestions' })
  }

  return (
    <Container borderRadius boxShadow width={70} className="recommendation-list-container container-bg" padding={'40px 20px'}>
      <Flex vertical gap={16}>
        <Flex align="start">
          <Flex vertical gap={16}>
            <Typography type="h3" text="Optimize Headline Tags" />
            <Typography text="Headline tags show Google your content’s hierarchy and what the highest priority subject is for your page. These Recommendations will automatically optimize your h1-h6 tags by removing h1 duplicates and promoting or demoting sub-headlines to create the optimal structure. Please note! We will copy all of your existing style tags over to maintain the exact same design, though we advise you to double check." />
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
            Approve All ({recommendationCount?.approved_heading_count}/
            {recommendationCount?.approved_heading_count + recommendationCount?.un_approved_heading_count})
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

export default HeadingRecommendationsPreview
