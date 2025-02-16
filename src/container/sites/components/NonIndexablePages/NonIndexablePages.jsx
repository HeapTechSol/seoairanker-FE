import { FocusEvent, SyntheticEvent, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Accordion from '@/components/Accordion'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import ShimmerPlaceholder from '@/components/RadarLoader/ShimmerPlaceholder'

import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'
import useHandleRecommendations from '@/container/sites/hooks/useHandleRecommendations'

import { EditIcon } from '@/assets/icons/svgs'
import { sitesAPI } from '../../api/sitesAPI'
import { store, useAppSelector } from '@/api/store'

const NonIndexablePages = ({ link_id: externalLinkId }) => {
  const { id: siteId } = useParams()
  const [editedId, setEditedId] = useState()
  const editableRefs = useRef([])

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
  const recommendation = recommendationData?.data.find((item) => item.link_id)

  const refreshRecommendations = async () => {
    await getSiteCrawledInfoData({ site_id: siteId || '' })
    await getRecommendationByType({ page: 1, per_page: 10, type: 'non_indexable_pages', link_id: externalLinkId })
  }

  const handleAllRecommendations = async () => {
    if (siteId) {
      await handleUpdateRecommendations(
        {
          model: 'non_indexable_pages',
          filter_conditions: { link_id: recommendation?.link_id, site_id: siteId },
          update_data: { approved: true },
          bulk: true,
        },
        refreshRecommendations
      )
    }
  }

  const onApprove = async (e, type_id, linkId, status) => {
    setEditedId(type_id)
    e.stopPropagation()
    if (siteId) {
      await handleUpdateRecommendations(
        {
          model: 'non_indexable_pages',
          filter_conditions: { id: type_id, link_id: linkId, site_id: siteId },
          update_data: { approved: status },
          bulk: false,
        },
        refreshRecommendations
      )
    }
  }

  const editSuggestionHandler = (index, id) => {
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

  const handleBlur = async (e, type_id, index, currentText, linkId) => {
    const text = e.target.innerText
    if (siteId && currentText != text) {
      await handleUpdateRecommendations(
        {
          model: 'non_indexable_pages',
          filter_conditions: { id: type_id, link_id: linkId, site_id: siteId },
          update_data: { approved: true, suggested_og_tag: text },
          bulk: false,
        },
        refreshRecommendations
      )
    }
    const element = editableRefs.current[index]
    element?.setAttribute('contentEditable', 'false')
  }

  const accordionDescription = (item, index) => (
    <Flex vertical gap={4}>
      <Typography
        color="warning"
        text={'Block Reason: ' + item?.reason}
        contentEditable={item.id === editedId}
        onBlur={(e) => handleBlur(e, item.id, index, item?.reason, item.link_id)}
        ref={(el) => (editableRefs.current[index] = el)}
      />
    </Flex>
  )

  const optimizedTitlesList = (recommendationData?.data)?.map((item, index) => ({
    url: item?.url,
    content: accordionDescription(item, index),
    approve: item.approved,
    id: item.id
  }))

  const isApproved = recommendationData?.total_count == recommendationData?.approved_count
  const isLoadMore = (recommendationData?.total_count || 0) > (recommendationData?.data?.length || 0)

  const handleLoadMore = () => {
    getRecommendationByType({ page: (recommendationData?.page || 0) + 1, per_page: 10, type: 'non_indexable_pages', link_id: externalLinkId })
  }

  useEffect(() => {
    getRecommendationByType({ page: 1, per_page: 10, type: 'non_indexable_pages', link_id: externalLinkId })
    const interval = setInterval(() => {
      const afterCached = sitesAPI.endpoints.getRecommendationsByType.select({
        site_id: siteId || '',
        link_id: externalLinkId,
        page: 1,
        per_page: 10,
        type: 'non_indexable_pages',
      })(store.getState())
      if (afterCached?.status === 'fulfilled') {
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalLinkId])

  return (
    <Container borderRadius boxShadow width={70} className="recommendation-list-container container-bg">
      <ShimmerPlaceholder loading={recommendationDataLoading}>
        <Flex vertical gap={16}>
          <Flex align="start" padding="40px 40px 0px 40px">
            <Flex vertical gap={16}>
              <Typography type="h3" text="Non Indexable Pages" />
              <Typography text="Pages that are blocked from being indexed by Google and other search engines through robots.txt, HTTP headers, or meta tags settings." />
            </Flex>
            {/* <Button
              size="sm"
              variant="outlined"
              type="borderRadius"
              color="success"
              disabled={isApproved || isApproveAPICallInProgress}
              loading={isSubBulkApproveLoading}
              onClick={handleAllRecommendations}
            >
              Approve All ({recommendationData?.approved_count || 0}/{recommendationData?.total_count || 0})
            </Button> */}
          </Flex>
          <Flex justify="center" align="center" wrap gap={8} className="preview-details-list" padding="0px 40px 40px 40px">
            <Flex vertical>
              {optimizedTitlesList?.map((item) => (
                <Accordion
                  title={item.url}
                  description={item.content}
                  color="primary"
                  key={item.id}
                  ActionButton={
                    <Button
                      size="sm"
                      variant="outlined"
                      onClick={(e) => onApprove(e, item.id, item.linkId, !item.approve)}
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

export default NonIndexablePages
