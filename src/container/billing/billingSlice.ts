import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { GetUserQuotaAPIResponseTypes } from './billingTypes'
import { MaybeNull } from '@/utils/commonTypes'

import { billingAPI } from './api/billingAPI'

type initialType = {
  userQuota: MaybeNull<GetUserQuotaAPIResponseTypes>
}
const initialState: initialType = {
  userQuota: null,
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
    builder.addMatcher(billingAPI.endpoints.getUserQuota.matchFulfilled, (state, { payload }) => {
      state.userQuota = payload
    })
  },
})

export default billingSlice.reducer