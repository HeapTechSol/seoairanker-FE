import { ErrorTypes } from '@/utils/commonTypes'
import { useCheckoutMutation, useLazyStripePaymentIntentQuery, useLazyGetAllPlansQuery } from '../api/billingAPI'

import { CheckoutPayload } from '../billingTypes'
import { toast } from 'react-toastify'

const useStripeHandling = () => {
  const [checkout] = useCheckoutMutation()
  const [getAllPlans, { data: allPlansList, isFetching:plansLoading }] = useLazyGetAllPlansQuery()
  const [getClientSecret, { data: paymentIntent }] = useLazyStripePaymentIntentQuery()

  const handleCheckout = async (payload: CheckoutPayload) => {
    try {
      return await checkout(payload).unwrap()
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const getPaymentIntentClientSecret = async () => {
    try {
      await getClientSecret().unwrap()
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  const getPlansList = async () => {
    try {
      await getAllPlans().unwrap()
    } catch (error) {
      if ((error as ErrorTypes)?.data?.message) toast.error((error as ErrorTypes)?.data?.message)
    }
  }

  return { handleCheckout, clientSecret: paymentIntent?.client_secret, getPaymentIntentClientSecret, allPlansList, plansLoading, getPlansList }
}

export default useStripeHandling
