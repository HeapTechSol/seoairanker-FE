import { toast } from 'react-toastify'

import { ErrorTypes } from '@/utils/commonTypes'

import {
  useApproveAllRecommendationsMutation,
  useApproveAllSelectedRecommendationsMutation,
  useApproveSingleRecommendationMutation,
  useLazyGetRecommendationsCountQuery,
  useLazyGetRecommendationsDataQuery,
  useLazyReCrawlSiteQuery,
  useUpdateRecommendationsMutation,
} from '../api/sitesAPI'

const useHandleRecommendations = () => {
  const [reCrawlSite, { isFetching: reCrawlLoading }] = useLazyReCrawlSiteQuery()
  const [approveAllRecommendations, { isLoading: approveAllLoading }] = useApproveAllRecommendationsMutation()
  const [updateRecommendations, { isLoading: updateRecommendationsLoading }] = useUpdateRecommendationsMutation()
  const [approveSingleRecommendations, { isLoading: approveSingleLoading }] = useApproveSingleRecommendationMutation()
  const [getRecommendationsData, { data: recommendationData, isFetching: getDataLoading }] = useLazyGetRecommendationsDataQuery()
  const [getRecommendationsCount, { data: recommendationCount, isFetching: getCountLoading }] = useLazyGetRecommendationsCountQuery()
  const [approveAllSelectedRecommendations, { isLoading: approveAllSelectedLoading }] = useApproveAllSelectedRecommendationsMutation()

  const getRecommendationCounts = async (payload: { site_id: string }) => {
    try {
      await getRecommendationsCount(payload)
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const approveAllRecommendation = async (payload: { site_id: string; status: string }) => {
    try {
      const { data } = await approveAllRecommendations(payload)
      toast.success(data?.message || '')
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const approveAllSelectedRecommendation = async (payload: { site_id: string; status: string; type: string }) => {
    try {
      const { data } = await approveAllSelectedRecommendations(payload)
      toast.success(data?.message || '')
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const approveSingleRecommendation = async (payload: { site_id: string; status: string; type: string; type_id: string }) => {
    try {
      const { data } = await approveSingleRecommendations(payload)
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

  const getRecommendationList = async (payload: { site_id: string }) => {
    try {
      await getRecommendationsData(payload)
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
    getRecommendationCounts,
    recommendationCount: recommendationCount?.results,
    getCountLoading,
    getRecommendationList,
    recommendationData: recommendationData?.results,
    getDataLoading,
    reCrawlLoading,
    handleReCrawlSite,
    approveAllRecommendation,
    approveAllSelectedRecommendation,
    approveAllSelectedLoading,
    approveAllLoading,
    approveSingleLoading,
    approveSingleRecommendation,
    updateRecommendation,
    updateRecommendationsLoading,
  }
}

export default useHandleRecommendations
