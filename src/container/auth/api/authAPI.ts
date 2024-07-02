import { baseQueryApi } from "@/api/queryAPI";
import { APIEndpoint } from "@/constant/apiEndPoints";

import * as authTypes from "../authTypes";

const { LOGIN, SIGNUP, GOOGLE_AUTH } = APIEndpoint;

export const authApi = baseQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.query<{ result: authTypes.UserTypes }, authTypes.LoginPayload>({
      query: (payload) => ({
        url: LOGIN,
        method: "POST",
        body: payload,
      }),
    }),
    googleAuth: builder.query<{ result: authTypes.UserTypes }, authTypes.GoogleLoginPayload>({
      query: (payload) => ({
        url: GOOGLE_AUTH,
        method: "POST",
        body: payload,
      }),
    }),
    signUp: builder.query<{ result: authTypes.UserTypes, message:string }, authTypes.SignUpPayload>({
      query: (payload) => ({
        url: SIGNUP,
        method: "POST",
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazySignInQuery, useLazySignUpQuery, useLazyGoogleAuthQuery } = authApi;
