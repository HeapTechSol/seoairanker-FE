import { baseQueryApi } from '@/api/queryAPI'
import { APIEndpoint } from '@/constant/apiEndPoints'
import { APIResponseMessage } from '@/utils/commonTypes'
import {
  AddSitePayload,
  CrawledInfoAPIResponseTypes,
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
  SITE_LINKS_AND_CONTENT,
  SITE_PAGE_INSIGHTS,
  SITE_RECOMMENDATION_COUNTS,
  SITE_RECOMMENDATION_DATA,
  SITE_CRAWLING_INFO,
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
    }),
    getSiteCrawledInfo: builder.query<CrawledInfoAPIResponseTypes, { site_id: string }>({
      query: (payload) => ({
        url: SITE_CRAWLING_INFO,
        method: 'POST',
        body: payload,
      }),
    }),
    getRecommendationsData: builder.query<RecommendationsAPIResponseTypes, { site_id: string }>({
      query: (payload) => ({
        url: SITE_RECOMMENDATION_DATA,
        method: 'POST',
        body: payload,
      }),
    }),
    reCrawlSite: builder.query<RecommendationsAPIResponseTypes, { site_id: string; siteUrl: string }>({
      query: (payload) => ({
        url: RE_CRAWL_SITE,
        method: 'POST',
        body: payload,
      }),
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
  useLazyGetSightInsightsQuery,
  useLazyGetSiteCrawledInfoQuery,
  useLazyGetSiteLinksAndContentQuery,
  useLazyGetRecommendationsCountQuery,
  useLazyGetRecommendationsDataQuery,
} = sitesAPI
