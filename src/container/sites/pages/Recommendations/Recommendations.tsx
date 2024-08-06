import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import Flex from '@/components/Flex'
import Button from '@/components/Button'
import Container from '@/components/Container/Container'
import Typography from '@/components/Typography/Typography'
import SearchInput from '@/components/SearchInput/SearchInput'
import OptimizedImage from '@/components/OptimizedImage/OptimizedImage'
import RecommendationList from '@/container/sites/components/RecommendationList/RecommendationList'
import RecommendationOverview from '@/container/sites/components/RecommendationOverview/RecommendationOverview'

import { MdClear } from 'react-icons/md'
import { AiOutlineGlobal } from 'react-icons/ai'

import useHandleSitesLogic from '@/container/sites/hooks/useHandleSitesLogic'
import useHandleRecommendations from '@/container/sites/hooks/useHandleRecommendations'

import { getTime } from '@/utils/helper'
import { useAppSelector } from '@/api/store'
import { CrawledInfoAPIResponseTypes, ModalTypes } from '@/container/sites/sitesTypes'

import './Recommendations.scss'

const Recommendations = () => {
  const [searchParams] = useSearchParams()
  const siteId = searchParams.get('id') as string
  const siteUrl = searchParams.get('url')
  const [key, setKey] = useState<ModalTypes>('og_tags')
  const [queryText, setQueryText] = useState<string>('')
  const [link_id, setLink_id] = useState<string>('')

  const { reCrawlLoading, handleReCrawlSite } = useHandleRecommendations()
  const { getPathSearchResults, getSiteCrawledInfoData } = useHandleSitesLogic()

  const crawledInfo = useAppSelector((state) => state.sites.crawledInfo)

  const recommendationTitles = {
    missing_alt_images: 'No Image Alt/Title Text',
    og_tags: 'Add a Social Preview',
    heading_suggestions: 'Optimize Headline Tags',
    missing_link_title_attr: 'Link Missing Titles',
    missing_meta_descriptions: 'Add Meta Description',
    missing_meta_titles: 'Optimize Title',
    external_links: 'External Link Target',
  }

  const recommendationsList = crawledInfo?.model_data?.map((item, index) => ({
    id: String(index),
    type: item.model,
    totalCount: item.total,
    used: item.approved,
    title: recommendationTitles[item.model],
  }))

  const reCrawlSite = () => {
    if (siteId && siteUrl) handleReCrawlSite({ site_id: siteId, siteUrl: siteUrl })
  }

  const handleSearch = async (query: string) => {
    const data = await getPathSearchResults({ path: query, site_id: siteId })
    return data?.map((item) => ({ id: item.id, label: item.url })) || []
  }

  const handleSelectResult = async (result: { id: string | number; label: string }) => {
    setLink_id(result.id as string)
    await getSiteCrawledInfoData({ site_id: siteId, link_id: result.id as string })
  }

  const handleClearFilters = async (isFilterApplied: boolean) => {
    setQueryText('')
    if (isFilterApplied) {
      setLink_id('')
      await getSiteCrawledInfoData({ site_id: siteId })
    }
  }

  return (
    <Container width={100}>
      <Flex vertical gap={16}>
        <Container padding={'40px 20px'} className="container-bg" borderRadius boxShadow>
          <Flex gap={16}>
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
            {crawledInfo?.site_data?.screenshot_url && (
              <OptimizedImage
                src={crawledInfo?.site_data?.screenshot_url}
                alt={'site screenshot'}
                width={500}
                layout="responsive"
                objectFit="contain"
              />
            )}
          </Flex>
        </Container>
        <Container padding={'40px 20px'} className="container-bg" borderRadius boxShadow>
          <Flex vertical gap={16}>
            <Typography text="Search Automation by Page URL" type="h2" />
            <SearchInput
              type="text"
              value={queryText}
              StartIcon={<AiOutlineGlobal />}
              onSearch={handleSearch}
              name="search_automation"
              handleClearSelection={handleClearFilters}
              onEnterPress={handleSearch}
              ClearSearchIcon={<MdClear />}
              onSelectResult={handleSelectResult}
              placeholder="Enter Page URL or Path"
              onChange={(e) => setQueryText(e.target.value)}
            />
          </Flex>
        </Container>
        <Flex gap={16}>
          <RecommendationOverview
            recommendationsList={recommendationsList || []}
            onClick={(e) => setKey(e)}
            selectedKey={key}
            site_id={siteId}
            link_id={link_id}
            crawledInfo={crawledInfo as CrawledInfoAPIResponseTypes['data']}
          />
          <RecommendationList selectedKey={key} link_id={link_id} />
        </Flex>
      </Flex>
    </Container>
  )
}

export default Recommendations
