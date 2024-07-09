import { baseQueryApi } from '@/api/queryAPI'
import { APIEndpoint } from '@/constant/apiEndPoints'
import { APIResponseMessage } from '@/utils/commonTypes'
import {
  AddSitePayload,
  CrawledInfoAPIResponseTypes,
  GetKeywordsAPIResponseTypes,
  RecommendationsAPIResponseTypes,
  RecommendationsCountAPIResponseTypes,
  SiteLinkPayloadTypes,
  SiteLinksAPIResponseTypes,
  SitesAPIResponseTypes,
} from '../sitesTypes'

const {
  ADD_SITE,
  SITES_LIST,
  DELETE_SITE,
  GET_KEYWORDS,
  SITE_PAGE_INSIGHTS,
  SITE_CRAWLING_INFO,
  UPDATE_RECOMMENDATION,
  SITE_LINKS_AND_CONTENT,
  SITE_RECOMMENDATION_DATA,
  SITE_RECOMMENDATION_COUNTS,
  APPROVE_ALL_RECOMMENDATION,
  APPROVE_SINGLE_RECOMMENDATION,
  APPROVE_ALL_SELECTED_RECOMMENDATION,
  RE_CRAWL_SITE,
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
    getSiteKeywords: builder.query<GetKeywordsAPIResponseTypes, { siteUrl: string; language_code: string; location_code: string }>({
      query: (payload) => ({
        url: GET_KEYWORDS,
        method: 'POST',
        body: payload,
      }),
    }),
    getSites: builder.query<SitesAPIResponseTypes, void>({
      query: () => ({
        url: SITES_LIST,
        method: 'GET',
      }),
      providesTags: ['sitesList'],
    }),
    getSiteLinksAndContent: builder.query<SiteLinksAPIResponseTypes, SiteLinkPayloadTypes>({
      query: (payload) => ({
        url: SITE_LINKS_AND_CONTENT,
        method: 'POST',
        body: payload,
      }),
    }),
    getRecommendationsCount: builder.query<RecommendationsCountAPIResponseTypes, { site_id: string }>({
      query: (payload) => ({
        url: SITE_RECOMMENDATION_COUNTS,
        method: 'POST',
        body: payload,
      }),
      providesTags: ['recommendationsData'],
    }),
    getSiteCrawledInfo: builder.query<CrawledInfoAPIResponseTypes, { site_id: string }>({
      query: (payload) => ({
        url: SITE_CRAWLING_INFO,
        method: 'POST',
        body: payload,
      }),
      providesTags: ['recommendationsData'],
    }),
    getRecommendationsData: builder.query<RecommendationsAPIResponseTypes, { site_id: string }>({
      query: (payload) => ({
        url: SITE_RECOMMENDATION_DATA,
        method: 'POST',
        body: payload,
      }),
      providesTags: ['recommendationsData'],
    }),
    reCrawlSite: builder.query<RecommendationsAPIResponseTypes, { site_id: string; siteUrl: string }>({
      query: (payload) => ({
        url: RE_CRAWL_SITE,
        method: 'POST',
        body: payload,
      }),
    }),
    approveAllRecommendations: builder.mutation<{ message: string }, { site_id: string; status: string }>({
      query: (payload) => ({
        url: APPROVE_ALL_RECOMMENDATION,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: (_result, error) => (error ? [] : ['recommendationsData']),
    }),
    approveAllSelectedRecommendations: builder.mutation<{ message: string }, { site_id: string; status: string; type: string }>({
      query: (payload) => ({
        url: APPROVE_ALL_SELECTED_RECOMMENDATION,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: (_result, error) => (error ? [] : ['recommendationsData']),
    }),
    approveSingleRecommendation: builder.mutation<{ message: string }, { site_id: string; status: string; type: string; type_id: string }>({
      query: (payload) => ({
        url: APPROVE_SINGLE_RECOMMENDATION,
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
  useLazyGetSiteKeywordsQuery,
  useLazyGetSightInsightsQuery,
  useLazyGetSiteCrawledInfoQuery,
  useUpdateRecommendationsMutation,
  useLazyGetSiteLinksAndContentQuery,
  useLazyGetRecommendationsDataQuery,
  useLazyGetRecommendationsCountQuery,
  useApproveAllRecommendationsMutation,
  useApproveSingleRecommendationMutation,
  useApproveAllSelectedRecommendationsMutation,
} = sitesAPI
