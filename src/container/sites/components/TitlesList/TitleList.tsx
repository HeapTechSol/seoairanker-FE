import Flex from '@/components/Flex'
import Table from '@/components/Table'
import Button from '@/components/Button'
import Container from '@/components/Container/Container'
import TruncateText from '@/components/TruncateText'

import { AnchorTitlesRecommendations, RecommendationsCountTypes } from '@/container/sites/sitesTypes'

import './TitlesList.scss'
import Typography from '@/components/Typography/Typography'

const TitleList = ({
  titlesList,
  recommendationCount,
}: {
  titlesList: AnchorTitlesRecommendations[]
  recommendationCount: RecommendationsCountTypes
}) => {
  const columns = [
    { header: 'Link', dataKey: 'url', render: (text: string) => <TruncateText text={text} line={1} width={300}></TruncateText> },
    { header: 'Title', dataKey: 'suggested_link_title', render: (text: string) => <TruncateText text={text} line={1} width={400}></TruncateText> },
    {
      header: 'Action',
      dataKey: '',
      render: () => (
        <Flex gap={12} align="center" justify="center">
          <Button variant="outlined" size="sm" onClick={() => console.log('clicked')} type="borderRadius">
            Approve
          </Button>
        </Flex>
      ),
    },
  ]

  return (
    <Container borderRadius boxShadow padding={40} className="titles-list-container" width={70}>
      <Flex vertical gap={16}>
        <Flex align="start">
          <Flex vertical gap={16}>
            <Typography type="h3" text="Links Missing Titles" />
            <Typography text="Link titles not only tell Google what your link is about, but they are also used as previews in browsers and by users with disabilities. Making your site as accessible as possible is an important quality factor." />
          </Flex>
          <Button size="sm" variant="outlined" type="borderRadius">
            Approve All ({recommendationCount?.approved_missing_title_count}/
            {recommendationCount?.approved_missing_title_count + recommendationCount?.un_approved_missing_title_count})
          </Button>
        </Flex>
      </Flex>
      <Table columns={columns} data={titlesList || []} />
    </Container>
  )
}

export default TitleList
