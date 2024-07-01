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

export type UserQuota = {
  total_keywords_quota: number
  total_meta_description_quota: number
  total_meta_title_quota: number
  total_pages_quota: number
  total_sites_quota: number
  total_team_members_quota: number
  used_keywords_quota: number
  used_meta_description_quota: number
  used_meta_title_quota: number
  used_pages_quota: number
  used_sites_quota: number
}

export type GetUserQuotaAPIResponseTypes = {
  result: UserQuota
}
