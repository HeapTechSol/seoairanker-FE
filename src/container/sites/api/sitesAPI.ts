import { baseQueryApi } from "@/api/queryAPI";
import { APIEndpoint } from "@/constant/apiEndPoints";
import { APIResponseMessage } from "@/utils/commonTypes";
import {
  AddSitePayload,
  SiteLinkPayloadTypes,
  SiteLinksAPIResponseTypes,
  SitesAPIResponse,
} from "../sitesTypes";

const { ADD_SITE, SITES_LIST, DELETE_SITE, SITE_LINKS_AND_CONTENT, SITE_PAGE_INSIGHTS } =
  APIEndpoint;

export const sitesAPI = baseQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    addSite: builder.mutation<APIResponseMessage, AddSitePayload>({
      query: (payload) => ({
        url: ADD_SITE,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["sitesList"],
    }),
    getSites: builder.query<{ result: SitesAPIResponse[] }, void>({
      query: () => ({
        url: SITES_LIST,
        method: "GET",
      }),
      providesTags: ["sitesList"],
    }),
    getSiteLinksAndContent: builder.query<SiteLinksAPIResponseTypes, SiteLinkPayloadTypes>({
      query: (payload) => ({
        url: SITE_LINKS_AND_CONTENT,
        method: "POST",
        body:payload
      }),
    }),
    getSightInsights: builder.query({
      query: (payload) => ({
        url:SITE_PAGE_INSIGHTS,
        method: "GET",
        params:payload
      }),
    }),
    deleteSite: builder.mutation({
      query: (id) => ({
        url: `${DELETE_SITE}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["sitesList"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddSiteMutation,
  useLazyGetSitesQuery,
  useDeleteSiteMutation,
  useLazyGetSightInsightsQuery,
  useLazyGetSiteLinksAndContentQuery,
} = sitesAPI;
