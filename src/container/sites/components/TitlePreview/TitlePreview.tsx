import { useLocation } from 'react-router-dom'
import { FocusEvent, SyntheticEvent, useRef, useState } from 'react'

import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Accordion from '@/components/Accordion'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import { RecommendationsCountTypes, RecommendationsListTypes, TitlesRecommendations } from '@/container/sites/sitesTypes'

import useHandleRecommendations from '@/container/sites/hooks/useHandleRecommendations'

import { EditIcon } from '@/assets/icons/svgs'

type TitlePreviewProps = {
  titlesList: RecommendationsListTypes['titles']
  recommendationCount: RecommendationsCountTypes
}

const TitlePreview = ({ titlesList, recommendationCount }: TitlePreviewProps) => {
  const { state } = useLocation()
  const [editedId, setEditedId] = useState<string>()
  const editableRefs = useRef<(HTMLElement | null)[]>([])

  const {
    approveSingleLoading,
    updateRecommendation,
    approveAllSelectedLoading,
    approveSingleRecommendation,
    updateRecommendationsLoading,
    approveAllSelectedRecommendation,
  } = useHandleRecommendations()

  const isApproved =
    recommendationCount?.approved_title_count === recommendationCount?.approved_title_count + recommendationCount?.un_approved_title_count

  const handleAllRecommendations = async () => {
    if (state?.siteId) {
      await approveAllSelectedRecommendation({ site_id: state?.siteId, status: 'True', type: 'title' })
    }
  }

  const onApprove = async (e: SyntheticEvent, type_id: string, status: boolean) => {
    setEditedId(type_id)
    e.stopPropagation()
    if (state?.siteId) {
      await approveSingleRecommendation({ site_id: state?.siteId, status: status ? 'False' : 'True', type: 'title', type_id })
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
      await updateRecommendation({ site_id: state?.siteId, data: text, type: 'title', type_id })
    }
    const element = editableRefs.current[index]
    element?.setAttribute('contentEditable', 'false')
  }

  const renderAccordionDescription = (item: TitlesRecommendations, index: number) => (
    <Flex vertical gap={4}>
      <Typography text={item.url} type="h6" />
      {!!item?.existing_title?.length && (
        <>
          <Typography text="Content:" />
          <Typography text={`Title tag is currently ${item?.existing_title?.length} characters vs 45+ recommendation`} color="warning" />
        </>
      )}
      <Typography text="Existing:" />
      <Typography text={item?.existing_title || ''} color="warning" />
      <Flex align="center" gap={16}>
        <Typography text="Suggestion:" />
        <span style={{ cursor: 'pointer' }}  className="pointer-icon-fill" onClick={() => editSuggestionHandler(index, item.id)}>
          {EditIcon}
        </span>
      </Flex>
      <Typography
        color="warning"
        text={item?.suggested_title}
        contentEditable={item.id === editedId}
        onBlur={(e) => handleBlur(e, item.id, index, item?.suggested_title)}
        ref={(el) => (editableRefs.current[index] = el)}
      />
    </Flex>
  )

  const optimizedTitlesList = titlesList?.map((item, index) => ({
    url: item.url,
    content: renderAccordionDescription(item, index),
    approve: item.approve,
    id: item.id,
  }))

  return (
    <Container borderRadius boxShadow width={70} className="recommendation-list-container container-bg" padding="40px 20px">
      <Flex vertical gap={16}>
        <Flex align="start">
          <Flex vertical gap={16}>
            <Typography type="h3" text="Optimize Titles" />
            <Typography text="Currently Google will show up to 60 characters in the title of your search results, so use them! We've added suggested titles below which you may want to edit and approve. In general, we recommend including what the page is about, your brand name, as well as some adjectives or modifiers." />
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
            Approve All ({recommendationCount?.approved_title_count}/
            {recommendationCount?.approved_title_count + recommendationCount?.un_approved_title_count})
          </Button>
        </Flex>
        <Flex vertical gap={10}>
          {optimizedTitlesList.map((item) => (
            <Accordion
              key={item.id}
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

export default TitlePreview
