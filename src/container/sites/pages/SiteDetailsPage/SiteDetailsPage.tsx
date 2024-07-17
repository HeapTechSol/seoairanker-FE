import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Flex from '@/components/Flex'
import Tabs from '@/components/Tabs/Tabs'
import SitePages from '../SitePages/SitePages'
import SiteInsights from '../SiteInsights/SiteInsights'
import Container from '@/components/Container/Container'
import AddNewKeywords from '../AddNewKeywords/AddNewKeywords'
import Recommendations from '../Recommendations/Recommendations'

import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'

import { CrawledInfoAPIResponseTypes } from '@/container/sites/sitesTypes'

import './SiteDetailsPage.scss'

const SiteDetailsPage = () => {
  const { state } = useLocation()
  const { getSiteCrawledInfoData, crawledInfo, crawlInfoLoading } = useHandleSitesLogic()

  const tabs = [
    {
      title: 'Automations',
      content: <Recommendations crawledInfo={crawledInfo as CrawledInfoAPIResponseTypes['data']} crawlInfoLoading={crawlInfoLoading} />,
    },
    { title: 'Keywords', content: <AddNewKeywords crawledInfo={crawledInfo as CrawledInfoAPIResponseTypes['data']} /> },
    { title: 'Pages', content: <SitePages /> },
    { title: 'Speed Metrics', content: <SiteInsights /> },
  ]

  useEffect(() => {
    if (state.siteId) getSiteCrawledInfoData(state.siteId)
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
