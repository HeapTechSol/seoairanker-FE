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
  UPDATE_RECOMMENDATION,
  SAVE_SELECTED_KEYWORDS,
  APPROVE_RECOMMENDATIONS,
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
    getSiteCrawledInfo: builder.query<CrawledInfoAPIResponseTypes, string>({
      query: (site_id) => ({
        url: `${SITE_CRAWLING_INFO}/${site_id}`,
        method: 'GET',
      }),
      providesTags: ['recommendationsData'],
    }),
    getRecommendationsByType: builder.query<GetRecommendationsByModelAPIResponseTypes, GetRecommendationsByTypesPayloadTypes & { site_id: string }>({
      query: (params) => ({
        url: `${GET_RECOMMENDATIONS_BY_TYPE}/${params.site_id}`,
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
  useLazyGetSightInsightsQuery,
  useLazyGetSiteCrawledInfoQuery,
  useUpdateRecommendationsMutation,
  useApproveRecommendationsMutation,
  useLazyGetRecommendationsByTypeQuery,
} = sitesAPI
