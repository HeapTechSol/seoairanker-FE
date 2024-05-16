import { baseQueryApi } from "@/api/queryAPI";
import { APIEndpoint } from "@/constant/apiEndPoints";
import { APIResponseMessage } from "@/utils/commonTypes";
import { AddSitePayload, SitesAPIResponse } from "../sitesTypes";

const { ADD_SITE, SITES_LIST, DELETE_SITE } = APIEndpoint;

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
    getSites: builder.query<SitesAPIResponse[],void>({
      query: () => ({
        url: SITES_LIST,
        method: "GET",
      }),
      providesTags: ["sitesList"],
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

export const { useAddSiteMutation, useLazyGetSitesQuery, useDeleteSiteMutation } = sitesAPI;
