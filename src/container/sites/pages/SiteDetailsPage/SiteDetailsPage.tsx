import Flex from '@/components/Flex'
import Tabs from '@/components/Tabs/Tabs'
import SitePages from '../SitePages/SitePages'
import SiteInsights from '../SiteInsights/SiteInsights'
import Container from '@/components/Container/Container'
import AddNewKeywords from '../AddNewKeywords/AddNewKeywords'
import Recommendations from '../Recommendations/Recommendations'

import './SiteDetailsPage.scss'

const SiteDetailsPage = () => {
  const tabs = [
    { title: 'Automations', content: <Recommendations /> },
    { title: 'Keywords', content: <AddNewKeywords /> },
    { title: 'Pages', content: <SitePages /> },
    { title: 'Speed Metrics', content: <SiteInsights /> },
  ]

  return (
    <Container className="sites-dashboard">
      <Flex vertical gap={24}>
        <Tabs tabs={tabs} defaultActiveTab={0} />
      </Flex>
    </Container>
  )
}

export default SiteDetailsPage
