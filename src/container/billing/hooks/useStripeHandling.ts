import { ErrorTypes } from '@/utils/commonTypes'
import { useLazyCheckoutQuery, useLazyStripePaymentIntentQuery } from '../api/billingAPI'

import { CheckoutPayload } from '../billingTypes'
import { toast } from 'react-toastify'

const useStripeHandling = () => {
  const [checkout] = useLazyCheckoutQuery()
  const [getClientSecret, { data: paymentIntent }] = useLazyStripePaymentIntentQuery()

  const handleCheckout = async (payload: CheckoutPayload) => {
    try {
      return await checkout(payload)
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

  return { handleCheckout, clientSecret: paymentIntent?.client_secret, getPaymentIntentClientSecret }
}

export default useStripeHandling
