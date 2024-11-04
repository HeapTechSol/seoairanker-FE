import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Flex from '@/components/Flex'
import Tabs from '@/components/Tabs/Tabs'
import SitePages from '../SitePages/SitePages'
import ScriptPage from '../ScriptPage/ScriptPage'
import SiteSchema from '../SiteSchema/SiteSchema'
import SiteOverview from '../SiteOverview/SiteOverview'
import Container from '@/components/Container/Container'
import AddNewKeywords from '../AddNewKeywords/AddNewKeywords'
import Recommendations from '../Recommendations/Recommendations'
import RecommendationSuspense from '@/container/sites/components/RecommendationsSuspense/RecommendationSuspense'

import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'


import './SiteDetailsPage.scss'

const SiteDetailsPage = () => {
  const { id } = useParams()
  const { getSiteCrawledInfoData, isGetSiteDataPending , crawledInfo} = useHandleSitesLogic()

  const tabs = [
    {
      title: 'Site Overview',
      key: 'site_overview',
      content: <SiteOverview isGetSiteDataPending={isGetSiteDataPending}/>,
    },
    {
      title: 'Automations',
      key: 'automation',
      content: <Recommendations isGetSiteDataPending={isGetSiteDataPending}/>,
    },
    { title: 'Keywords', key: 'keywords', content: <AddNewKeywords isGetSiteDataPending={isGetSiteDataPending} /> },
    {
      title: 'Pages',
      key: 'pages',
      content: <SitePages isGetSiteDataPending={isGetSiteDataPending}/>,
    },
    { title: 'Schema', key: 'schema', content: <SiteSchema />, hidden: true },
    { title: 'Script', key: 'script', content: <ScriptPage />, hidden: true },
  ]

  useEffect(() => {
    if (id) getSiteCrawledInfoData({ site_id: id })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container className="sites-dashboard">
      {crawledInfo?.site_data?.crawl_in_progress && !isGetSiteDataPending && <RecommendationSuspense />}
      <Flex vertical gap={24}>
        <Tabs tabs={tabs} defaultActiveTab={0} tabsPlacement="left" tabColor="primary" activeByUrl />
      </Flex>
    </Container>
  )
}

export default SiteDetailsPage
