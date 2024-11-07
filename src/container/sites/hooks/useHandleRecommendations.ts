import { toast } from 'react-toastify'

import { ErrorTypes } from '@/utils/commonTypes'

import {
  useReCrawlSiteMutation,
  useReCrawlSitePageMutation,
  useApproveRecommendationsMutation,
  useLazyGetRecommendationsByTypeQuery,
} from '../api/sitesAPI'
import { AllModalDataTypes, ApproveRecommendationsPayloadTypes, GetRecommendationsByTypesPayloadTypes } from '../sitesTypes'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setRecommendationsData } from '../sitesSlice'
import { uniqBy } from '@/utils/helper'
import { useState } from 'react'
import { useAppSelector } from '@/api/store'

const useHandleRecommendations = () => {
  const { id: siteId } = useParams()
  const dispatch = useDispatch()

  const [isBulkApproveLoading, setIsBulkApproveLoading] = useState<boolean>(false)
  const [isSingleApproveLoading, setIsSingleApproveLoading] = useState<boolean>(false)
  const [isSubBulkApproveLoading, setIsSubBulkApproveLoading] = useState<boolean>(false)

  const [reCrawlSite, { isLoading: reCrawlLoading }] = useReCrawlSiteMutation()
  const [reCrawlSitePage, { isLoading: reCrawlPageLoading }] = useReCrawlSitePageMutation()
  const [approveRecommendations] = useApproveRecommendationsMutation()

  const [getRecommendationsByType, { isFetching: recommendationDataLoading }] = useLazyGetRecommendationsByTypeQuery()

  const recommendationData = useAppSelector((state) => state.sites.recommendationData)

  const handleUpdateRecommendations = async (payload: ApproveRecommendationsPayloadTypes, callBack: () => Promise<void>) => {
    try {
      if (!payload.model && payload.bulk) setIsBulkApproveLoading(true)
      else if (payload.model && payload.bulk) setIsSubBulkApproveLoading(true)
      else if (payload.model && !payload.bulk) setIsSingleApproveLoading(true)
      const data = await approveRecommendations(payload).unwrap()
      await callBack()
      toast.success(data?.message || '')
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    } finally {
      setIsBulkApproveLoading(false)
      setIsSingleApproveLoading(false)
      setIsSubBulkApproveLoading(false)
    }
  }

  const getRecommendationByType = async (payload: GetRecommendationsByTypesPayloadTypes & { link_id: string }) => {
    try {
      const data = await getRecommendationsByType({ ...payload, site_id: siteId || '' }).unwrap()
      const mergedData = [...(recommendationData?.data || []), ...(data?.data || [])]
      const uniqueData = uniqBy(mergedData, (item) => item.id)
      const isScrolling = payload.page > 1
      dispatch(
        setRecommendationsData({
          ...recommendationData,
          ...data,
          data: ((isScrolling ? uniqueData : data?.data) as AllModalDataTypes) || [],
          modal: payload.type,
          page: payload.page,
          per_page: payload.per_page,
        })
      )
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
    isBulkApproveLoading,
    isSingleApproveLoading,
    isSubBulkApproveLoading,
    getRecommendationByType,
    recommendationData: recommendationData,
    recommendationDataLoading,
    reCrawlLoading,
    handleReCrawlSite,
    reCrawlPageLoading,
    handleReCrawlSitePage,
    handleUpdateRecommendations,
  }
}

export default useHandleRecommendations