import { createBrowserRouter } from "react-router-dom";

import Layout from "@/container/layout/Layout/Layout";
import AuthLayout from "@/container/layout/AuthLayout/AuthLayout";

import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";

import { AUTH, BILLING } from "@/constant/routes";

const {
  LOGIN,
  SIGNUP,
  RESET_PASSWORD,
  VERIFY_OTP,
  CHANGE_PASSWORD,
  FORGET_PASSWORD,
} = AUTH;

const { PLANS, PAYMENT_HISTORY, CHECKOUT } = BILLING;

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const HomePage = await import(
            "../container/dashboard/pages/HomePage"
          );
          return { Component: HomePage.default };
        },
      },
      {
        path: PLANS,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const Pricing = await import(
            "../container/billing/pages/Pricing/Pricing"
          );
          return { Component: Pricing.default };
        },
      },
      {
        path: PAYMENT_HISTORY,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const PaymentHistory = await import(
            "../container/billing/pages/PaymentHistory/PaymentHistory"
          );
          return { Component: PaymentHistory.default };
        },
      },
      {
        path: CHECKOUT,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const Checkout = await import(
            "../container/billing/pages/Checkout/Checkout"
          );
          return { Component: Checkout.default };
        },
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: LOGIN,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const Login = await import("../container/auth/pages/Login/Login");
          return { Component: Login.default };
        },
      },
      {
        path: SIGNUP,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const SignUp = await import("../container/auth/pages/SignUp/SignUp");
          return { Component: SignUp.default };
        },
      },
      {
        path: CHANGE_PASSWORD,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const ForgotPassword = await import(
            "../container/auth/pages/ChangePassword/ChangePassword"
          );
          return { Component: ForgotPassword.default };
        },
      },
      {
        path: RESET_PASSWORD,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const ResetPassword = await import(
            "../container/auth/pages/ResetPassword/ResetPassword"
          );
          return { Component: ResetPassword.default };
        },
      },
      {
        path: FORGET_PASSWORD,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const ForgetPassword = await import(
            "../container/auth/pages/ForgetPassword/ForgetPassword"
          );
          return { Component: ForgetPassword.default };
        },
      },
      {
        path: VERIFY_OTP,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const VerifyOTP = await import(
            "../container/auth/pages/VerifyOTP/VerifyOTP"
          );
          return { Component: VerifyOTP.default };
        },
      },
    ],
  },
  {
    path: "*",
    async lazy() {
      const Page404 = await import("../container/layout/pages/Page404/Page404");
      return { Component: Page404.default };
    },
  },
]);
