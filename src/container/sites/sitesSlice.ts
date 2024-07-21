import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { CrawledInfoAPIResponseTypes, NotificationsAPIResponseTypes } from './sitesTypes'

type initialType = {
  crawledInfo: CrawledInfoAPIResponseTypes['data']
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
  crawledInfo: {
    site_data: null,
    model_data: [],
  },
}

export const sitesSlicer = createSlice({
  name: 'sitesSlicer',
  initialState,
  reducers: {
    setNotificationsData: (state, action: PayloadAction<NotificationsAPIResponseTypes>) => {
      state.notificationsData = action.payload
    },
    setCrawledInfo: (state, action: PayloadAction<CrawledInfoAPIResponseTypes['data']>) => {
      state.crawledInfo = action.payload
    },
  },
})

export const { setNotificationsData, setCrawledInfo } = sitesSlicer.actions

export default sitesSlicer.reducer
