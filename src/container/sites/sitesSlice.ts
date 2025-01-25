import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { CrawledInfoAPIResponseTypes, GetPageSchemaByTypesAPIResponseTypes, GetRecommendationsByModelAPIResponseTypes, NotificationsAPIResponseTypes, SchemaPagesListAPIResponseTypes, SitesAPIResponseTypes } from './sitesTypes'
import { sitesAPI } from './api/sitesAPI'
import { MaybeNull } from '@/utils/commonTypes'

type initialType = {
  isGetSiteDataPending: boolean
  isApproveAPICallInProgress: boolean
  crawledInfo: CrawledInfoAPIResponseTypes['data'],
  userWebsitesData: MaybeNull<SitesAPIResponseTypes>
  notificationsData: NotificationsAPIResponseTypes
  schemaPagesTypeList: SchemaPagesListAPIResponseTypes['data']
  schemaPagesData: GetPageSchemaByTypesAPIResponseTypes
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
    categories: {},
    total: { total: 0, approved: 0, unapproved: 0 }
  },
  userWebsitesData: null,
  isGetSiteDataPending: false,
  isApproveAPICallInProgress: false,
  schemaPagesTypeList: [],
  schemaPagesData: { total: 0, data: [], page: 1, approved: 0, unapproved_count: 0 },
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
    setSchemaPagesData: (state, action: PayloadAction<GetPageSchemaByTypesAPIResponseTypes>) => {
      state.schemaPagesData = action.payload
    },
    setSchemaPagesList: (state, action: PayloadAction<SchemaPagesListAPIResponseTypes['data']>) => {
      state.schemaPagesTypeList = action.payload
    },
    setUserWebsitesData: (state, action: PayloadAction<MaybeNull<SitesAPIResponseTypes>>) => {
      state.userWebsitesData = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(sitesAPI.endpoints.getSiteCrawledInfo.matchPending, (state) => {
      state.isGetSiteDataPending = true
    })
    builder.addMatcher(sitesAPI.endpoints.getSiteCrawledInfo.matchRejected, (state) => {
      state.isGetSiteDataPending = false
    })
    builder.addMatcher(sitesAPI.endpoints.getSiteCrawledInfo.matchFulfilled, (state, { payload }) => {
      state.isGetSiteDataPending = false
      state.crawledInfo = payload.data
    })
    builder.addMatcher(sitesAPI.endpoints.approveRecommendations.matchPending, (state) => {
      state.isApproveAPICallInProgress = true
    })
    builder.addMatcher(sitesAPI.endpoints.approveRecommendations.matchRejected, (state) => {
      state.isApproveAPICallInProgress = false
    })
    builder.addMatcher(sitesAPI.endpoints.approveRecommendations.matchFulfilled, (state) => {
      state.isApproveAPICallInProgress = false
    })
  },
})

export const { setNotificationsData, setRecommendationsData, setSchemaPagesData, setSchemaPagesList, setUserWebsitesData } = sitesSlicer.actions

export default sitesSlicer.reducer
