import { useState } from 'react'
import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import useHandleRecommendations from '@/container/sites/hooks/useHandleRecommendations'

import { CrawledInfoAPIResponseTypes } from '@/container/sites/sitesTypes'

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
  site_id,
  crawledInfo,
  selectedKey,
  recommendationsList,
}: {
  site_id: string
  selectedKey: string
  onClick: (id: string) => void
  recommendationsList: RecommendationsListType[]
  crawledInfo: CrawledInfoAPIResponseTypes['data']
}) => {
  const [statusType, setStatusType] = useState<boolean>(false)
  const { handleUpdateRecommendations, approveRecommendationsLoading } = useHandleRecommendations()

  const handleApproveAllRecommendations = async (status: boolean) => {
    setStatusType(status)
    await handleUpdateRecommendations({
      filter_conditions: { site_id: site_id },
      update_data: { approved: status },
      bulk: true,
    })
  }

  const isAllApproved = crawledInfo?.site_data.total_approved == crawledInfo?.site_data?.total_count

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
              onClick={() => onClick(recommendation.type)}
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
        I'm Feeling Lucky (Approve All)
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
