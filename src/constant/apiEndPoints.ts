export const AUTH = {
  AUTH: 'auth/',
  LOGIN: 'login',
  SIGNUP: 'register',
  GOOGLE_AUTH: 'social-auth',
  NOTIFICATION_LISTING: 'notifications',
}

export const USERS = {
  USER: 'users/',
}

export const SITES = {
  SITES: 'websites/',
  ADD_SITE: 'add_site',
  DELETE_SITE: 'delete',
  GET_SCRIPT: 'get_script',
  SITES_LIST: 'user_sites',
  GET_KEYWORDS: 'get_keywords',
  USER_QUOTA: 'get_user_quota',
  RE_CRAWL_PAGE: 're_crawl_page',
  RE_CRAWL_SITE: 're_crawl_site',
  GET_SITE_LINKS: 'links_by_site',
  SITE_CRAWLING_INFO: 'get_site_data',
  SITE_PAGE_INSIGHTS: 'get_page_insights',
  LINKS_PATH_SEARCH_RESULTS: 'search_links',
  GET_RECOMMENDATIONS_BY_TYPE: 'data_by_type',
  UPDATE_RECOMMENDATION: 'update-recommendation',
  SAVE_SELECTED_KEYWORDS: 'save_selected_keywords',
  APPROVE_RECOMMENDATIONS: 'approve_recommendations',
  EXPORT_RECOMMENDATIONS_TO_CSV: 'export_approved_items_to_csv',
}

export const BILLING = {
  STRIPE: 'stripe/',
  GET_ALL_PLANS: 'all',
  CHECKOUT: 'create-subscription',
  BILLING_HISTORY: 'get-payment-history',
  CANCEL_SUBSCRIPTION: 'cancel_subscription',
  STRIPE_PAYMENT_INTENT: 'create-payment-intent',
}

export const APIEndpoint = {
  CHECKOUT: `${BILLING.STRIPE}${BILLING.CHECKOUT}`,
  GET_ALL_PLANS: `${BILLING.STRIPE}${BILLING.GET_ALL_PLANS}`,
  BILLING_HISTORY: `${BILLING.STRIPE}${BILLING.BILLING_HISTORY}`,
  CANCEL_SUBSCRIPTION: `${BILLING.STRIPE}${BILLING.CANCEL_SUBSCRIPTION}`,
  STRIPE_PAYMENT_INTENT: `${BILLING.STRIPE}${BILLING.STRIPE_PAYMENT_INTENT}`,

  LOGIN: `${AUTH.AUTH}${AUTH.LOGIN}`,
  SIGNUP: `${AUTH.AUTH}${AUTH.SIGNUP}`,
  GOOGLE_AUTH: `${AUTH.AUTH}${AUTH.GOOGLE_AUTH}`,
  NOTIFICATION_LISTING: `${AUTH.AUTH}${AUTH.NOTIFICATION_LISTING}`,

  ADD_SITE: `${SITES.SITES}${SITES.ADD_SITE}`,
  GET_SCRIPT: `${SITES.SITES}${SITES.GET_SCRIPT}`,
  SITES_LIST: `${SITES.SITES}${SITES.SITES_LIST}`,
  USER_QUOTA: `${SITES.SITES}${SITES.USER_QUOTA}`,
  DELETE_SITE: `${SITES.SITES}${SITES.DELETE_SITE}`,
  GET_KEYWORDS: `${SITES.SITES}${SITES.GET_KEYWORDS}`,
  RE_CRAWL_SITE: `${SITES.SITES}${SITES.RE_CRAWL_SITE}`,
  RE_CRAWL_PAGE: `${SITES.SITES}${SITES.RE_CRAWL_PAGE}`,
  GET_SITE_LINKS: `${SITES.SITES}${SITES.GET_SITE_LINKS}`,
  SITE_PAGE_INSIGHTS: `${SITES.SITES}${SITES.SITE_PAGE_INSIGHTS}`,
  SITE_CRAWLING_INFO: `${SITES.SITES}${SITES.SITE_CRAWLING_INFO}`,
  UPDATE_RECOMMENDATION: `${SITES.SITES}${SITES.UPDATE_RECOMMENDATION}`,
  SAVE_SELECTED_KEYWORDS: `${SITES.SITES}${SITES.SAVE_SELECTED_KEYWORDS}`,
  APPROVE_RECOMMENDATIONS: `${SITES.SITES}${SITES.APPROVE_RECOMMENDATIONS}`,
  LINKS_PATH_SEARCH_RESULTS: `${SITES.SITES}${SITES.LINKS_PATH_SEARCH_RESULTS}`,
  GET_RECOMMENDATIONS_BY_TYPE: `${SITES.SITES}${SITES.GET_RECOMMENDATIONS_BY_TYPE}`,
  EXPORT_RECOMMENDATIONS_TO_CSV: `${SITES.SITES}${SITES.EXPORT_RECOMMENDATIONS_TO_CSV}`,
}
