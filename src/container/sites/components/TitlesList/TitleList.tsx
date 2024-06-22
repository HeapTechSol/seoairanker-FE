import { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Flex from '@/components/Flex'
import Table from '@/components/Table'
import Button from '@/components/Button'
import TruncateText from '@/components/TruncateText'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import { AnchorTitlesRecommendations, RecommendationsCountTypes } from '@/container/sites/sitesTypes'

import useHandleRecommendations from '@/container/sites/hooks/useHandleRecommendations'

import './TitlesList.scss'
import { EditIcon } from '@/assets/icons/svgs'

const TitleList = ({
  titlesList,
  recommendationCount,
}: {
  titlesList: AnchorTitlesRecommendations[]
  recommendationCount: RecommendationsCountTypes
}) => {
  const { state } = useLocation()
  const [editedId, setEditedId] = useState<string>()
  const editableRefs = useRef<(HTMLElement | null)[]>([])

  const {
    approveSingleLoading,
    updateRecommendation,
    updateRecommendationsLoading,
    approveAllSelectedLoading,
    approveSingleRecommendation,
    approveAllSelectedRecommendation,
  } = useHandleRecommendations()

  const onApprove = async (e: React.SyntheticEvent, type_id: string, status: boolean) => {
    setEditedId(type_id)
    e.stopPropagation()
    if (state?.siteId)
      await approveSingleRecommendation({ site_id: state?.siteId, status: status ? 'False' : 'True', type: 'missing_titles', type_id })
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

  const handleBlur = async (e: React.FocusEvent<HTMLElement>, type_id: string, index: number, currentText: string) => {
    setEditedId(type_id)
    const text = e.target.innerText
    if (state?.siteId && currentText != text) {
      await updateRecommendation({ site_id: state?.siteId, data: text, type: 'missing_titles', type_id })
    }
    const element = editableRefs.current[index]
    element?.setAttribute('contentEditable', 'false')
  }

  const columns = [
    { header: 'Link', dataKey: 'link_url', render: (text: string) => <TruncateText text={text} line={1} width={300}></TruncateText> },
    {
      header: 'Title',
      dataKey: 'suggested_link_title',
      render: (text: string, record: AnchorTitlesRecommendations, index: number) => {
        return (
          <Flex align="center" gap={16}>
            <Typography
              color="warning"
              text={<TruncateText text={text} line={1} width={400}></TruncateText>}
              contentEditable={record.id === editedId}
              onBlur={(e) => handleBlur(e, record.id, index, record.suggested_link_title)}
              ref={(el) => (editableRefs.current[index] = el)}
            />
            <span className="pointer-icon-fill" onClick={() => editSuggestionHandler(index, record.id)}>
              {EditIcon}
            </span>
          </Flex>
        )
      },
    },
    {
      header: 'Action',
      dataKey: '',
      render: (_: any, record: AnchorTitlesRecommendations) => (
        <Flex gap={12} align="center" justify="center">
          <Button
            size="sm"
            variant="outlined"
            onClick={(e) => onApprove(e, record.id, record.approve)}
            type="borderRadius"
            color={record.approve ? 'error' : 'success'}
            loading={editedId === record.id && (approveSingleLoading || updateRecommendationsLoading)}
          >
            {record.approve ? 'Reject' : 'Approve'}
          </Button>
        </Flex>
      ),
    },
  ]

  const isApproved =
    recommendationCount?.approved_missing_title_count ==
    recommendationCount?.approved_missing_title_count + recommendationCount?.un_approved_missing_title_count

  const handleAllRecommendations = async () => {
    if (state?.siteId) await approveAllSelectedRecommendation({ site_id: state?.siteId, status: 'True', type: 'missing_titles' })
  }

  return (
    <Container borderRadius boxShadow padding={40} className="titles-list-container container-bg" width={70}>
      <Flex vertical gap={16}>
        <Flex vertical gap={16}>
          <Flex align="start">
            <Flex vertical gap={16}>
              <Typography type="h3" text="Links Missing Titles" />
              <Typography text="Link titles not only tell Google what your link is about, but they are also used as previews in browsers and by users with disabilities. Making your site as accessible as possible is an important quality factor." />
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
              Approve All ({recommendationCount?.approved_missing_title_count}/
              {recommendationCount?.approved_missing_title_count + recommendationCount?.un_approved_missing_title_count})
            </Button>
          </Flex>
        </Flex>
        <Table columns={columns} data={titlesList || []} />
      </Flex>
    </Container>
  )
}

export default TitleList
