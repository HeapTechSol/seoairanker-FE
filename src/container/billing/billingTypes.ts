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
  pages_quota: number
  sites_quota: number
  keywords_quota: number
  pages_quota_left: number
  meta_title_quota: number
  sites_quota_left: number
  team_members_quota: number
  keywords_quota_left: number
  meta_title_quota_left: number
  meta_description_quota: number
  team_members_quota_left: number
  meta_description_quota_left: number
}