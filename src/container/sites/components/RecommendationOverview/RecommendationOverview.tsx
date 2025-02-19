import { useState } from 'react'
import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'
import useHandleRecommendations from '@/container/sites/hooks/useHandleRecommendations'

import { CrawledInfoAPIResponseTypes, ModalTypes } from '@/container/sites/sitesTypes'

import { classMapper } from '@/utils/helper'

import './RecommendationOverview.scss'

type RecommendationsListType = {
  id: string
  type: string
  title: string
  totalCount: number
  used: number
}

const RecommendationOverview = ({
  onClick,
  link_id: externalLinkId,
  site_id,
  crawledInfo,
  selectedKey,
  recommendationsList,
}: {
  site_id: string
  link_id: string
  selectedKey: ModalTypes
  onClick: (id: ModalTypes) => void
  recommendationsList: RecommendationsListType[]
  crawledInfo: CrawledInfoAPIResponseTypes['data']
}) => {
  const [statusType, setStatusType] = useState<boolean>(false)

  const { getSiteCrawledInfoData } = useHandleSitesLogic()
  const { handleUpdateRecommendations, approveRecommendationsLoading, getRecommendationByType } = useHandleRecommendations()

  const handleApproveAllRecommendations = async (status: boolean) => {
    setStatusType(status)
    await handleUpdateRecommendations({
      filter_conditions: { site_id: site_id },
      update_data: { approved: status },
      bulk: true,
    })
    await getSiteCrawledInfoData({ site_id: site_id, link_id: externalLinkId })
    await getRecommendationByType({ page: 1, per_page: 10, type: selectedKey, link_id: externalLinkId })
  }

  const isAllApproved = crawledInfo?.site_data?.total_approved == crawledInfo?.site_data?.total_count

  return (
    <Container width={30} padding={'40px 20px'} borderRadius boxShadow className="recommendations-container container-bg">
      <Flex vertical gap={2}>
        {recommendationsList?.map((recommendation) =>
          recommendation.totalCount ? (
            <Flex
              justify="between"
              padding={'5px 15px'}
              key={recommendation.title}
              className={classMapper('recommendations-status', { active: recommendation.type === selectedKey })}
              onClick={() => onClick(recommendation.type as ModalTypes)}
            >
              <Typography text={recommendation.title} />
              <Typography text={`(${recommendation.used}/${recommendation?.totalCount})`} />
            </Flex>
          ) : null
        )}
      </Flex>
      <Button
        fullWidth
        variant="outlined"
        color="success"
        disabled={isAllApproved}
        loading={statusType === true && approveRecommendationsLoading}
        onClick={() => handleApproveAllRecommendations(true)}
      >
       Approve All
      </Button>
      {!!crawledInfo?.site_data?.total_approved && (
        <Button
          fullWidth
          variant="outlined"
          color="error"
          loading={statusType === false && approveRecommendationsLoading}
          onClick={() => handleApproveAllRecommendations(false)}
        >
          Reject All
        </Button>
      )}
    </Container>
  )
}

export default RecommendationOverview
