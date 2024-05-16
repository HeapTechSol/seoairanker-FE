import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from './store'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'

let isError = false

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_BASE_URL,
  prepareHeaders: (headers, { endpoint, getState }) => {
    if ((getState() as RootState).auth.user?.access_token) {
      const token = (getState() as RootState).auth.user?.access_token
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
})

export const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    if (!isError) {
      // api.dispatch(setUserAuth({ authToken: '', user: null }))
      isError = true
    }
  } else {
    isError = false
  }
  return result
}

export const baseQueryApi = createApi({
  baseQuery: baseQueryWithReAuth,
  reducerPath: 'api',
  endpoints: () => ({}),
  keepUnusedDataFor: 600,
  tagTypes: ['sitesList'],
})
