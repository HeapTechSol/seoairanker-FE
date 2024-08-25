import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { GetUserQuotaAPIResponseTypes } from './billingTypes'
import { MaybeNull } from '@/utils/commonTypes'

import { billingAPI } from './api/billingAPI'

type initialType = {
  isUserQuotaLoading: boolean
  cardNumber: MaybeNull<string>
  userQuota: MaybeNull<GetUserQuotaAPIResponseTypes>
}
const initialState: initialType = {
  userQuota: null,
  cardNumber: null,
  isUserQuotaLoading: false,
}

export const billingSlice = createSlice({
  name: 'billingSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<MaybeNull<GetUserQuotaAPIResponseTypes>>) => {
      state.userQuota = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(billingAPI.endpoints.getUserQuota.matchPending, (state) => {
      state.isUserQuotaLoading = true
    })
    builder.addMatcher(billingAPI.endpoints.getUserQuota.matchRejected, (state) => {
      state.isUserQuotaLoading = false
    })
    builder.addMatcher(billingAPI.endpoints.getUserQuota.matchFulfilled, (state, { payload }) => {
      state.userQuota = payload?.data
      state.cardNumber = payload?.card?.user_card || ''
      state.isUserQuotaLoading = false
    })
  },
})

export default billingSlice.reducer
