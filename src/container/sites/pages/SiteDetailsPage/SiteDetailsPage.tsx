import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

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
  const { state } = useLocation()
  const { getSiteCrawledInfoData } = useHandleSitesLogic()

  const tabs = [
    {
      title: 'Site Overview',
      content: <SiteOverview />,
    },
    {
      title: 'Automations',
      content: <Recommendations />,
    },
    { title: 'Keywords', content: <AddNewKeywords /> },
    { title: 'Pages', content: <SitePages /> },
    // { title: 'Speed Metrics', content: <SiteInsights /> },
  ]

  useEffect(() => {
    if (state.siteId) getSiteCrawledInfoData({ site_id: state.siteId })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container className="sites-dashboard">
      <Flex vertical gap={24}>
        <Tabs tabs={tabs} defaultActiveTab={0} tabsPlacement="left" tabColor="primary" />
      </Flex>
    </Container>
  )
}

export default SiteDetailsPage
