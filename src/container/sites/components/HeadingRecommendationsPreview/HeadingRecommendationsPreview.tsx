import { useParams } from 'react-router-dom'
import { FocusEvent, SyntheticEvent, useEffect, useRef, useState } from 'react'

import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Accordion from '@/components/Accordion'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import ShimmerPlaceholder from '@/components/ShimmerPlaceholder/ShimmerPlaceholder'

import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'
import useHandleRecommendations from '@/container/sites/hooks/useHandleRecommendations'

import { EditIcon } from '@/assets/icons/svgs'
import { HeadingOptimizationDataTypes } from '@/container/sites/sitesTypes'

const HeadingRecommendationsPreview = ({ link_id: externalLinkId }: { link_id: string }) => {
  const { id: siteId } = useParams()
  const [editedId, setEditedId] = useState<string>()
  const editableRefs = useRef<(HTMLElement | null)[]>([])

  const { getSiteCrawledInfoData } = useHandleSitesLogic()
  const { recommendationData, getRecommendationByType, recommendationDataLoading, handleUpdateRecommendations, approveRecommendationsLoading } =
    useHandleRecommendations()

  const recommendation = recommendationData?.data.find((item) => item.link_id)

  const handleAllRecommendations = async () => {
    if (siteId) {
      await handleUpdateRecommendations({
        model: 'heading_suggestions',
        filter_conditions: { link_id: recommendation?.link_id, site_id: siteId },
        update_data: { approved: true },
        bulk: true,
      })
      await getSiteCrawledInfoData({ site_id: siteId, link_id: externalLinkId })
      await getRecommendationByType({ page: 1, per_page: 10, type: 'heading_suggestions', link_id: externalLinkId })
    }
  }

  const onApprove = async (e: SyntheticEvent, type_id: string, linkId: string, status: boolean) => {
    setEditedId(type_id)
    e.stopPropagation()
    if (siteId) {
      await handleUpdateRecommendations({
        model: 'heading_suggestions',
        filter_conditions: { id: type_id, link_id: linkId, site_id: siteId },
        update_data: { approved: status },
        bulk: false,
      })
      await getSiteCrawledInfoData({ site_id: siteId, link_id: externalLinkId })
      await getRecommendationByType({ page: 1, per_page: 10, type: 'heading_suggestions', link_id: externalLinkId })
    }
  }

  const accordionDescription = (item: HeadingOptimizationDataTypes, index: number) => (
    <Flex vertical gap={4}>
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
        <span style={{ cursor: 'pointer' }} className="pointer-icon-fill" onClick={() => editSuggestionHandler(index, item.id)}>
          {EditIcon}
        </span>
      </Flex>
      <Typography
        color="warning"
        text={item?.suggested_heading}
        contentEditable={item.id === editedId}
        onBlur={(e) => handleBlur(e, item.id, index, item?.suggested_heading, item.link_id)}
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

  const handleBlur = async (e: FocusEvent<HTMLElement>, type_id: string, index: number, currentText: string, linkId: string) => {
    const text = e.target.innerText
    if (siteId && currentText != text) {
      await handleUpdateRecommendations({
        model: 'heading_suggestions',
        filter_conditions: { id: type_id, link_id: linkId, site_id: siteId },
        update_data: { approved: true, suggested_heading: text },
        bulk: false,
      })
      await getSiteCrawledInfoData({ site_id: siteId, link_id: externalLinkId })
      await getRecommendationByType({ page: 1, per_page: 10, type: 'heading_suggestions', link_id: externalLinkId })
    }
    const element = editableRefs.current[index]
    element?.setAttribute('contentEditable', 'false')
  }

  const optimizedTitlesList = (recommendationData?.data as HeadingOptimizationDataTypes[])?.map((item, index) => ({
    url: item?.link_path,
    content: accordionDescription(item, index),
    approve: item.approved,
    id: item.id,
    linkId: item.link_id,
  }))

  const isApproved = recommendationData?.total_count == recommendationData?.approved_count

  const isLoadMore = (recommendationData?.total_count || 0) > (recommendationData?.data?.length || 0)

  const handleLoadMore = () => {
    getRecommendationByType({ page: (recommendationData?.page || 0) + 1, per_page: 10, type: 'heading_suggestions', link_id: externalLinkId })
  }

  useEffect(() => {
    getRecommendationByType({ page: 1, per_page: 10, type: 'heading_suggestions', link_id: externalLinkId })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalLinkId])

  return (
    <Container borderRadius boxShadow width={70} className="recommendation-list-container container-bg">
      <ShimmerPlaceholder loading={recommendationDataLoading}>
        <Flex vertical gap={16}>
          <Flex align="start" padding="40px 40px 0px 40px">
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
              loading={approveRecommendationsLoading}
              onClick={handleAllRecommendations}
            >
              Approve All ({recommendationData?.approved_count || 0}/{recommendationData?.total_count || 0})
            </Button>
          </Flex>
          <Flex justify="center" align="center" wrap gap={8} className="preview-details-list" padding="0px 40px 40px 40px">
            <Flex vertical>
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
                      loading={editedId === item.id && approveRecommendationsLoading}
                    >
                      {item.approve ? 'Reject' : 'Approve'}
                    </Button>
                  }
                />
              ))}
            </Flex>
            {isLoadMore && (
              <Button color="info" variant="text" type="borderRadius" onClick={handleLoadMore}>
                Load More
              </Button>
            )}
          </Flex>
        </Flex>
      </ShimmerPlaceholder>
    </Container>
  )
}

export default HeadingRecommendationsPreview
