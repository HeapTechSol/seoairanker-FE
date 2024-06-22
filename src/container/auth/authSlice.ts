import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { MaybeNull } from '@/utils/commonTypes'

import { UserTypes } from './authTypes'

type initialType = {
  user: MaybeNull<UserTypes>
  theme: 'light' | 'dark'
}
const initialState: initialType = {
  user: null,
  theme: 'light',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<MaybeNull<UserTypes>>) => {
      state.user = action.payload
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload
    },
  },
})

export const { setUser, setTheme } = authSlice.actions

export default authSlice.reducer
