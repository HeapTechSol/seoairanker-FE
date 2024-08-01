export type PaymentHistoryResponseTypes = {
  id: number
  amount: number
  status: string
  payment_date: string
  payment_method: string
  stripe_transaction_id: string
}

export type GetPaymentHistoryAPIResponseTypes = {
  result: { next_page_token: string; payments: PaymentHistoryResponseTypes[] }
}

export type GetPaymentHistoryPayloadTypes = { limit: number; starting_after: string | null }

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
  pricing_id: string
  planId: number
  amount: number
  plan_type: string
  addOns: StateAddOnsTypes[]
}

export type GetUserQuotaAPIResponseTypes = {
  total_pages_quota: number
  total_sites_quota: number
  total_keywords_quota: number
  remaining_sites_quota: number
  remaining_pages_quota: number
  total_meta_title_quota: number
  total_team_members_quota: number
  remaining_keywords_quota: number
  remaining_meta_title_quota: number
  remaining_team_members_quota: number
  total_meta_description_quota: number
  remaining_meta_description_quota: number
}

export type APIKeysDataTypes = { token: string; last_used: string }
