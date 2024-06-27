export type PaymentHistoryResponseTypes = {
  id: string
  plan: string
  amount: number
  status: string
  created: number
  currency: string
  period_end: number
  description: string
  period_start: number
}

export type GetPaymentHistoryAPIResponseTypes = {
  result: { next_page_token: string; payments: PaymentHistoryResponseTypes[] }
}

export type GetPaymentHistoryPayloadTypes = { email: string; limit: number; starting_after: string | null }

export type CheckoutPayload = {
  payment_method_id: string
  plan_id: string
  email: string
  addons: { price_id: string; quantity: number }[]
}

export type StateAddOnsTypes = {
  key: string
  amount: number
  step: number
  quantity: number
  plan_id: string
}

export type CheckoutStateTypes = {
  plan_id:string, 
  amount:number,
  plan_type:string,
  addOns:StateAddOnsTypes[]
}