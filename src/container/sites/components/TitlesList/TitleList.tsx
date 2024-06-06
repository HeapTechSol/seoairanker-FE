import Flex from '@/components/Flex'
import Table from '@/components/Table'
import Button from '@/components/Button'
import Container from '@/components/Container/Container'
import TruncateText from '@/components/TruncateText'

import { RecommendationsListTypes } from '@/container/sites/sitesTypes'

import './TitlesList.scss'

const TitleList = ({
  titlesList,
  uniqueIdentifier,
}: {
  titlesList: RecommendationsListTypes['titles' | 'descriptions']
  uniqueIdentifier: string
}) => {
  const columns = [
    { header: 'Link', dataKey: 'url', render: (text: string) => <TruncateText text={text} line={1} width={300}></TruncateText> },
    { header: 'Title', dataKey: uniqueIdentifier, render: (text: string) => <TruncateText text={text} line={1} width={400}></TruncateText> },
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
      <Table columns={columns} data={titlesList || []} />
    </Container>
  )
}

export default TitleList
