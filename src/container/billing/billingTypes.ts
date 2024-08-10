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

export type extraAddOns = [
  {
    key: 'price_extra_sites'
    step: 1
    value: 39
    per_set: 1
  },
  {
    key: 'price_extra_keywords'
    step: 100
    value: 24.99
    per_set: 100
  },
  {
    key: 'price_extra_pages'
    step: 250
    value: 14.99
    per_set: 250
  }
]

export type planDetailDescription = [
  {
    key: 'metaDescription'
    value: 500
    per_price: 0.1
  },
  {
    key: 'metaTitles'
    value: 5000
    per_price: 0.1
  },
  {
    key: 'keywordRanking'
    value: 2500
    per_price: 0.01
  },
  {
    key: 'pageCrawls'
    value: 7500
    per_price: 0.01
  },
  {
    key: 'Schema'
    value: 0
    per_price: 0.2
  }
]

export type PlanDataType = {
  id: string
  name: 'Basic' | 'Pro' | 'Enterprise' | 'Basic Annual' | 'Pro Annual' | 'Enterprise Annual'
  duration: string
  base_price: number
  created_at: string
  updated_at: string
  pages_quota: number
  api_access: boolean
  description: string
  sites_quota: number
  rank_interval: string
  keywords_quota: number
  crawl_interval: string
  stripe_price_id: string
  team_members_quota: number
  extra_addons: extraAddOns
  quota_details: planDetailDescription
}

export type AllPlansAPIResponseTypes = {
  data: { annually: PlanDataType[]; monthly: PlanDataType[] }
}

export type APIKeysDataTypes = { token: string; last_used: string }
