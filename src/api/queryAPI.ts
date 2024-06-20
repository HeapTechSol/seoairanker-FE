import { RootState } from "./store";
import type * as query from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { setUser } from "@/container/auth/authSlice";

let isError = false;

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    if ((getState() as RootState).auth.user?.access_token) {
      const token = (getState() as RootState).auth.user?.access_token;
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReAuth: query.BaseQueryFn<
  string | query.FetchArgs,
  unknown,
  query.FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!isError) {
      api.dispatch(setUser(null))
      isError = true;
    }
  } else {
    isError = false;
  }
  return result;
};

export const baseQueryApi = createApi({
  baseQuery: baseQueryWithReAuth,
  reducerPath: "api",
  endpoints: () => ({}),
  keepUnusedDataFor: 600,
  tagTypes: ["sitesList", "recommendationsData"],
});
