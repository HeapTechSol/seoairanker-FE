import { baseQueryApi } from "@/api/queryAPI";
import { APIEndpoint } from "@/constant/apiEndPoints";

const { BILLING } = APIEndpoint;

export const sitesAPI = baseQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.query({
      query: (payload) => ({
        url: BILLING,
        method: "POST",
        body:payload
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyCheckoutQuery } = sitesAPI;
