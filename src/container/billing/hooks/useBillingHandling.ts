import { toast } from 'react-toastify'

import { ErrorTypes } from '@/utils/commonTypes'
import { useLazyGetBillingHistoryQuery, useLazyGetUserQuotaQuery } from '../api/billingAPI'
import { GetPaymentHistoryPayloadTypes } from '../billingTypes'

const useBillingHandling = () => {
  const [getUserQuota, { isFetching: userQuotaLoading }] = useLazyGetUserQuotaQuery()
  const [getBillingHistory, { isFetching: billingHistoryLoading, data: billingHistoryList }] = useLazyGetBillingHistoryQuery()

  const getBillingHistoryList = async (payload: GetPaymentHistoryPayloadTypes) => {
    try {
      await getBillingHistory(payload, false).unwrap()
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const getUserQuotas = async (payload: { user_id: number }) => {
    try {
      await getUserQuota(payload, false).unwrap()
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  return {
    getBillingHistoryList,
    billingHistoryLoading,
    userQuotaLoading,
    getUserQuotas,
    billingHistoryList: billingHistoryList?.result,
  }
}

export default useBillingHandling
