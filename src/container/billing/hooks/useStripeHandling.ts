import { useLazyCheckoutQuery } from '../api/billingAPI'

export type CheckoutPayload = {
  payment_method_id: string
  plan_id: string
  addons: { name: string; price: number }[]
}

const useStripeHandling = () => {
  const [checkout] = useLazyCheckoutQuery()

  const handleCheckout = async (payload: CheckoutPayload) => {
    try {
      return await checkout(payload)
    } catch (error) {
      console.log(error)
    }
  }

  return { handleCheckout }
}

export default useStripeHandling
