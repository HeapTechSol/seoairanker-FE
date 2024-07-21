import { toast } from 'react-toastify'

import { ErrorTypes } from '@/utils/commonTypes'

import {
  useApproveRecommendationsMutation,
  useLazyGetRecommendationsByTypeQuery,
  useLazyReCrawlSiteQuery,
  useUpdateRecommendationsMutation,
} from '../api/sitesAPI'
import { ApproveRecommendationsPayloadTypes, GetRecommendationsByTypesPayloadTypes } from '../sitesTypes'
import { useLocation } from 'react-router-dom'

const useHandleRecommendations = () => {
  const { state } = useLocation()
  const [reCrawlSite, { isFetching: reCrawlLoading }] = useLazyReCrawlSiteQuery()
  const [approveRecommendations, { isLoading: approveRecommendationsLoading }] = useApproveRecommendationsMutation()
  const [updateRecommendations, { isLoading: updateRecommendationsLoading }] = useUpdateRecommendationsMutation()
  const [getRecommendationsByType, { data: recommendationData, isLoading: recommendationDataLoading }] = useLazyGetRecommendationsByTypeQuery()

  const handleUpdateRecommendations = async (payload: ApproveRecommendationsPayloadTypes) => {
    try {
      const { data } = await approveRecommendations(payload)
      toast.success(data?.message || '')
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const updateRecommendation = async (payload: { site_id: string; data: string; type: string; type_id: string }) => {
    try {
      const { data } = await updateRecommendations(payload)
      toast.success(data?.message || '')
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const getRecommendationByType = async (payload: GetRecommendationsByTypesPayloadTypes & {link_id:string}) => {
    try {
      await getRecommendationsByType({ ...payload, site_id: state.siteId })
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const handleReCrawlSite = async (payload: { site_id: string; siteUrl: string }) => {
    try {
      await reCrawlSite(payload)
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
    handleUpdateRecommendations,
    approveRecommendationsLoading,
    updateRecommendation,
    updateRecommendationsLoading,
  }
}

export default useHandleRecommendations
