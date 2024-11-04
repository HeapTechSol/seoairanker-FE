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
  SchemaResponseTypes,
  GetSchemaTypesPayloadTypes,
  SchemaPagesListPayloadTypes,
  SchemaPagesListAPIResponseTypes,
  ApproveSchemaPayloadTypes,
  GetPageSchemaByTypesAPIResponseTypes,
} from '../sitesTypes'
import { RootState } from '@/api/store'

const {
  ADD_SITE,
  GET_SCRIPT,
  SITES_LIST,
  DELETE_SITE,
  GET_KEYWORDS,
  RE_CRAWL_PAGE,
  RE_CRAWL_SITE,
  GET_SITE_LINKS,
  GET_SCHEMA_TYPES,
  SITE_PAGE_INSIGHTS,
  SITE_CRAWLING_INFO,
  GENERATE_SITE_SCHEMA,
  NOTIFICATION_LISTING,
  GET_SCHEMA_PAGES_TYPES,
  SAVE_SELECTED_KEYWORDS,
  APPROVE_RECOMMENDATIONS,
  LINKS_PATH_SEARCH_RESULTS,
  GET_SCHEMA_RECOMMENDATIONS,
  GET_RECOMMENDATIONS_BY_TYPE,
  EXPORT_RECOMMENDATIONS_TO_CSV,
  APPROVE_SCHEMA_RECOMMENDATIONS,
} = APIEndpoint

export const sitesAPI = baseQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    addSite: builder.mutation<APIResponseMessage, AddSitePayload>({
      query: (payload) => ({
        url: ADD_SITE,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: (_result, error) => (error ? [] : ['sitesList', 'userQuota']),
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
    saveKeywords: builder.mutation<SitesAPIResponseTypes, AddKeyWordsPayloadTypes>({
      query: (payload) => ({
        url: SAVE_SELECTED_KEYWORDS,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: (_result, error) => (error ? [] : ['sitesList', 'userQuota']),
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
    getSchemaPagesList: builder.query<SchemaPagesListAPIResponseTypes, SchemaPagesListPayloadTypes>({
      query: (params) => ({
        url: `${GET_SCHEMA_PAGES_TYPES}/${params.site_id}${params?.link_id ? `?link_id=${params.link_id}` : ''}`,
        method: 'GET',
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
      async onQueryStarted(payload, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled
          const state = getState() as RootState

          dispatch(
            sitesAPI.util.updateQueryData('getRecommendationsByType', payload, (draft) => {
              if (state?.sites?.recommendationData?.data && Array.isArray(draft.data) && data.page > 1) {
                // @ts-ignore
                draft.data = [...state?.sites?.recommendationData?.data, ...data.data]
              }
              draft.page = data.page
              draft.total_count = data.total_count
              draft.per_page = data.per_page
            })
          )
        } catch (error) {
          console.error('Error appending pagination data:', error)
        }
      },
    }),

    getSchemaPagesData: builder.query<GetPageSchemaByTypesAPIResponseTypes, GetSchemaTypesPayloadTypes & { site_id: string; link_id?: string }>({
      query: (params) => ({
        url: `${GET_SCHEMA_RECOMMENDATIONS}/${params.site_id}/${params.type}${params?.link_id ? `?link_id=${params.link_id}` : ''}`,
        method: 'GET',
        params: { per_page: params.per_page, page: params.page },
      }),
      async onQueryStarted(payload, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled
          const state = getState() as RootState

          dispatch(
            sitesAPI.util.updateQueryData('getSchemaPagesData', payload, (draft) => {
              if (state?.sites?.recommendationData?.data && Array.isArray(draft.data) && data.page > 1) {
                // @ts-ignore
                draft.data = [...state?.sites?.recommendationData?.data, ...data.data]
              }
              draft.page = data.page
              draft.total = data.total
              draft.per_page = data.per_page
            })
          )
        } catch (error) {
          console.error('Error appending pagination data:', error)
        }
      },
    }),

    reCrawlSite: builder.mutation<GetRecommendationsByModelAPIResponseTypes, { site_id: string; siteUrl: string }>({
      query: (payload) => ({
        url: RE_CRAWL_SITE,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: (_result, error) => (error ? [] : ['userQuota']),
    }),
    reCrawlSitePage: builder.mutation<GetRecommendationsByModelAPIResponseTypes, { site_id: string; link_id: string }>({
      query: (payload) => ({
        url: RE_CRAWL_PAGE,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: (_result, error) => (error ? [] : ['userQuota']),
    }),
    approveRecommendations: builder.mutation<{ message: string }, ApproveRecommendationsPayloadTypes>({
      query: (payload) => ({
        url: APPROVE_RECOMMENDATIONS,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: (_result, error) => (error ? [] : ['userQuota']),
    }),
    approveSchemaRecommendation: builder.mutation<{ message: string }, ApproveSchemaPayloadTypes>({
      query: (payload) => ({
        url: `${APPROVE_SCHEMA_RECOMMENDATIONS}/${payload.website_id}`,
        method: 'post',
        body: payload,
      }),
      invalidatesTags: (_result, error) => (error ? [] : ['userQuota']),
    }),
    approveSiteSchema: builder.mutation<{ message: string }, { id: string; schema_types: string[]; crawl_interval: string }>({
      query: (payload) => ({
        url: `${GENERATE_SITE_SCHEMA}/${payload.id}`,
        method: 'PATCH',
        body: { schema_types: payload.schema_types, crawl_interval: payload.crawl_interval },
      }),
    }),
    getSightInsights: builder.query({
      query: (id) => ({
        url: SITE_PAGE_INSIGHTS,
        method: 'GET',
        params: { id },
      }),
    }),
    getNotifications: builder.query<NotificationsAPIResponseTypes, NotificationAPIPayloadTypes>({
      query: (params) => ({
        url: NOTIFICATION_LISTING,
        method: 'GET',
        params: params,
      }),
    }),
    exportToCSV: builder.query<{ approvedItems: '' }, { site_id: string }>({
      query: (payload) => ({
        url: `${EXPORT_RECOMMENDATIONS_TO_CSV}/${payload.site_id}`,
        method: 'GET',
      }),
    }),
    readNotification: builder.query<NotificationsAPIResponseTypes, { id: string }>({
      query: (params) => ({
        url: `${NOTIFICATION_LISTING}/${params.id}/read`,
        method: 'GET',
      }),
    }),
    getSiteScript: builder.query<NotificationsAPIResponseTypes, { id: string }>({
      query: (params) => ({
        url: `${GET_SCRIPT}/${params.id}`,
        method: 'POST',
      }),
    }),
    getSchemaTypes: builder.query<SchemaResponseTypes, { id: string }>({
      query: (params) => ({
        url: `${GET_SCHEMA_TYPES}/${params.id}`,
        method: 'GET',
      }),
    }),
    deleteSite: builder.mutation({
      query: (id) => ({
        url: `${DELETE_SITE}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, error) => (error ? [] : ['sitesList', 'userQuota']),
    }),
  }),
  overrideExisting: false,
})

export const {
  useAddSiteMutation,
  useLazyGetSitesQuery,
  useDeleteSiteMutation,
  useReCrawlSiteMutation,
  useSaveKeywordsMutation,
  useLazyExportToCSVQuery,
  useLazyGetSiteLinksQuery,
  useLazyGetSiteScriptQuery,
  useLazyGetSchemaTypesQuery,
  useLazyGetSiteKeywordsQuery,
  useReCrawlSitePageMutation,
  useLazyReadNotificationQuery,
  useApproveSiteSchemaMutation,
  useLazyGetNotificationsQuery,
  useLazyGetSightInsightsQuery,
  useLazyGetSiteCrawledInfoQuery,
  useLazyGetSchemaPagesListQuery,
  useLazyGetSchemaPagesDataQuery,
  useApproveRecommendationsMutation,
  useLazyGetSitePathSearchResultsQuery,
  useLazyGetRecommendationsByTypeQuery,
  useApproveSchemaRecommendationMutation,
} = sitesAPI
