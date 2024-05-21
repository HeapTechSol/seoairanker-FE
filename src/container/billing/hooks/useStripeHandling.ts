import { useLazyCheckoutQuery } from "../api/billingAPI"

export type CheckoutPayload =   {
  interval: "month",
  plan_id:string,
  plan_name: string,
  base_price:number,
  additional_properties: {name:string, price:number} []
};

const useStripeHandling = () =>{
  const [checkout] = useLazyCheckoutQuery()

  const handleCheckout = async(payload:CheckoutPayload)=>{
    try {
      return await checkout(payload)
    } catch (error) {
      console.log(error)
    }
  }
  
  return {handleCheckout}
}

export default useStripeHandling