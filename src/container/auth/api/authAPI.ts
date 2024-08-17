import { baseQueryApi } from '@/api/queryAPI'
import { APIEndpoint } from '@/constant/apiEndPoints'

import * as authTypes from '../authTypes'

const { LOGIN, SIGNUP, GOOGLE_AUTH, UPDATE_PROFILE, UPDATE_PASSWORD } = APIEndpoint

export const authApi = baseQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.query<{ data: authTypes.UserTypes }, authTypes.LoginPayload>({
      query: (payload) => ({
        url: LOGIN,
        method: 'POST',
        body: payload,
      }),
    }),
    googleAuth: builder.query<{ data: authTypes.UserTypes }, authTypes.GoogleLoginPayload>({
      query: (payload) => ({
        url: GOOGLE_AUTH,
        method: 'POST',
        body: payload,
      }),
    }),
    signUp: builder.query<{ data: authTypes.UserTypes; message: string }, authTypes.SignUpPayload>({
      query: (payload) => ({
        url: SIGNUP,
        method: 'POST',
        body: payload,
      }),
    }),
    updateUserProfile: builder.mutation<{ data: authTypes.User; message: string }, authTypes.UpdateUserProfilePayload>({
      query: (payload) => ({
        url: UPDATE_PROFILE,
        method: 'PATCH',
        body: payload,
      }),
    }),
    updateUserPassword: builder.mutation<{ message: string }, authTypes.UpdateUserPasswordPayload>({
      query: (payload) => ({
        url: UPDATE_PASSWORD,
        method: 'PATCH',
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useLazySignInQuery, useLazySignUpQuery, useUpdateUserProfileMutation, useUpdateUserPasswordMutation, useLazyGoogleAuthQuery } = authApi
