import { useEffect } from 'react'

import Flex from '@/components/Flex'
import Loader from '@/components/Loader'
import Grid from '@/components/Grid/Grid'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import CircularProgress from '@/components/CircularProgress/CircularProgress'

import { useAppSelector } from '@/api/store'
import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'

import { MdBlock } from 'react-icons/md'
import { BsFullscreen } from 'react-icons/bs'
import { RiLayout3Line } from 'react-icons/ri'
import { GiLargePaintBrush } from 'react-icons/gi'
import { IoSpeedometerOutline } from 'react-icons/io5'

import { handleFormatCurrencyAndNumber } from '@/utils/helper'

import './SiteInsights.scss'

const SiteInsights = () => {
  const { getInsights, insightsData, insightsLoading } = useHandleSitesLogic()

  const crawledInfo = useAppSelector((state) => state.sites.crawledInfo)

  useEffect(() => {
    if (crawledInfo?.site_data?.site_url) getInsights({ url: crawledInfo?.site_data?.site_url })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crawledInfo?.site_data?.site_url])

  const convertValueToNumber = (str: string) => parseFloat(str?.replace(' s', ''))

  const largestContentColor = convertValueToNumber(insightsData?.largest_contentful_paint) > 1
  const firstContentColor = convertValueToNumber(insightsData?.first_contentful_paint) > 1
  const blockingTimeColor = convertValueToNumber(insightsData?.total_blocking_time) / 1000 > 1
  const speedColor = convertValueToNumber(insightsData?.speed) > 1
  const layoutShiftColor = insightsData?.cumulative_layout_shift > 1

  const performance = (insightsData?.performance_score || 0) * 100
  const bestPractices = (insightsData?.best_practices_score || 0) * 100
  const seo = (insightsData?.seo_score || 0) * 100

  return (
    <Container borderRadius boxShadow className="site-insights">
      <Loader loading={insightsLoading}>
        <Flex vertical gap={100} align="center">
          <Grid gap={16} minWidth={200} minMax={300} className="circles-chart-container">
            <Flex gap={16} vertical align="center" justify="between">
              <CircularProgress
                color={performance ? 'success' : 'error'}
                progress={handleFormatCurrencyAndNumber({ value: performance })}
                size={140}
              />
              <Typography text="Performance" type="h3" />
            </Flex>
            <Flex gap={16} vertical align="center" justify="center">
              <CircularProgress
                color={bestPractices ? 'success' : 'error'}
                progress={handleFormatCurrencyAndNumber({ value: bestPractices })}
                size={140}
              />
              <Typography text="Best Practices" type="h3" />
            </Flex>
            <Flex gap={16} vertical align="center" justify="center">
              <CircularProgress color={seo ? 'success' : 'error'} progress={handleFormatCurrencyAndNumber({ value: seo })} size={140} />
              <Typography text="SEO" type="h3" />
            </Flex>
          </Grid>
          <Flex vertical gap={100}>
            <Grid gap={16} minWidth={200} minMax={350}>
              <Container
                color={largestContentColor ? 'error' : 'success'}
                borderRadius
                boxShadow
                padding={20}
                className="page-insight-card container-bg"
              >
                <Flex align="center" gap={24}>
                  <GiLargePaintBrush />
                  <Flex vertical gap={8}>
                    <Typography type="h3" text="Largest Contentful Paint" />
                    <Typography text={insightsData?.largest_contentful_paint} />
                  </Flex>
                </Flex>
              </Container>
              <Container
                color={firstContentColor ? 'error' : 'success'}
                borderRadius
                boxShadow
                padding={20}
                className="page-insight-card container-bg"
              >
                <Flex align="center" gap={24}>
                  <BsFullscreen />
                  <Flex vertical gap={8}>
                    <Typography type="h3" text="First Contentful Paint" />
                    <Typography text={insightsData?.first_contentful_paint} />
                  </Flex>
                </Flex>
              </Container>
              <Container
                color={blockingTimeColor ? 'error' : 'success'}
                borderRadius
                boxShadow
                padding={20}
                className="page-insight-card container-bg"
              >
                <Flex align="center" gap={24}>
                  <MdBlock />
                  <Flex vertical gap={8}>
                    <Typography type="h3" text="Total Blocking Time" />
                    <Typography text={insightsData?.total_blocking_time} />
                  </Flex>
                </Flex>
              </Container>
              <Container color={speedColor ? 'error' : 'success'} borderRadius boxShadow padding={20} className="page-insight-card container-bg">
                <Flex align="center" gap={24}>
                  <IoSpeedometerOutline />
                  <Flex vertical gap={8}>
                    <Typography type="h3" text="Speed Index" />
                    <Typography text={insightsData?.speed} />
                  </Flex>
                </Flex>
              </Container>
              <Container
                color={layoutShiftColor ? 'error' : 'success'}
                borderRadius
                boxShadow
                padding={20}
                className="page-insight-card container-bg"
              >
                <div className="bordered">
                  <Flex align="center" gap={24}>
                    <RiLayout3Line />
                    <Flex vertical gap={8}>
                      <Typography type="h3" text="Cumulative Layout Shift" />
                      <Typography text={insightsData?.cumulative_layout_shift} />
                    </Flex>
                  </Flex>
                </div>
              </Container>
            </Grid>
            {insightsData?.screenshot_url && <img src={insightsData?.screenshot_url} alt="" width={'100%'} />}
          </Flex>
        </Flex>
      </Loader>
    </Container>
  )
}

export default SiteInsights
