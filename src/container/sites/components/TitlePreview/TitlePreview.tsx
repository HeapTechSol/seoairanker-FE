import { useParams } from 'react-router-dom'
import { FocusEvent, SyntheticEvent, useEffect, useRef, useState } from 'react'

import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Accordion from '@/components/Accordion'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import ShimmerPlaceholder from '@/components/RadarLoader/ShimmerPlaceholder'

import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'
import useHandleRecommendations from '@/container/sites/hooks/useHandleRecommendations'

import { EditIcon } from '@/assets/icons/svgs'
import { MetaTitleDataTypes } from '@/container/sites/sitesTypes'
import { store, useAppSelector } from '@/api/store'
import { sitesAPI } from '../../api/sitesAPI'

const TitlePreview = ({ link_id: externalLinkId }: { link_id: string }) => {
  const { id: siteId } = useParams()
  const [editedId, setEditedId] = useState<string>()
  const editableRefs = useRef<(HTMLElement | null)[]>([])

  const { getSiteCrawledInfoData } = useHandleSitesLogic()
  const {
    recommendationData,
    getRecommendationByType,
    recommendationDataLoading,
    handleUpdateRecommendations,
    isSingleApproveLoading,
    isSubBulkApproveLoading,
  } = useHandleRecommendations()

  const isApproveAPICallInProgress = useAppSelector((state) => state.sites.isApproveAPICallInProgress)

  const isApproved = recommendationData?.total_count === recommendationData?.approved_count

  const recommendation = recommendationData?.data.find((item) => item.link_id)

  const refreshRecommendations = async () => {
    await getSiteCrawledInfoData({ site_id: siteId || '' })
    await getRecommendationByType({ page: 1, per_page: 10, type: 'missing_meta_titles', link_id: externalLinkId })
  }

  const handleAllRecommendations = async () => {
    if (siteId) {
      await handleUpdateRecommendations(
        {
          model: 'missing_meta_titles',
          filter_conditions: { link_id: recommendation?.link_id, site_id: siteId },
          update_data: { approved: true },
          bulk: true,
        },
        refreshRecommendations
      )
    }
  }

  const onApprove = async (e: SyntheticEvent, type_id: string, linkId: string, status: boolean) => {
    setEditedId(type_id)
    e.stopPropagation()
    if (siteId) {
      await handleUpdateRecommendations(
        {
          model: 'missing_meta_titles',
          filter_conditions: { id: type_id, link_id: linkId, site_id: siteId },
          update_data: { approved: status },
          bulk: false,
        },
        refreshRecommendations
      )
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

  const handleBlur = async (e: FocusEvent<HTMLElement>, type_id: string, index: number, currentText: string, linkId: string) => {
    const text = e.target.innerText
    if (siteId && currentText != text) {
      await handleUpdateRecommendations(
        {
          model: 'missing_meta_titles',
          filter_conditions: { id: type_id, link_id: linkId, site_id: siteId },
          update_data: { approved: true, suggested_title: text },
          bulk: false,
        },
        refreshRecommendations
      )
    }
    const element = editableRefs.current[index]
    element?.setAttribute('contentEditable', 'false')
  }

  const isLoadMore = (recommendationData?.total_count || 0) > (recommendationData?.data?.length || 0)

  const handleLoadMore = () => {
    getRecommendationByType({ page: (recommendationData?.page || 0) + 1, per_page: 10, type: 'missing_meta_titles', link_id: externalLinkId })
  }

  useEffect(() => {
    getRecommendationByType({ page: 1, per_page: 10, type: 'missing_meta_titles', link_id: externalLinkId })
    const interval = setInterval(() => {
      const afterCached = sitesAPI.endpoints.getRecommendationsByType.select({
        site_id: siteId || '',
        link_id: externalLinkId,
        page: 1,
        per_page: 10,
        type: 'missing_meta_titles',
      })(store.getState())
      if (afterCached?.status === 'fulfilled') {
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalLinkId])

  const renderAccordionDescription = (item: MetaTitleDataTypes, index: number) => (
    <Flex vertical gap={4}>
      {!!item?.existing_meta_title?.length && (
        <>
          <Typography text="Content:" />
          <Typography text={`Title tag is currently ${item?.existing_meta_title?.length} characters vs 30-65 recommended`} color="warning" />
        </>
      )}
      <Typography text="Existing:" />
      <Typography text={item?.existing_meta_title || ''} color="warning" />
      <Flex align="center" gap={16}>
        <Typography text="Suggestion:" />
        <span style={{ cursor: 'pointer' }} className="pointer-icon-fill" onClick={() => editSuggestionHandler(index, item.id)}>
          {EditIcon}
        </span>
      </Flex>
      <Typography
        color="warning"
        text={item?.suggested_title}
        contentEditable={item.id === editedId}
        onBlur={(e) => handleBlur(e, item.id, index, item?.suggested_title, item.link_path)}
        ref={(el) => (editableRefs.current[index] = el)}
      />
    </Flex>
  )

  const optimizedTitlesList = (recommendationData?.data as MetaTitleDataTypes[])?.map((item, index) => ({
    url: item?.link_path,
    link_id: item.link_id,
    content: renderAccordionDescription(item, index),
    approve: item.approved,
    id: item.id,
  }))

  return (
    <Container borderRadius boxShadow width={70} className="recommendation-list-container container-bg">
      <ShimmerPlaceholder loading={recommendationDataLoading}>
        <Flex vertical gap={16}>
          <Flex align="start" padding="40px 40px 0px 40px">
            <Flex vertical gap={16}>
              <Typography type="h3" text="Optimize Titles" />
              <Typography text="Currently Google will show up to 60 characters in the title of your search results, so use them! We've added suggested titles below which you may want to edit and approve. In general, we recommend including what the page is about, your brand name, as well as some adjectives or modifiers." />
            </Flex>
            <Button
              size="sm"
              variant="outlined"
              type="borderRadius"
              color="success"
              disabled={isApproved || isApproveAPICallInProgress}
              loading={isSubBulkApproveLoading}
              onClick={handleAllRecommendations}
            >
              Approve All ({recommendationData?.approved_count || 0}/{recommendationData?.total_count || 0})
            </Button>
          </Flex>
          <Flex justify="center" align="center" wrap gap={8} className="preview-details-list" padding="0px 40px 40px 40px">
            <Flex vertical>
              {optimizedTitlesList?.map((item) => (
                <Accordion
                  key={item.id}
                  title={item.url}
                  description={item.content}
                  color="primary"
                  ActionButton={
                    <Button
                      size="sm"
                      variant="outlined"
                      onClick={(e) => onApprove(e, item.id, item.link_id, !item.approve)}
                      type="borderRadius"
                      color={item.approve ? 'error' : 'success'}
                      disabled={isApproveAPICallInProgress}
                      loading={editedId === item.id && isSingleApproveLoading}
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

export default TitlePreview