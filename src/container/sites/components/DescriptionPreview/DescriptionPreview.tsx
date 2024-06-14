import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Accordion from '@/components/Accordion'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import { DescriptionRecommendations, RecommendationsCountTypes, RecommendationsListTypes } from '@/container/sites/sitesTypes'

const DescriptionPreview = ({
  titlesList,
  recommendationCount,
}: {
  titlesList: RecommendationsListTypes['descriptions']
  recommendationCount: RecommendationsCountTypes
}) => {
  const accordionDescription = (item: DescriptionRecommendations) => (
    <Flex vertical gap={4}>
      <Typography text={item.url} type="h6" />
      {!!item?.existing_description?.length && (
        <>
          {' '}
          <Typography text="Content:" />
          <Typography text={`Description is currently ${item?.existing_description?.length} characters vs 45+ recommendation`} color="warning" />
        </>
      )}
      <Typography text="Existing:" />
      <Typography text={item?.existing_description || 'Blank'} color="warning" />
      <Typography text="Suggestion:" />
      <Typography text={item?.suggested_description} color="warning" />
    </Flex>
  )

  const optimizedTitlesList = titlesList?.map((item) => ({ url: item.url, content: accordionDescription(item), approve: item.approve }))

  const onApprove = (e: React.SyntheticEvent) => {
    e.stopPropagation()
  }

  return (
    <Container borderRadius boxShadow width={70} className="recommendation-list-container" padding={'40px 20px'}>
      <Flex vertical gap={16}>
        <Flex align="start">
          <Flex vertical gap={16}>
            <Typography type="h3" text="Optimize Description" />
            <Typography text="Currently Google will show up to 60 characters in the title of your search results, so use them! We've added suggested descriptions below which you may want to edit and approve. In general, we recommend including what the page is about, your brand name, as well as some adjectives or modifiers." />
          </Flex>
          <Button size="sm" variant="outlined" type="borderRadius">
            Approve All ({recommendationCount?.approved_description_count}/
            {recommendationCount?.approved_description_count + recommendationCount?.un_approved_description_count})
          </Button>
        </Flex>
        <Flex vertical gap={10}>
          {optimizedTitlesList.map((item) => (
            <Accordion
              title={item.url}
              description={item.content}
              color="primary"
              CustomIcon={
                <Button size="sm" variant="outlined" onClick={onApprove} type="borderRadius" color="success" disabled={item.approve}>
                  Approve
                </Button>
              }
            />
          ))}
        </Flex>
      </Flex>
    </Container>
  )
}

export default DescriptionPreview
