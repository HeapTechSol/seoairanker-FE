import { useLazyCheckoutQuery } from '../api/billingAPI'

export type CheckoutPayload = {
  payment_method_id: string
  plan_id: string
  email:string,
  addons: { price_id: string; quantity: number }[]
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
