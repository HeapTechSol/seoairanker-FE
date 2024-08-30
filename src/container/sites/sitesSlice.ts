import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { CrawledInfoAPIResponseTypes, GetRecommendationsByModelAPIResponseTypes, NotificationsAPIResponseTypes } from './sitesTypes'
import { sitesAPI } from './api/sitesAPI'

type initialType = {
  isGetSiteDataPending: boolean
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
  isGetSiteDataPending: false,
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
  extraReducers: (builder) => {
    builder.addMatcher(sitesAPI.endpoints.getSiteCrawledInfo.matchPending, (state) => {
      state.isGetSiteDataPending = true
    })
    builder.addMatcher(sitesAPI.endpoints.getSiteCrawledInfo.matchRejected, (state) => {
      state.isGetSiteDataPending = false
    })
    builder.addMatcher(sitesAPI.endpoints.getSiteCrawledInfo.matchFulfilled, (state) => {
      state.isGetSiteDataPending = false
    })
  },
})

export const { setNotificationsData, setCrawledInfo, setRecommendationsData } = sitesSlicer.actions

export default sitesSlicer.reducer
