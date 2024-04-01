import { createBrowserRouter } from "react-router-dom";

import Layout from "@/container/layout/Layout/Layout";
import TestPage from "@/container/dashboard/pages/TestPage";
import AuthLayout from "@/container/layout/AuthLayout/AuthLayout";

import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";

import { AUTH, LEAVE } from "@/constant/routes";

const {
  LOGIN,
  SIGNUP,
  RESET_PASSWORD,
  VERIFY_OTP,
  CHANGE_PASSWORD,
  FORGET_PASSWORD,
} = AUTH;

const { LEAVE_BALANCE, APPLY_LEAVE, LEAVE_DETAILS, PENDING_LEAVES } = LEAVE;

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        errorElement: <ErrorBoundary />,
        element: <TestPage />,
      },
      {
        path: LEAVE_BALANCE,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const LeaveBalance = await import(
            "../container/leaves/pages/LeaveBalance/LeaveBalance"
          );
          return { Component: LeaveBalance.default };
        },
      },
      {
        path: APPLY_LEAVE,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const ApplyForLeave = await import(
            "../container/leaves/pages/ApplyForLeave/ApplyForLeave"
          );
          return { Component: ApplyForLeave.default };
        },
      },
      {
        path: LEAVE_DETAILS,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const LeaveDetails = await import(
            "../container/leaves/pages/LeaveDetails/LeaveDetails"
          );
          return { Component: LeaveDetails.default };
        },
      },
      {
        path: PENDING_LEAVES,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const PendingLeaves = await import(
            "../container/leaves/pages/PendingLeaves/PendingLeaves"
          );
          return { Component: PendingLeaves.default };
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
          const Signup = await import("../container/auth/pages/SignUp/SignUp");
          return { Component: Signup.default };
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
