import { createBrowserRouter } from 'react-router-dom'

import Layout from '@/container/layout/Layout/Layout'
import AuthLayout from '@/container/layout/AuthLayout/AuthLayout'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'

import { AUTH, BILLING, SITES } from '@/constant/routes'
import ProtectedRoute from './ProtectedRoute'

const { LOGIN, SIGNUP, RESET_PASSWORD, VERIFY_OTP, CHANGE_PASSWORD, FORGET_PASSWORD, BASE: AUTH_BASE } = AUTH

const { PLANS, BILLING_DETAIL, PAYMENT_HISTORY, UPCOMING_INVOICES, BASE: BILLING_BASE } = BILLING

const {
  ADD_SITE,
  SITES_LIST,
  SITES_PAGES,
  SITE_INSIGHTS,
  RECOMMENDATIONS,
  SITES_DASHBOARD,
  SITE_ACCESS_KEYS,
  SITE_DETAILS_PAGE,
  ADD_SITES_NEW_KEYWORDS,
  BASE: SITES_BASE,
} = SITES

export const routes = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <Layout />,
  //   children: [
  //     {
  //       index: true,
  //       errorElement: <ErrorBoundary />,
  //       async lazy() {
  //         const HomePage = await import('../container/dashboard/pages/HomePage')
  //         return { Component: HomePage.default }
  //       },
  //     },
  //   ],
  // },
  {
    path: '/',
    errorElement: <ErrorBoundary />,
    async lazy() {
      const { default: SitesDashboard } = await import('../container/sites/pages/SitesDashboard/SitesDashboard')
      return {
        Component: (props) => (
          <ProtectedRoute>
            <SitesDashboard {...props} />
          </ProtectedRoute>
        ),
      }
    },
  },
  {
    path: BILLING_BASE,
    element: <Layout />,
    children: [
      {
        path: PLANS,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const Pricing = await import('../container/billing/pages/Pricing/Pricing')
          return { Component: Pricing.default }
        },
      },
      {
        path: PAYMENT_HISTORY,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const PaymentHistory = await import('../container/billing/pages/PaymentHistory/PaymentHistory')
          return { Component: PaymentHistory.default }
        },
      },
      {
        path: BILLING_DETAIL,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const BillingDetails = await import('../container/billing/pages/BillingDetail/BillingDetail')
          return { Component: BillingDetails.default }
        },
      },
      {
        path: UPCOMING_INVOICES,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const UpComingInvoices = await import('../container/billing/pages/UpComingInvoices/UpComingInvoices')
          return { Component: UpComingInvoices.default }
        },
      },
    ],
  },
  {
    path: SITES_BASE,
    element: <Layout />,
    children: [
      {
        path: SITES_LIST,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const { default: SitesList } = await import('../container/sites/pages/AllSites/AllSites')
          return {
            Component: (props) => (
              <ProtectedRoute>
                <SitesList {...props} />
              </ProtectedRoute>
            ),
          }
        },
      },
      {
        path: RECOMMENDATIONS,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const { default: Recommendations } = await import('../container/sites/pages/Recommendations/Recommendations')
          return {
            Component: (props) => (
              <ProtectedRoute>
                <Recommendations {...props} />
              </ProtectedRoute>
            ),
          }
        },
      },
      {
        path: ADD_SITE,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const { default: AddSite } = await import('../container/sites/pages/AddSiteWizard/AddSiteWizard')
          return {
            Component: (props) => (
              <ProtectedRoute>
                <AddSite {...props} />
              </ProtectedRoute>
            ),
          }
        },
      },
      {
        path: SITES_DASHBOARD,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const { default: SitesDashboard } = await import('../container/sites/pages/SitesDashboard/SitesDashboard')
          return {
            Component: (props) => (
              <ProtectedRoute>
                <SitesDashboard {...props} />
              </ProtectedRoute>
            ),
          }
        },
      },
      {
        path: SITE_DETAILS_PAGE,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const { default: SiteDetailsPage } = await import('../container/sites/pages/SiteDetailsPage/SiteDetailsPage')
          return {
            Component: (props) => (
              <ProtectedRoute>
                <SiteDetailsPage {...props} />
              </ProtectedRoute>
            ),
          }
        },
      },
      {
        path: SITE_INSIGHTS,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const { default: SiteInsights } = await import('../container/sites/pages/SiteInsights/SiteInsights')
          return {
            Component: (props) => (
              <ProtectedRoute>
                <SiteInsights {...props} />
              </ProtectedRoute>
            ),
          }
        },
      },
      {
        path: ADD_SITES_NEW_KEYWORDS,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const AddNewKeywords = await import('../container/sites/pages/AddNewKeywords/AddNewKeywords')
          return { Component: AddNewKeywords.default }
        },
      },
      {
        path: SITES_PAGES,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const SitePages = await import('../container/sites/pages/SitePages/SitePages')
          return { Component: SitePages.default }
        },
      },
      {
        path: SITE_ACCESS_KEYS,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const APIKeys = await import('../container/sites/pages/APIKeys/APIKeys')
          return { Component: APIKeys.default }
        },
      },
    ],
  },
  {
    path: AUTH_BASE,
    element: <AuthLayout />,
    children: [
      {
        path: LOGIN,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const Login = await import('../container/auth/pages/Login/Login')
          return { Component: Login.default }
        },
      },
      {
        path: SIGNUP,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const SignUp = await import('../container/auth/pages/SignUp/SignUp')
          return { Component: SignUp.default }
        },
      },
      {
        path: CHANGE_PASSWORD,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const ForgotPassword = await import('../container/auth/pages/ChangePassword/ChangePassword')
          return { Component: ForgotPassword.default }
        },
      },
      {
        path: RESET_PASSWORD,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const ResetPassword = await import('../container/auth/pages/ResetPassword/ResetPassword')
          return { Component: ResetPassword.default }
        },
      },
      {
        path: FORGET_PASSWORD,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const ForgetPassword = await import('../container/auth/pages/ForgetPassword/ForgetPassword')
          return { Component: ForgetPassword.default }
        },
      },
      {
        path: VERIFY_OTP,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const VerifyOTP = await import('../container/auth/pages/VerifyOTP/VerifyOTP')
          return { Component: VerifyOTP.default }
        },
      },
    ],
  },
  {
    path: '*',
    async lazy() {
      const Page404 = await import('../container/layout/pages/Page404/Page404')
      return { Component: Page404.default }
    },
  },
])
