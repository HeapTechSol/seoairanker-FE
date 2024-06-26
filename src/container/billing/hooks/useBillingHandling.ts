import { toast } from 'react-toastify'

import { ErrorTypes } from '@/utils/commonTypes'
import { useLazyGetBillingHistoryQuery } from '../api/billingAPI'
import { GetPaymentHistoryPayloadTypes } from '../billingTypes'

const useBillingHandling = () => {
  const [getBillingHistory, { isFetching: billingHistoryLoading, data: billingHistoryList }] = useLazyGetBillingHistoryQuery()

  const getBillingHistoryList = async (payload: GetPaymentHistoryPayloadTypes) => {
    try {
      await getBillingHistory(payload).unwrap()
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  return { getBillingHistoryList, billingHistoryLoading, billingHistoryList: billingHistoryList?.result }
}

export default useBillingHandling
