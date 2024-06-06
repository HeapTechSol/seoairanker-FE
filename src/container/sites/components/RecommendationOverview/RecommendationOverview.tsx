import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import './RecommendationOverview.scss'

type RecommendationsListType = {
  id: string
  type: string
  title: string
  totalCount: number
  used: number
}

const RecommendationOverview = ({
  recommendationsList,
  onClick,
}: {
  onClick: (id: string) => void
  recommendationsList: RecommendationsListType[]
}) => {
  return (
    <Container width={30} padding={'40px 20px'} borderRadius boxShadow className="recommendations-container">
      <Flex vertical>
        {recommendationsList?.map((recommendation) =>
          recommendation.totalCount ? (
            <Flex justify="between" padding={'5px 15px'} className="recommendations-status" onClick={() => onClick(recommendation.id)}>
              <Typography text={recommendation.title} />
              <Typography text={`(${recommendation.used}/${recommendation.totalCount})`} />
            </Flex>
          ) : null
        )}
      </Flex>
      <Button fullWidth variant="outlined">
        I'm Feeling Lucky (Approve All)
      </Button>
    </Container>
  )
}

export default RecommendationOverview
