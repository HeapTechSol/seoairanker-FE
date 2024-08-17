export const AUTH = {
  BASE: '/auth',
  LOGIN: 'login',
  SIGNUP: 'signup',
  PROFILE_PAGE: 'profile',
  VERIFY_OTP: 'verify_otp',
  UNAUTHORIZED: 'unauthorized',
  RESET_PASSWORD: 'reset_password',
  CHANGE_PASSWORD: 'change_password',
  FORGET_PASSWORD: 'forget_password',
  PERMISSION_DENIED: 'permission_denied',
}

export const BILLING = {
  BASE: '/billing',
  PLANS: 'plans',
  CHECKOUT: 'checkout',
  BILLING_DETAIL: 'billing-detail',
  PAYMENT_HISTORY: 'payment-history',
  UPCOMING_INVOICES: 'upcoming-invoices',
}

export const SITES = {
  BASE: '/sites',
  ADD_SITE: 'add-site',
  SITES_PAGES: 'pages',
  SITES_LIST: 'all-sites',
  SITE_SCHEMA_PAGE: 'schema',
  SITE_SETTING_PAGE: 'setting',
  SITES_DASHBOARD: 'dashboard',
  SITE_INSIGHTS: 'site-insights',
  SITE_DETAILS_PAGE: 'site-detail',
  SCRIPT_SECTION: 'script-section',
  SITE_ACCESS_KEYS: 'access-tokens',
  RECOMMENDATIONS: 'recommendations',
  KEYWORDS_RANKING: 'keywords-ranking',
  ADD_SITES_NEW_KEYWORDS: 'add-new-keywords',
}

export const EXACT_ROUTES = {
  LOGIN: `${AUTH.BASE}/${AUTH.LOGIN}`,
  PROFILE_PAGE: `/${AUTH.PROFILE_PAGE}`,
  SIGNUP: `${AUTH.BASE}/${AUTH.SIGNUP}`,
  VERIFY_OTP: `${AUTH.BASE}/${AUTH.VERIFY_OTP}`,
  UNAUTHORIZED: `${AUTH.BASE}/${AUTH.UNAUTHORIZED}`,
  RESET_PASSWORD: `${AUTH.BASE}/${AUTH.RESET_PASSWORD}`,
  PERMISSION_DENIED: `${AUTH.BASE}/${AUTH.PERMISSION_DENIED}`,
  CHANGE_PASSWORD: `${AUTH.BASE}/${AUTH.CHANGE_PASSWORD}`,
  FORGET_PASSWORD: `${AUTH.BASE}/${AUTH.FORGET_PASSWORD}`,

  PLANS: `${BILLING.BASE}/${BILLING.PLANS}`,
  CHECKOUT: `${BILLING.BASE}/${BILLING.CHECKOUT}`,
  BILLING_DETAIL: `${BILLING.BASE}/${BILLING.BILLING_DETAIL}`,
  PAYMENT_HISTORY: `${BILLING.BASE}/${BILLING.PAYMENT_HISTORY}`,
  UPCOMING_INVOICES: `${BILLING.BASE}/${BILLING.UPCOMING_INVOICES}`,

  ADD_SITE: `${SITES.BASE}/${SITES.ADD_SITE}`,
  SITES_LIST: `${SITES.BASE}/${SITES.SITES_LIST}`,
  SITES_PAGES: `${SITES.BASE}/${SITES.SITES_PAGES}`,
  SITE_INSIGHTS: `${SITES.BASE}/${SITES.SITE_INSIGHTS}`,
  SCRIPT_SECTION: `${SITES.BASE}/${SITES.SCRIPT_SECTION}`,
  RECOMMENDATIONS: `${SITES.BASE}/${SITES.RECOMMENDATIONS}`,
  SITES_DASHBOARD: `${SITES.BASE}/${SITES.SITES_DASHBOARD}`,
  KEYWORDS_RANKING: `${SITES.BASE}/${SITES.KEYWORDS_RANKING}`,
  SITE_ACCESS_KEYS: `${SITES.BASE}/${SITES.SITE_ACCESS_KEYS}`,
  SITE_DETAILS_PAGE: `${SITES.BASE}/${SITES.SITE_DETAILS_PAGE}`,
  ADD_SITES_NEW_KEYWORDS: `${SITES.BASE}/${SITES.ADD_SITES_NEW_KEYWORDS}`,
}
