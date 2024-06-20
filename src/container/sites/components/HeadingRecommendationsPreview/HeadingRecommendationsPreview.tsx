import { useLocation } from 'react-router-dom'

import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Accordion from '@/components/Accordion'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import { HeadingRecommendations, RecommendationsCountTypes, RecommendationsListTypes } from '@/container/sites/sitesTypes'

import useHandleRecommendations from '@/container/sites/hooks/useHandleRecommendations'

const HeadingRecommendationsPreview = ({
  titlesList,
  recommendationCount,
}: {
  titlesList: RecommendationsListTypes['headings_suggestions']
  recommendationCount: RecommendationsCountTypes
}) => {
  const { state } = useLocation()
  const { approveAllSelectedRecommendation, approveAllSelectedLoading, approveSingleLoading, approveSingleRecommendation } =
    useHandleRecommendations()

  const accordionDescription = (item: HeadingRecommendations) => (
    <Flex vertical gap={4}>
      <Typography text={item.url} type="h6" />
      {!!item?.heading_content?.length && (
        <>
          <Typography text="Content:" />
          <Typography text={item.heading_content} color="warning" />
        </>
      )}
      <Typography text="Existing:" />
      <Typography text={item?.current_heading || ''} color="warning" />
      <Typography text="Suggestion:" />
      <Typography text={item?.suggested_heading} color="warning" />
    </Flex>
  )

  const optimizedTitlesList = titlesList?.map((item) => ({ url: item.url, content: accordionDescription(item), approve: item.approve, id: item.id }))

  const onApprove = async (e: React.SyntheticEvent, type_id: string, status: boolean) => {
    e.stopPropagation()
    if (state?.siteId)
      await approveSingleRecommendation({ site_id: state?.siteId, status: status ? 'False' : 'True', type: 'headings_suggestions', type_id })
  }

  const isApproved =
    recommendationCount?.approved_og_tags_count == recommendationCount?.approved_og_tags_count + recommendationCount?.un_approved_og_tags_count

  const handleAllRecommendations = async () => {
    if (state?.siteId) await approveAllSelectedRecommendation({ site_id: state?.siteId, status: 'True', type: 'headings_suggestions' })
  }

  return (
    <Container borderRadius boxShadow width={70} className="recommendation-list-container" padding={'40px 20px'}>
      <Flex vertical gap={16}>
        <Flex align="start">
          <Flex vertical gap={16}>
            <Typography type="h3" text="Optimize Headline Tags" />
            <Typography text="Headline tags show Google your content’s hierarchy and what the highest priority subject is for your page. These Recommendations will automatically optimize your h1-h6 tags by removing h1 duplicates and promoting or demoting sub-headlines to create the optimal structure. Please note! We will copy all of your existing style tags over to maintain the exact same design, though we advise you to double check." />
          </Flex>
          <Button
            size="sm"
            variant="outlined"
            type="borderRadius"
            color='success'
            disabled={isApproved || approveAllSelectedLoading}
            onClick={handleAllRecommendations}
          >
            Approve All ({recommendationCount?.approved_heading_count}/
            {recommendationCount?.approved_heading_count + recommendationCount?.un_approved_heading_count})
          </Button>
        </Flex>
        <Flex vertical gap={10}>
          {optimizedTitlesList.map((item) => (
            <Accordion
              title={item.url}
              description={item.content}
              color="primary"
              ActionButton={
                <Button
                  size="sm"
                  variant="outlined"
                  onClick={(e) => onApprove(e, item.id, item.approve)}
                  type="borderRadius"
                  color={item.approve ? 'error' : 'success'}
                  disabled={approveAllSelectedLoading || approveSingleLoading}
                >
                  {item.approve ? 'Reject' : 'Approve'}
                </Button>
              }
            />
          ))}
        </Flex>
      </Flex>
    </Container>
  )
}

export default HeadingRecommendationsPreview
