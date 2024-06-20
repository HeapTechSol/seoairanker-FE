import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import useHandleRecommendations from '@/container/sites/hooks/useHandleRecommendations'

import { CrawledInfoAPIResponseTypes } from '@/container/sites/sitesTypes'

import './RecommendationOverview.scss'
import { classMapper } from '@/utils/helper'

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
  crawledInfo: CrawledInfoAPIResponseTypes['result']
}) => {
  const { approveAllRecommendation, approveAllLoading } = useHandleRecommendations()

  const handleApproveAllRecommendations = async (status: string) => {
    await approveAllRecommendation({ site_id, status })
  }

  const isAllApproved =
    crawledInfo?.recommendations?.approved == (crawledInfo?.recommendations?.unapproved || 0) + (crawledInfo?.recommendations?.approved || 0)

  return (
    <Container width={30} padding={'40px 20px'} borderRadius boxShadow className="recommendations-container">
      <Flex vertical gap={2}>
        {recommendationsList?.map((recommendation) =>
          recommendation.totalCount ? (
            <Flex
              justify="between"
              padding={'5px 15px'}
              key={recommendation.title}
              className={classMapper('recommendations-status', { active: recommendation.id === selectedKey })}
              onClick={() => onClick(recommendation.id)}
            >
              <Typography text={recommendation.title} />
              <Typography text={`(${recommendation.used}/${recommendation.totalCount})`} />
            </Flex>
          ) : null
        )}
      </Flex>
      <Loader loading={approveAllLoading} />
      <Button
        fullWidth
        variant="outlined"
        color="success"
        disabled={isAllApproved || approveAllLoading}
        onClick={() => handleApproveAllRecommendations('True')}
      >
        I'm Feeling Lucky (Approve All)
      </Button>
      {!!crawledInfo?.recommendations.approved && (
        <Button fullWidth variant="outlined" color="error" disabled={approveAllLoading} onClick={() => handleApproveAllRecommendations('False')}>
          Reject All
        </Button>
      )}
    </Container>
  )
}

export default RecommendationOverview
