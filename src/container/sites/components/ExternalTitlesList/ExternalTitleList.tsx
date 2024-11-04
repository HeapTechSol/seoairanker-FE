import { useParams } from 'react-router-dom'
import { SyntheticEvent, useEffect, useState } from 'react'

import Flex from '@/components/Flex'
import Table from '@/components/Table'
import Button from '@/components/Button'
import TruncateText from '@/components/TruncateText'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import ShimmerPlaceholder from '@/components/ShimmerPlaceholder/ShimmerPlaceholder'

import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'
import useHandleRecommendations from '@/container/sites/hooks/useHandleRecommendations'

import { ColumnType } from '@/components/Table/types'
import { MissingTitlesDataTypes } from '@/container/sites/sitesTypes'

import './ExternalTitlesList.scss'
import { sitesAPI } from '../../api/sitesAPI'
import { store, useAppSelector } from '@/api/store'

const ExternalTitleList = ({ link_id: externalLinkId }: { link_id: string }) => {
  const { id: siteId } = useParams()
  const [editedId, setEditedId] = useState<string>()

  const { getSiteCrawledInfoData } = useHandleSitesLogic()
  const {
    recommendationData,
    getRecommendationByType,
    recommendationDataLoading,
    handleUpdateRecommendations,
    isSingleApproveLoading,
    isSubBulkApproveLoading,
  } = useHandleRecommendations()

  const isApproveAPICallInProgress = useAppSelector(state=>state.sites.isApproveAPICallInProgress)

  const recommendation = recommendationData?.data.find((item) => item.link_id)

  const handleAllRecommendations = async () => {
    if (siteId) {
      await handleUpdateRecommendations({
        model: 'external_links',
        filter_conditions: { link_id: recommendation?.link_id, site_id: siteId },
        update_data: { approved: true },
        bulk: true,
      })
       getSiteCrawledInfoData({ site_id: siteId, link_id: externalLinkId })
       getRecommendationByType({ page: 1, per_page: 10, type: 'external_links', link_id: externalLinkId })
    }
  }

  const onApprove = async (e: SyntheticEvent, type_id: string, linkId: string, url: string, status: boolean) => {
    setEditedId(type_id)
    e.stopPropagation()
    if (siteId) {
      await handleUpdateRecommendations({
        model: 'external_links',
        filter_conditions: { id: type_id, link_id: linkId, url, site_id: siteId },
        update_data: { approved: status },
        bulk: false,
      })
       getSiteCrawledInfoData({ site_id: siteId, link_id: externalLinkId })
       getRecommendationByType({ page: 1, per_page: 10, type: 'external_links', link_id: externalLinkId })
    }
  }

  const columns: ColumnType<MissingTitlesDataTypes>[] = [
    {
      header: 'Link',
      dataKey: 'url',
      render: (text, record) => (
        <Flex justify="start" align="center">
          <TruncateText text={text} width={220} line={1}></TruncateText> {record.label && record.label}
        </Flex>
      ),
    },
    {
      header: '',
      onCell: () => ({
        style: {
          textAlign: 'right',
        },
      }),
      render: (_, record) => (
        <Button
          size="sm"
          variant="outlined"
          onClick={(e) => onApprove(e, record.id, record.link_id, record.url, !record.approved)}
          type="borderRadius"
          color={record.approved ? 'error' : 'success'}
          disabled={isApproveAPICallInProgress}
          loading={editedId === record.id && isSingleApproveLoading}
        >
          {record.approved ? 'Reject' : 'Approve'}
        </Button>
      ),
    },
  ]

  const isApproved = recommendationData?.total_count == recommendationData?.approved_count

  const isLoadMore = (recommendationData?.total_count || 0) > (recommendationData?.data?.length || 0)

  const handleLoadMore = () => {
    getRecommendationByType({ page: (recommendationData?.page || 0) + 1, per_page: 10, type: 'external_links', link_id: externalLinkId })
  }

  useEffect(() => {
    getRecommendationByType({ page: 1, per_page: 10, type: 'external_links', link_id: externalLinkId })
    const interval = setInterval(() => {
      const afterCached = sitesAPI.endpoints.getRecommendationsByType.select({
        site_id: siteId || '',
        link_id: externalLinkId,
        page: 1,
        per_page: 10,
        type: 'external_links',
      })(store.getState())
      if (afterCached?.status === 'fulfilled') {
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalLinkId])

  return (
    <Container borderRadius boxShadow className="titles-list-container container-bg" width={70}>
      <ShimmerPlaceholder loading={recommendationDataLoading}>
        <Flex vertical gap={16}>
          <Flex vertical gap={16} padding="40px 40px 0px 40px">
            <Flex align="start">
              <Flex vertical gap={16}>
                <Typography type="h3" text="External Link Target" />
                <Typography text="You have external links to other websites on these pages which are not being opened in new browser tabs. This is generally considered a best webmaster practice. Approve these pages below to have those links automatically open in new tabs." />
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
          </Flex>
          <Flex vertical align="center" gap={24} className="preview-details-list" padding="0px 40px 40px 40px">
            <Table columns={columns} data={(recommendationData?.data as MissingTitlesDataTypes[]) || []} />
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

export default ExternalTitleList
