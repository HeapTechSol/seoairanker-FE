import { Navigate, createBrowserRouter } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute'
import Layout from '@/container/layout/Layout/Layout'
import AuthLayout from '@/container/layout/AuthLayout/AuthLayout'

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary'

import { AUTH, BILLING, EXACT_ROUTES, SITES } from '@/constant/routes'

const { LOGIN, SIGNUP, RESET_PASSWORD, VERIFY_OTP, CHANGE_PASSWORD, FORGET_PASSWORD, BASE: AUTH_BASE } = AUTH

const { PLANS, BILLING_DETAIL, PAYMENT_HISTORY, UPCOMING_INVOICES, CHECKOUT, BASE: BILLING_BASE } = BILLING

const {
  ADD_SITE,
  SITES_PAGES,
  SITE_INSIGHTS,
  SCRIPT_SECTION,
  RECOMMENDATIONS,
  SITES_DASHBOARD,
  SITE_ACCESS_KEYS,
  KEYWORDS_RANKING,
  SITE_DETAILS_PAGE,
  ADD_SITES_NEW_KEYWORDS,
  BASE: SITES_BASE,
} = SITES

const { SITES_DASHBOARD: DASHBOARD } = EXACT_ROUTES

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={DASHBOARD} replace />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: BILLING_BASE,
    element: <Layout />,
    children: [
      {
        path: PLANS,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const { default: Pricing } = await import('../container/billing/pages/Pricing/Pricing')
          return {
            Component: (props) => <Pricing {...props} />,
          }
        },
      },
      {
        path: CHECKOUT,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const { default: Checkout } = await import('../container/billing/pages/Checkout/Checkout')
          return {
            Component: (props) => (
              <ProtectedRoute>
                <Checkout {...props} />
              </ProtectedRoute>
            ),
          }
        },
      },
      {
        path: PAYMENT_HISTORY,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const { default: PaymentHistory } = await import('../container/billing/pages/PaymentHistory/PaymentHistory')
          return {
            Component: (props) => (
              <ProtectedRoute>
                <PaymentHistory {...props} />
              </ProtectedRoute>
            ),
          }
        },
      },
      {
        path: BILLING_DETAIL,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const { default: BillingDetail } = await import('../container/billing/pages/BillingDetail/BillingDetail')
          return {
            Component: (props) => (
              <ProtectedRoute>
                <BillingDetail {...props} />
              </ProtectedRoute>
            ),
          }
        },
      },
      {
        path: UPCOMING_INVOICES,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const { default: UpComingInvoices } = await import('../container/billing/pages/UpComingInvoices/UpComingInvoices')
          return {
            Component: (props) => (
              <ProtectedRoute>
                <UpComingInvoices {...props} />
              </ProtectedRoute>
            ),
          }
        },
      },
    ],
  },
  {
    path: SITES_BASE,
    element: <Layout />,
    children: [
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
        path: KEYWORDS_RANKING,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const { default: KeywordsRankingDetail } = await import('../container/sites/pages/KeywordsRankingDetail/KeywordsRankingDetail')
          return {
            Component: (props) => (
              <ProtectedRoute>
                <KeywordsRankingDetail {...props} />
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
        path: `${SITE_DETAILS_PAGE}/:id`,
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
          const { default: AddNewKeywords } = await import('../container/sites/pages/AddNewKeywords/AddNewKeywords')
          return {
            Component: (props) => (
              <ProtectedRoute>
                <AddNewKeywords {...props} />
              </ProtectedRoute>
            ),
          }
        },
      },
      {
        path: SITES_PAGES,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const { default: SitePages } = await import('../container/sites/pages/SitePages/SitePages')
          return {
            Component: (props) => (
              <ProtectedRoute>
                <SitePages {...props} />
              </ProtectedRoute>
            ),
          }
        },
      },
      {
        path: SITE_ACCESS_KEYS,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const { default: APIKeys } = await import('../container/sites/pages/APIKeys/APIKeys')
          return {
            Component: (props) => (
              <ProtectedRoute>
                <APIKeys {...props} />
              </ProtectedRoute>
            ),
          }
        },
      },
      {
        path: SCRIPT_SECTION,
        errorElement: <ErrorBoundary />,
        async lazy() {
          const { default: ScriptPage } = await import('../container/sites/pages/ScriptPage/ScriptPage')
          return {
            Component: (props) => (
              <ProtectedRoute>
                <ScriptPage {...props} />
              </ProtectedRoute>
            ),
          }
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
