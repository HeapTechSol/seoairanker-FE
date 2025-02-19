import { toast } from 'react-toastify'

import { ErrorTypes } from '@/utils/commonTypes'

import {
  useApproveRecommendationsMutation,
  useLazyGetRecommendationsByTypeQuery,
  useLazyReCrawlSitePageQuery,
  useLazyReCrawlSiteQuery,
} from '../api/sitesAPI'
import { AllModalDataTypes, ApproveRecommendationsPayloadTypes, GetRecommendationsByTypesPayloadTypes } from '../sitesTypes'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setRecommendationsData } from '../sitesSlice'
import { useAppSelector } from '@/api/store'
import { uniqBy } from '@/utils/helper'

const useHandleRecommendations = () => {
  const { id: siteId } = useParams()
  const dispatch = useDispatch()

  const recommendationData = useAppSelector((state) => state.sites.recommendationData)

  const [reCrawlSite, { isFetching: reCrawlLoading }] = useLazyReCrawlSiteQuery()
  const [reCrawlSitePage, { isFetching: reCrawlPageLoading }] = useLazyReCrawlSitePageQuery()
  const [approveRecommendations, { isLoading: approveRecommendationsLoading }] = useApproveRecommendationsMutation()
  const [getRecommendationsByType, { isLoading: recommendationDataLoading }] = useLazyGetRecommendationsByTypeQuery()

  const handleUpdateRecommendations = async (payload: ApproveRecommendationsPayloadTypes) => {
    try {
      const data = await approveRecommendations(payload).unwrap()
      toast.success(data?.message || '')
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const getRecommendationByType = async (payload: GetRecommendationsByTypesPayloadTypes & { link_id: string }) => {
    try {
      const data = await getRecommendationsByType({ ...payload, site_id: siteId || '' }).unwrap()
      const mergedData = [...(recommendationData?.data || []), ...(data?.data || [])]
      const uniqueData = uniqBy(mergedData, (item) => item.id)
      const isScrolling = payload.page > 1
      dispatch(setRecommendationsData({ ...recommendationData, ...data, data: ((isScrolling ? uniqueData : data?.data) as AllModalDataTypes) || [] }))
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const handleReCrawlSite = async (payload: { site_id: string; siteUrl: string }) => {
    try {
      await reCrawlSite(payload).unwrap()
      toast.success('Recommendation regeneration started, we will notify you once we are done.')
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const handleReCrawlSitePage = async (payload: { site_id: string; link_id: string }) => {
    try {
      await reCrawlSitePage(payload).unwrap()
      toast.success('Recommendation regeneration started, we will notify you once we are done.')
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  return {
    getRecommendationByType,
    recommendationData: recommendationData,
    recommendationDataLoading,
    reCrawlLoading,
    handleReCrawlSite,
    reCrawlPageLoading,
    handleReCrawlSitePage,
    handleUpdateRecommendations,
    approveRecommendationsLoading,
  }
}

export default useHandleRecommendations
