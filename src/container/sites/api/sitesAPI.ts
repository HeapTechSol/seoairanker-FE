import { baseQueryApi } from '@/api/queryAPI'
import { APIEndpoint } from '@/constant/apiEndPoints'
import { APIResponseMessage } from '@/utils/commonTypes'
import {
  AddSitePayload,
  SiteLinkPayloadTypes,
  SitesAPIResponseTypes,
  SiteLinksAPIResponseTypes,
  CrawledInfoAPIResponseTypes,
  GetKeywordsAPIResponseTypes,
  GetRecommendationsByTypesPayloadTypes,
  GetRecommendationsByModelAPIResponseTypes,
  ApproveRecommendationsPayloadTypes,
  GetKeywordsPayload,
  AddKeyWordsPayloadTypes,
  NotificationsAPIResponseTypes,
  NotificationAPIPayloadTypes,
  GetSitePathSearchResultsResponseTypes,
} from '../sitesTypes'

const {
  ADD_SITE,
  SITES_LIST,
  DELETE_SITE,
  GET_KEYWORDS,
  RE_CRAWL_SITE,
  GET_SITE_LINKS,
  SITE_PAGE_INSIGHTS,
  SITE_CRAWLING_INFO,
  NOTIFICATION_LISTING,
  UPDATE_RECOMMENDATION,
  SAVE_SELECTED_KEYWORDS,
  APPROVE_RECOMMENDATIONS,
  LINKS_PATH_SEARCH_RESULTS,
  GET_RECOMMENDATIONS_BY_TYPE,
} = APIEndpoint

export const sitesAPI = baseQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    addSite: builder.mutation<APIResponseMessage, AddSitePayload>({
      query: (payload) => ({
        url: ADD_SITE,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['sitesList'],
    }),
    getSiteKeywords: builder.query<GetKeywordsAPIResponseTypes, GetKeywordsPayload>({
      query: (params) => ({
        url: `${GET_KEYWORDS}/${params.site_id}`,
        method: 'GET',
        params: {
          page: params.page,
          per_page: params.per_page,
        },
      }),
    }),
    saveKeywords: builder.query<SitesAPIResponseTypes, AddKeyWordsPayloadTypes>({
      query: (payload) => ({
        url: SAVE_SELECTED_KEYWORDS,
        method: 'POST',
        body: payload,
      }),
      providesTags: ['sitesList'],
    }),
    getSites: builder.query<SitesAPIResponseTypes, void>({
      query: () => ({
        url: SITES_LIST,
        method: 'GET',
      }),
      providesTags: ['sitesList'],
    }),
    getSiteLinks: builder.query<SiteLinksAPIResponseTypes, SiteLinkPayloadTypes>({
      query: (params) => ({
        url: GET_SITE_LINKS,
        method: 'GET',
        params: params,
      }),
    }),
    getSitePathSearchResults: builder.query<GetSitePathSearchResultsResponseTypes, { path: string; site_id: string }>({
      query: (params) => ({
        url: `${LINKS_PATH_SEARCH_RESULTS}/${params.site_id}`,
        method: 'GET',
        params: {
          path: params.path,
        },
      }),
    }),
    getSiteCrawledInfo: builder.query<CrawledInfoAPIResponseTypes, { site_id: string; link_id?: string }>({
      query: (payload) => ({
        url: `${SITE_CRAWLING_INFO}/${payload.site_id}${payload?.link_id ? `?link_id=${payload.link_id}` : ''}`,
        method: 'GET',
      }),
      providesTags: ['recommendationsData'],
    }),
    getRecommendationsByType: builder.query<
      GetRecommendationsByModelAPIResponseTypes,
      GetRecommendationsByTypesPayloadTypes & { site_id: string; link_id?: string }
    >({
      query: (params) => ({
        url: `${GET_RECOMMENDATIONS_BY_TYPE}/${params.site_id}${params?.link_id ? `?link_id=${params.link_id}` : ''}`,
        method: 'GET',
        params: { type: params.type, per_page: params.per_page, page: params.page },
      }),
      providesTags: ['recommendationsData'],
    }),
    reCrawlSite: builder.query<GetRecommendationsByModelAPIResponseTypes, { site_id: string; siteUrl: string }>({
      query: (payload) => ({
        url: RE_CRAWL_SITE,
        method: 'POST',
        body: payload,
      }),
    }),
    approveRecommendations: builder.mutation<{ message: string }, ApproveRecommendationsPayloadTypes>({
      query: (payload) => ({
        url: APPROVE_RECOMMENDATIONS,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: (_result, error) => (error ? [] : ['recommendationsData']),
    }),
    updateRecommendations: builder.mutation<{ message: string }, { site_id: string; data: string; type: string; type_id: string }>({
      query: (payload) => ({
        url: UPDATE_RECOMMENDATION,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: (_result, error) => (error ? [] : ['recommendationsData']),
    }),
    getSightInsights: builder.query({
      query: (payload) => ({
        url: SITE_PAGE_INSIGHTS,
        method: 'GET',
        params: payload,
      }),
    }),
    getNotifications: builder.query<NotificationsAPIResponseTypes, NotificationAPIPayloadTypes>({
      query: (params) => ({
        url: NOTIFICATION_LISTING,
        method: 'GET',
        params: params,
      }),
    }),
    readNotification: builder.query<NotificationsAPIResponseTypes, { id: string }>({
      query: (params) => ({
        url: `${NOTIFICATION_LISTING}/${params.id}/read`,
        method: 'POST',
      }),
    }),
    deleteSite: builder.mutation({
      query: (id) => ({
        url: `${DELETE_SITE}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, error) => (error ? [] : ['sitesList']),
    }),
  }),
  overrideExisting: false,
})

export const {
  useAddSiteMutation,
  useLazyGetSitesQuery,
  useDeleteSiteMutation,
  useLazyReCrawlSiteQuery,
  useLazySaveKeywordsQuery,
  useLazyGetSiteLinksQuery,
  useLazyGetSiteKeywordsQuery,
  useLazyReadNotificationQuery,
  useLazyGetNotificationsQuery,
  useLazyGetSightInsightsQuery,
  useLazyGetSiteCrawledInfoQuery,
  useUpdateRecommendationsMutation,
  useApproveRecommendationsMutation,
  useLazyGetSitePathSearchResultsQuery,
  useLazyGetRecommendationsByTypeQuery,
} = sitesAPI
