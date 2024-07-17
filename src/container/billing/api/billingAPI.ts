import { baseQueryApi } from '@/api/queryAPI'
import { APIEndpoint } from '@/constant/apiEndPoints'
import { GetPaymentHistoryAPIResponseTypes, GetPaymentHistoryPayloadTypes, GetUserQuotaAPIResponseTypes } from '../billingTypes'

const { CHECKOUT, BILLING_HISTORY, STRIPE_PAYMENT_INTENT, USER_QUOTA, CANCEL_SUBSCRIPTION } = APIEndpoint

export const billingAPI = baseQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (payload) => ({
        url: CHECKOUT,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: (_result, error) => (error ? [] : ['userQuota']),
    }),
    stripePaymentIntent: builder.query<{ client_secret: string }, void>({
      query: (payload) => ({
        url: STRIPE_PAYMENT_INTENT,
        method: 'POST',
        body: payload,
      }),
    }),
    getBillingHistory: builder.query<GetPaymentHistoryAPIResponseTypes, GetPaymentHistoryPayloadTypes>({
      query: (payload) => ({
        url: BILLING_HISTORY,
        method: 'POST',
        body: payload,
      }),
    }),
    cancelSubscription: builder.mutation<GetPaymentHistoryAPIResponseTypes, { user_id: string }>({
      query: (payload) => ({
        url: `${CANCEL_SUBSCRIPTION}/${payload.user_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, error) => (error ? [] : ['userQuota']),
    }),
    getUserQuota: builder.query<GetUserQuotaAPIResponseTypes, { user_id: number }>({
      query: (payload) => ({
        url: `${USER_QUOTA}/${payload.user_id}`,
        method: 'GET',
      }),
      providesTags: ['userQuota'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCheckoutMutation,
  useLazyGetUserQuotaQuery,
  useCancelSubscriptionMutation,
  useLazyGetBillingHistoryQuery,
  useLazyStripePaymentIntentQuery,
} = billingAPI
