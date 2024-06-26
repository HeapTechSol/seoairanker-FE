import { baseQueryApi } from '@/api/queryAPI'
import { APIEndpoint } from '@/constant/apiEndPoints'
import { GetPaymentHistoryAPIResponseTypes, GetPaymentHistoryPayloadTypes } from '../billingTypes'

const { CHECKOUT, BILLING_HISTORY } = APIEndpoint

export const sitesAPI = baseQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.query({
      query: (payload) => ({
        url: CHECKOUT,
        method: 'POST',
        body: payload,
      }),
    }),
    getBillingHistory: builder.query< GetPaymentHistoryAPIResponseTypes, GetPaymentHistoryPayloadTypes>({
      query: (payload) => ({
        url: BILLING_HISTORY,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useLazyCheckoutQuery, useLazyGetBillingHistoryQuery } = sitesAPI
