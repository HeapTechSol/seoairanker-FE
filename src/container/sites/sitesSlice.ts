import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { CrawledInfoAPIResponseTypes, GetRecommendationsByModelAPIResponseTypes, NotificationsAPIResponseTypes } from './sitesTypes'

type initialType = {
  crawledInfo: CrawledInfoAPIResponseTypes['data']
  notificationsData: NotificationsAPIResponseTypes
  recommendationData: GetRecommendationsByModelAPIResponseTypes
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
  recommendationData: { approved_count: 0, data: [], page: 1, total_count: 0, unapproved_count: 0 },
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
    setRecommendationsData: (state, action: PayloadAction<GetRecommendationsByModelAPIResponseTypes>) => {
      state.recommendationData = action.payload
    },
  },
})

export const { setNotificationsData, setCrawledInfo, setRecommendationsData } = sitesSlicer.actions

export default sitesSlicer.reducer
