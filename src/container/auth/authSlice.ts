import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { MaybeNull } from '@/utils/commonTypes'

import { User, UserTypes } from './authTypes'

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
    setUpdateUserData: (state, action: PayloadAction<User>) => {
      state.user = { ...state.user, user: action.payload } as UserTypes
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload
    },
  },
})

export const { setUser, setTheme, setUpdateUserData } = authSlice.actions

export default authSlice.reducer
