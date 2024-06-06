import { toast } from 'react-toastify'

import { ErrorTypes } from '@/utils/commonTypes'

import { useLazyGetRecommendationsCountQuery, useLazyGetRecommendationsDataQuery } from '../api/sitesAPI'

const useHandleRecommendations = () => {
  const [getRecommendationsData, { data: recommendationData, isFetching: getDataLoading }] = useLazyGetRecommendationsDataQuery()
  const [getRecommendationsCount, { data: recommendationCount, isFetching: getCountLoading }] = useLazyGetRecommendationsCountQuery()

  const getRecommendationCounts = async (payload: { site_id: string }) => {
    try {
      await getRecommendationsCount(payload)
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

  return {
    getRecommendationCounts,
    recommendationCount: recommendationCount?.results,
    getCountLoading,
    getRecommendationList,
    recommendationData: recommendationData?.results,
    getDataLoading,
  }
}

export default useHandleRecommendations
