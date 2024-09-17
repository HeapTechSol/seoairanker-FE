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
  ModalTypes,
  ModalDataTypes,
  AllModalDataTypes,
} from '../sitesTypes'
import { MaybeDrafted } from 'node_modules/@reduxjs/toolkit/dist/query/core/buildThunks'
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
  SAVE_SELECTED_KEYWORDS,
  APPROVE_RECOMMENDATIONS,
  LINKS_PATH_SEARCH_RESULTS,
  GET_RECOMMENDATIONS_BY_TYPE,
  EXPORT_RECOMMENDATIONS_TO_CSV,
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
      async onQueryStarted(payload, { dispatch, queryFulfilled, getState }) {
        const state = getState() as RootState

        const recommendationsByTypeData = sitesAPI.endpoints.getRecommendationsByType.select({
          page: state.sites?.recommendationData?.page || 1,
          per_page: state.sites?.recommendationData?.per_page || 10,
          type: (payload.model as ModalTypes) || state.sites?.recommendationData?.modal,
          link_id: payload.filter_conditions.link_id || '',
          site_id: payload.filter_conditions.site_id,
        })(state)

        const filterActiveData = recommendationsByTypeData?.data?.data?.filter((item) => item.approved)

        const countAlreadyInserted = filterActiveData?.reduce((prev, curr) => {
          return (prev += Number(curr.count))
        }, 0)

        const selectedEntityOfModelCount = Number(
          state.sites?.recommendationData?.data?.find((item) => item.id == payload.filter_conditions.id)?.count || 1
        )

        const updateSiteData = (draft: MaybeDrafted<CrawledInfoAPIResponseTypes>) => {
          if (payload.bulk && !payload.model) {
            const siteData = { total_approved: payload.update_data.approved ? draft.data.site_data?.total_count : 0 }
            const modalData = draft.data.model_data?.map((item) => ({ ...item, approved: payload.update_data.approved ? item.total : 0 }))
            return { siteData, modalData }
          }

          const modalAlreadyApprovedCount = recommendationsByTypeData?.data?.approved_count
          const selectedModal = draft.data.model_data?.find((item) => item.model === payload.model)
          const greaterNumber = Math.max(modalAlreadyApprovedCount || 0, countAlreadyInserted || 0)
          if (payload.bulk && payload.model && selectedModal) {
            const siteData = {
              total_approved:
                (greaterNumber ? (draft.data.site_data?.total_approved || 0) - greaterNumber : draft.data.site_data?.total_approved || 0) +
                selectedModal.total,
            }

            const modalData = draft.data.model_data?.map((item) => {
              if (item.model === selectedModal.model) return { ...item, approved: selectedModal.total }
              return item
            })
            return { siteData, modalData }
          }

          if (payload.model && !payload.bulk && selectedEntityOfModelCount) {
            const siteData = {
              total_approved: payload.update_data.approved
                ? (draft.data.site_data?.total_approved || 0) + selectedEntityOfModelCount
                : (draft.data.site_data?.total_approved || 0) - selectedEntityOfModelCount,
            }
            const modalData = draft.data.model_data?.map((item) => {
              if (item.model === payload.model)
                return {
                  ...item,
                  approved: payload.update_data.approved
                    ? (item.approved || 0) + selectedEntityOfModelCount
                    : (item.approved || 0) - selectedEntityOfModelCount,
                }
              return item
            })

            return { siteData, modalData }
          }
        }

        const siteDetails = dispatch(
          sitesAPI.util.updateQueryData(
            'getSiteCrawledInfo',
            { site_id: payload.filter_conditions.site_id, link_id: payload.filter_conditions.link_id },
            (draft) => {
              draft.data = {
                ...draft.data,
                site_data: { ...draft.data.site_data, ...updateSiteData(draft)?.siteData } as CrawledInfoAPIResponseTypes['data']['site_data'],
                model_data: updateSiteData(draft)?.modalData as ModalDataTypes[],
              }
            }
          )
        )

        const modelDetailsByType = dispatch(
          sitesAPI.util.updateQueryData(
            'getRecommendationsByType',
            {
              page: state.sites?.recommendationData?.page || 1,
              per_page: state.sites?.recommendationData?.per_page || 10,
              type: (payload.model as ModalTypes) || state.sites?.recommendationData?.modal,
              link_id: payload.filter_conditions.link_id || '',
              site_id: payload.filter_conditions.site_id,
            },
            (draft: GetRecommendationsByModelAPIResponseTypes) => {
              if (payload.bulk && !payload.model) {
                draft.approved_count = payload.update_data.approved ? draft.total_count : 0
                draft.unapproved_count = payload.update_data.approved ? 0 : draft.total_count
                draft.data = draft.data?.map((item) => ({ ...item, approved: payload.update_data.approved })) as AllModalDataTypes
                return
              }
              if (!payload.bulk) {
                draft.data = draft.data?.map((item) => {
                  if (item.id == payload.filter_conditions.id) {
                    return { ...item, approved: payload.update_data.approved }
                  }
                  return item
                }) as AllModalDataTypes
                draft.approved_count = payload.update_data.approved
                  ? draft.approved_count + selectedEntityOfModelCount
                  : draft.approved_count - selectedEntityOfModelCount
                draft.unapproved_count = payload.update_data.approved
                  ? draft.approved_count - selectedEntityOfModelCount
                  : draft.approved_count + selectedEntityOfModelCount
                return
              }
              if (payload.bulk && payload.model) {
                draft.approved_count = draft.total_count
                draft.unapproved_count = 0
                draft.data = draft.data?.map((item) => ({ ...item, approved: payload.update_data.approved })) as AllModalDataTypes
                return
              }
            }
          )
        )

        try {
          await queryFulfilled
        } catch {
          siteDetails.undo()
          modelDetailsByType.undo()
        }
      },
    }),
    approveSiteSchema: builder.mutation<{ message: string }, { id: string; schema_types: string[] }>({
      query: (payload) => ({
        url: `${GENERATE_SITE_SCHEMA}/${payload.id}`,
        method: 'PATCH',
        body: { schema_types: payload.schema_types },
      }),
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
  useApproveRecommendationsMutation,
  useLazyGetSitePathSearchResultsQuery,
  useLazyGetRecommendationsByTypeQuery,
} = sitesAPI
