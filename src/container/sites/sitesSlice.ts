import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { NotificationsAPIResponseTypes } from './sitesTypes'

type initialType = {
  notificationsData: NotificationsAPIResponseTypes
}
const initialState: initialType = {
  notificationsData: {
    data: [],
    page: 1,
    total: 0,
    per_page: 10,
    unread_count: 0,
  },
}

export const sitesSlicer = createSlice({
  name: 'sitesSlicer',
  initialState,
  reducers: {
    setNotificationsData: (state, action: PayloadAction<NotificationsAPIResponseTypes>) => {
      state.notificationsData = action.payload
    },
  },
})

export const { setNotificationsData } = sitesSlicer.actions

export default sitesSlicer.reducer
