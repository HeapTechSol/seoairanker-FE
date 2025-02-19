import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Flex from '@/components/Flex'
import Tabs from '@/components/Tabs/Tabs'
import SitePages from '../SitePages/SitePages'
// import SiteInsights from '../SiteInsights/SiteInsights'
import SiteOverview from '../SiteOverview/SiteOverview'
import Container from '@/components/Container/Container'
import AddNewKeywords from '../AddNewKeywords/AddNewKeywords'
import Recommendations from '../Recommendations/Recommendations'

import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'

import './SiteDetailsPage.scss'

const SiteDetailsPage = () => {
  const { id } = useParams()
  const { getSiteCrawledInfoData } = useHandleSitesLogic()

  const tabs = [
    {
      title: 'Site Overview',
      key: 'site_overview',
      content: <SiteOverview />,
    },
    {
      title: 'Automations',
      key: 'automation',
      content: <Recommendations />,
    },
    { title: 'Keywords', key: 'keywords', content: <AddNewKeywords /> },
    { title: 'Pages', key: 'pages', content: <SitePages /> },
    // { title: 'Speed Metrics', content: <SiteInsights /> },
  ]

  useEffect(() => {
    if (id) getSiteCrawledInfoData({ site_id: id })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container className="sites-dashboard">
      <Flex vertical gap={24}>
        <Tabs tabs={tabs} defaultActiveTab={0} tabsPlacement="left" tabColor="primary" activeByUrl />
      </Flex>
    </Container>
  )
}

export default SiteDetailsPage
