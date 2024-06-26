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

export type GetPaymentHistoryPayloadTypes = {email:string, limit:number,starting_after:string | null }