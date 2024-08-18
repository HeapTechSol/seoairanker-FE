import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

import { UserTypes } from '@/container/auth/authTypes'
import { GetPaymentHistoryPayloadTypes } from '../billingTypes'
import { ErrorTypes, GenericDispatch } from '@/utils/commonTypes'
import { useCancelSubscriptionMutation, useLazyGetBillingHistoryQuery, useLazyGetUserQuotaQuery } from '../api/billingAPI'

import { useAppSelector } from '@/api/store'
import { setUser } from '@/container/auth/authSlice'

const useBillingHandling = () => {
  const dispatch = useDispatch()

  const [getUserQuota, { isFetching: userQuotaLoading }] = useLazyGetUserQuotaQuery()
  const [cancelSubscription, { isLoading: cancelSubscriptionLoading }] = useCancelSubscriptionMutation()
  const [getBillingHistory, { isFetching: billingHistoryLoading, data: billingHistoryList }] = useLazyGetBillingHistoryQuery()

  const userInfo = useAppSelector((state) => state.auth.user)

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

  const cancelUserSubscription = async (setIsShowDeleteModal: GenericDispatch<boolean>) => {
    try {
      await cancelSubscription().unwrap()
      toast.success('Subscription cancelled successfully')
      setIsShowDeleteModal(false)
      dispatch(setUser({ ...userInfo, isActiveSubscription: false } as UserTypes))
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  return {
    getBillingHistoryList,
    billingHistoryLoading,
    userQuotaLoading,
    getUserQuotas,
    cancelUserSubscription,
    cancelSubscriptionLoading,
    billingHistoryList: billingHistoryList?.data,
  }
}

export default useBillingHandling
