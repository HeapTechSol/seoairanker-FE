import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Accordion from '@/components/Accordion'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'

import { OG_TagsRecommendations, RecommendationsCountTypes, RecommendationsListTypes } from '@/container/sites/sitesTypes'

const SocialPreview = ({
  titlesList,
  recommendationCount,
}: {
  titlesList: RecommendationsListTypes['og_tags']
  recommendationCount: RecommendationsCountTypes
}) => {

  const accordionDescription = (item: OG_TagsRecommendations) => (
    <Flex vertical gap={4}>
      <Typography text={item.url} type="h6" />
      <Typography text="Existing:" />
      <Typography text={item?.existing_og_tag|| ''} color="warning" />
      <Typography text="Suggestion:" />
      <Typography text={item?.suggested_og_tag} color="warning" />
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
            <Typography type="h3" text="Add a Social Preview" />
            <Typography text="Ever share your site on social media? That image and text you see is your social preview. You can use that to best optimize clicks and engagement. Edit and approve the recommendation to add a social preview card across your site." />
          </Flex>
          <Button size="sm" variant="outlined" type="borderRadius">
            Approve All ({recommendationCount?.approved_og_tags_count}/
            {recommendationCount?.approved_og_tags_count + recommendationCount?.un_approved_og_tags_count})
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

export default SocialPreview
