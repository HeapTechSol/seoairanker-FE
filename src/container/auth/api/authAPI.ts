import { baseQueryApi } from "@/api/queryAPI";
import { APIEndpoint } from "@/constant/apiEndPoints";
import {
  LoginPayload,
  SignUpPayload,
  SignUpTypes,
  UserTypes,
} from "../authTypes";

const { LOGIN, SIGNUP } = APIEndpoint;

export const authApi = baseQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.query<{ result: UserTypes }, LoginPayload>({
      query: (payload) => ({
        url: LOGIN,
        method: "POST",
        body: payload,
      }),
    }),
    signUp: builder.query<SignUpTypes, SignUpPayload>({
      query: (payload) => ({
        url: SIGNUP,
        method: "POST",
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazySignInQuery, useLazySignUpQuery } = authApi;
