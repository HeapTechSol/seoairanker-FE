import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Flex from '@/components/Flex'
import Loader from '@/components/Loader'
import Divider from '@/components/Divider/Divider'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import CircularProgress from '@/components/CircularProgress/CircularProgress'

import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'

import './SiteInsights.scss'

const SiteInsights = () => {
  const { state } = useLocation()

  const { getInsights, insightsData, insightsLoading } = useHandleSitesLogic()

  useEffect(() => {
    if (state?.siteUrl) getInsights({ url: state?.siteUrl })
  }, [])

  return (
    <Container borderRadius boxShadow width={100} className="site-insights" padding={40}>
      <Flex vertical gap={64} align="center">
        {insightsData?.screenshot_url && <img src={insightsData?.screenshot_url} alt="" width={'60%'} />}
        <Divider color="error" />
        <Flex gap={16} vertical align="center" justify="center">
          <CircularProgress current={(insightsData?.performance_score || 0) * 100} total={100} />
          <Typography text="Performance" type="h3" />
        </Flex>
        <Flex vertical gap={32} align="center">
          <Flex gap={32}>
            <Typography text="Largest Contentful Paint :" type="h3" />
            <Typography text={insightsData?.largest_contentful_paint} />
          </Flex>
          <Flex gap={32}>
            <Typography text="First Contentful Paint :" type="h3" />
            <Typography text={insightsData?.first_contentful_paint} />
          </Flex>
          <Flex gap={32}>
            <Typography text="Total Blocking Time :" type="h3" />
            <Typography text={insightsData?.total_blocking_time} />
          </Flex>
          <Flex gap={32}>
            <Typography text="Speed Index :" type="h3" />
            <Typography text={insightsData?.speed} />
          </Flex>
          <Flex gap={32}>
            <Typography text="Cumulative Layout Shift :" type="h3" />
            <Typography text={insightsData?.cumulative_layout_shift} />
          </Flex>
        </Flex>

        <Loader loading={insightsLoading} overlay/>
      </Flex>
    </Container>
  )
}

export default SiteInsights
