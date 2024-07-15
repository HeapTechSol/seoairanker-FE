import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Flex from '@/components/Flex'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import RecommendationList from '@/container/sites/components/RecommendationList/RecommendationList'
import RecommendationOverview from '@/container/sites/components/RecommendationOverview/RecommendationOverview'

import { GlobalICON } from '@/assets/icons/svgs'

import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'
import useHandleRecommendations from '@/container/sites/hooks/useHandleRecommendations'

import { getTime } from '@/utils/helper'
import { CrawledInfoAPIResponseTypes } from '@/container/sites/sitesTypes'

import './Recommendations.scss'

const Recommendations = () => {
  const { state } = useLocation()
  const [key, setKey] = useState<string>('og_tags')

  const { reCrawlLoading, handleReCrawlSite } = useHandleRecommendations()

  const { getSiteCrawledInfoData, crawledInfo, crawlInfoLoading } = useHandleSitesLogic()

  const recommendationTitles = {
    images: 'No Image Alt/Title Text',
    og_tags: 'Add a Social Preview',
    heading_suggestions: 'Optimize Headline Tags',
    anchor_titles: 'Link Missing Titles',
    missing_meta_descriptions: 'Add Meta Description',
    missing_meta_titles: 'Optimize Title',
  }

  const recommendationsList = crawledInfo?.model_data.map((item, index) => ({
    id: String(index),
    type: item.model,
    totalCount: item.total,
    used: item.approved,
    title: recommendationTitles[item.model],
  }))

  const reCrawlSite = () => {
    if (state.siteId && state.siteUrl) handleReCrawlSite({ site_id: state.siteId, siteUrl: state.siteUrl })
  }

  useEffect(() => {
    if (state.siteId) getSiteCrawledInfoData(state.siteId)
  }, [])

  return (
    <Container width={100}>
      <Flex vertical gap={16}>
        <Container padding={'40px 20px'} className="container-bg" borderRadius boxShadow>
          <Flex vertical gap={16}>
            <Typography text="SEO Automation Recommendations" type="h2" />
            <Typography
              text="The right to rectification – You have the right to request that we correct any
                information you believe is inaccurate. You also have the right to request that we
                complete the information you believe is incomplete. The right to data portability – You have the right to request that we transfer the
                data that we have collected to another organization, or directly to you, under
                certain conditions"
            />
            <Typography
              text={
                <>
                  There are currently <Typography text={`${crawledInfo?.site_data?.total_approved || 0} Approved`} color="success" inline /> out of{' '}
                  <Typography text={`${crawledInfo?.site_data?.total_count || 0} total`} inline type="h6" /> Optimizations.
                </>
              }
            />
            <Flex gap={16} align="center">
              <Button type="borderRadius" loading={reCrawlLoading} onClick={reCrawlSite}>
                Regenerate Recommendation
              </Button>
              <Typography text={`Last updated ${getTime(crawledInfo?.site_data?.updatedAt || '')}`} />
            </Flex>
          </Flex>
        </Container>
        <Container padding={'40px 20px'} className="container-bg" borderRadius boxShadow>
          <Flex vertical gap={16}>
            <Typography text="Search Automation by Page URL" type="h2" />
            <Input StartIcon={GlobalICON} name="search_automation" placeholder="Enter Page URL or Path" borderRadius />
          </Flex>
        </Container>
        <Flex gap={16}>
          <RecommendationOverview
            recommendationsList={recommendationsList || []}
            onClick={(e) => setKey(e)}
            selectedKey={key}
            site_id={state?.siteId}
            crawledInfo={crawledInfo as CrawledInfoAPIResponseTypes['data']}
          />
          <RecommendationList selectedKey={key} />
        </Flex>
      </Flex>
      <Loader loading={crawlInfoLoading} />
    </Container>
  )
}

export default Recommendations
