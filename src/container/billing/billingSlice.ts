import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { UserQuota } from './billingTypes'
import { MaybeNull } from '@/utils/commonTypes'

import { billingAPI } from './api/billingAPI'

type initialType = {
  userQuota: MaybeNull<UserQuota>
}
const initialState: initialType = {
  userQuota: null,
}

export const billingSlice = createSlice({
  name: 'billingSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<MaybeNull<UserQuota>>) => {
      state.userQuota = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(billingAPI.endpoints.getUserQuota.matchFulfilled, (state, { payload }) => {
      state.userQuota = payload?.result
    })
  },
})

export const {} = billingSlice.actions

export default billingSlice.reducer
