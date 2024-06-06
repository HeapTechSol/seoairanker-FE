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

import useHandleRecommendations from '@/container/sites/hooks/useHandleRecommendations'

import './Recommendations.scss'
import { RecommendationsListTypes } from '../../sitesTypes'

const Recommendations = () => {
  const { state } = useLocation()
  const [key, setKey] = useState<string>('')

  const { getRecommendationCounts, recommendationCount, getCountLoading, getRecommendationList, recommendationData, getDataLoading } =
    useHandleRecommendations()

  const recommendationsList = [
    {
      id: '1',
      type: 'tags',
      title: 'Optimize Headline Tags',
      totalCount: 0,
      used: 0,
    },
    {
      id: '2',
      type: 'previews',
      title: 'Add a Social Preview',
      totalCount: 0,
      used: 0,
    },
    {
      id: '3',
      type: 'metaDescription',
      title: 'Add Meta Description',
      totalCount: (recommendationCount?.approved_description_count || 0) + (recommendationCount?.un_approved_description_count || 0),
      used: recommendationCount?.approved_description_count || 0,
    },
    {
      id: '4',
      type: 'optimizeTitle',
      title: 'Optimize Title',
      totalCount: (recommendationCount?.approved_title_count || 0) + (recommendationCount?.un_approved_title_count || 0),
      used: recommendationCount?.approved_title_count || 0,
    },
    {
      id: '5',
      type: 'missingTitles',
      title: 'Link Missing Titles',
      totalCount: 0,
      used: 0,
    },
    {
      id: '6',
      type: 'linkTarget',
      title: 'External Link Target',
      totalCount: 0,
      used: 0,
    },
    {
      id: '7',
      type: 'altText',
      title: 'No Image Alt/Title Text',
      totalCount: (recommendationCount?.approved_image_count || 0) + (recommendationCount?.un_approved_image_count || 0),
      used: recommendationCount?.approved_image_count || 0,
    },
  ]

  useEffect(() => {
    if (state.siteUrl) getRecommendationCounts({ site_id: state.siteId })
    if (state.siteUrl) getRecommendationList({ site_id: state.siteId })
  }, [])

  return (
    <Container width={100}>
      <Flex vertical gap={16}>
        <Container padding={'40px 20px'} className="regenerate-recommendations" borderRadius boxShadow>
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
                  There are currently <Typography text="50,142 Approved" color="success" inline /> out of{' '}
                  <Typography text="60,430 total" inline type="h6" /> Optimizations.
                </>
              }
            />
            <Flex gap={16} align="center">
              <Button type="borderRadius">Regenerate Recommendation</Button>
              <Typography text="Last updated 2 days ago" />
            </Flex>
          </Flex>
        </Container>
        <Container padding={'40px 20px'} className="search_automation" borderRadius boxShadow>
          <Flex vertical gap={16}>
            <Typography text="Search Automation by Page URL" type="h2" />
            <Input StartIcon={GlobalICON} name="search_automation" placeholder="Enter Page URL or Path" borderRadius />
          </Flex>
        </Container>
        <Flex gap={4}>
          <RecommendationOverview recommendationsList={recommendationsList} onClick={(e) => setKey(e)} />
          <RecommendationList recommendationData={(recommendationData as RecommendationsListTypes) || []} selectedKey={key}/>
        </Flex>
      </Flex>
      <Loader overlay loading={getCountLoading || getDataLoading} />
    </Container>
  )
}

export default Recommendations
