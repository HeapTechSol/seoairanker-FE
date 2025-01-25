import { useEffect, useRef } from 'react'
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

import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'

import './SiteDetailsPage.scss'

const SiteDetailsPage = () => {
  const { id } = useParams()
  const { getSiteCrawledInfoData, isGetSiteDataPending, crawledInfo } = useHandleSitesLogic()

  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tabs = [
    {
      title: 'Site Overview',
      key: 'site_overview',
      content: <SiteOverview isGetSiteDataPending={isGetSiteDataPending} />,
    },
    {
      title: 'Automations',
      key: 'automation',
      content: <Recommendations isGetSiteDataPending={isGetSiteDataPending} />,
    },
    { title: 'Keywords', key: 'keywords', content: <AddNewKeywords isGetSiteDataPending={isGetSiteDataPending} /> },
    {
      title: 'Pages',
      key: 'pages',
      content: <SitePages isGetSiteDataPending={isGetSiteDataPending} />,
    },
    { title: 'Schema', key: 'schema', content: <SiteSchema />, hidden: true },
    { title: 'Script', key: 'script', content: <ScriptPage />, hidden: true },
  ]

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        await getSiteCrawledInfoData({ site_id: id });
      } catch (error) {
        console.error("Error fetching site crawled info:", error);
      }
    };

    fetchData();
    if (crawledInfo?.site_data?.crawl_summary && crawledInfo?.site_data?.crawl_summary?.crawl_progress === 'in_progress') intervalRef.current = setInterval(fetchData, 10000);

  }, [id]);

  useEffect(() => {
    if (crawledInfo && crawledInfo?.site_data?.crawl_summary && crawledInfo?.site_data?.crawl_summary?.crawl_progress === 'finished' && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [crawledInfo?.site_data]);

  return (
    <Container className="sites-dashboard">
      <Flex vertical gap={24}>
        <Tabs tabs={tabs} defaultActiveTab={0} tabsPlacement="left" tabColor="primary" activeByUrl />
      </Flex>
    </Container>
  )
}

export default SiteDetailsPage
