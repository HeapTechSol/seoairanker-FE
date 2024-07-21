import { useLocation } from 'react-router-dom'
import { SyntheticEvent, useEffect, useRef, useState } from 'react'

import Flex from '@/components/Flex'
import Table from '@/components/Table'
import Button from '@/components/Button'
import TruncateText from '@/components/TruncateText'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import ShimmerPlaceholder from '@/components/RadarLoader/ShimmerPlaceholder'

import useHandleRecommendations from '@/container/sites/hooks/useHandleRecommendations'

import { EditIcon } from '@/assets/icons/svgs'
import { MissingTitlesDataTypes } from '@/container/sites/sitesTypes'

import './TitlesList.scss'
import { ColumnType } from '@/components/Table/types'

const TitleList = ({ link_id }: { link_id: string }) => {
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
        model: 'anchor_titles',
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
        model: 'anchor_titles',
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

  const handleBlur = async (e: React.FocusEvent<HTMLElement>, type_id: string, index: number, currentText: string) => {
    setEditedId(type_id)
    const text = e.target.innerText
    if (state?.siteId && currentText != text) {
      await updateRecommendation({ site_id: state?.siteId, data: text, type: 'missing_titles', type_id })
    }
    const element = editableRefs.current[index]
    element?.setAttribute('contentEditable', 'false')
  }

  const columns: ColumnType<MissingTitlesDataTypes>[] = [
    { header: 'Link', dataKey: 'link_path', render: (text: string) => <TruncateText text={text} line={1} width={300}></TruncateText> },
    {
      header: 'Title',
      dataKey: 'suggested_title',
      render: (text: string, record: MissingTitlesDataTypes, index: number) => {
        return (
          <Flex align="center" gap={16}>
            <Typography
              color="warning"
              text={<TruncateText text={text} line={1} width={400}></TruncateText>}
              contentEditable={record.id === editedId}
              onBlur={(e) => handleBlur(e, record.id, index, record.suggested_title)}
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
      render: (_, record) => (
        <Flex gap={12} align="center" justify="center">
          <Button
            size="sm"
            variant="outlined"
            onClick={(e) => onApprove(e, record.id, record.link_id, record.approved)}
            type="borderRadius"
            color={record.approved ? 'error' : 'success'}
            loading={editedId === record.id && (approveRecommendationsLoading || updateRecommendationsLoading)}
          >
            {record.approved ? 'Reject' : 'Approve'}
          </Button>
        </Flex>
      ),
    },
  ]

  const isApproved = recommendationData?.total_count == recommendationData?.approved_count

  useEffect(() => {
    getRecommendationByType({ page: 1, per_page: 10, type: 'anchor_titles', link_id })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link_id])

  return (
    <Container borderRadius boxShadow padding={40} className="titles-list-container container-bg" width={70}>
      <ShimmerPlaceholder loading={recommendationDataLoading}>
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
                loading={approveRecommendationsLoading}
                onClick={handleAllRecommendations}
              >
                Approve All ({recommendationData?.approved_count || 0}/{recommendationData?.total_count || 0})
              </Button>
            </Flex>
          </Flex>
          <Table columns={columns} data={(recommendationData?.data as MissingTitlesDataTypes[]) || []} />
        </Flex>
      </ShimmerPlaceholder>
    </Container>
  )
}

export default TitleList
