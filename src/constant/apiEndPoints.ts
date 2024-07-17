export const AUTH = {
  AUTH:'auth/',
  LOGIN: "login",
  SIGNUP:'signup',
  GOOGLE_AUTH:'social-auth'
};

export const SITES ={
  SITES:'sites/',
  ADD_SITE:"add_site",
  DELETE_SITE:"delete",
  SITES_LIST:"user_sites",
  USER_QUOTA:'get_user_quota',
  RE_CRAWL_SITE:"re_crawl_site",
  GET_SITE_LINKS:"links_by_site",
  SITE_CRAWLING_INFO:"get_site_data",
  GET_KEYWORDS:"get_keyword_suggestions",
  SITE_PAGE_INSIGHTS:"get_page_insights",
  GET_RECOMMENDATIONS_BY_TYPE:"data_by_type",
  UPDATE_RECOMMENDATION:"update-recommendation",
  SAVE_SELECTED_KEYWORDS:"save_selected_keywords",
  APPROVE_RECOMMENDATIONS:"approve_recommendations",
}

export const BILLING ={
  STRIPE:'/stripe',
  CHECKOUT:'/create-subscription',
  BILLING_HISTORY:'/get-payment-history',
  CANCEL_SUBSCRIPTION:'/cancel_subscription',
  STRIPE_PAYMENT_INTENT:'/create-payment-intent',
}

export const APIEndpoint = {
  CHECKOUT:`${BILLING.STRIPE}${BILLING.CHECKOUT}`,
  BILLING_HISTORY:`${BILLING.STRIPE}${BILLING.BILLING_HISTORY}`,
  CANCEL_SUBSCRIPTION:`${BILLING.STRIPE}${BILLING.CANCEL_SUBSCRIPTION}`,
  STRIPE_PAYMENT_INTENT:`${BILLING.STRIPE}${BILLING.STRIPE_PAYMENT_INTENT}`,
  
  LOGIN:`${AUTH.AUTH}${AUTH.LOGIN}`,
  SIGNUP:`${AUTH.AUTH}${AUTH.SIGNUP}`,
  GOOGLE_AUTH:`${AUTH.AUTH}${AUTH.GOOGLE_AUTH}`,
  
  ADD_SITE:`${SITES.SITES}${SITES.ADD_SITE}`,
  SITES_LIST:`${SITES.SITES}${SITES.SITES_LIST}`,
  USER_QUOTA:`${SITES.SITES}${SITES.USER_QUOTA}`,
  DELETE_SITE:`${SITES.SITES}${SITES.DELETE_SITE}`,
  GET_KEYWORDS:`${SITES.SITES}${SITES.GET_KEYWORDS}`,
  RE_CRAWL_SITE:`${SITES.SITES}${SITES.RE_CRAWL_SITE}`,
  GET_SITE_LINKS:`${SITES.SITES}${SITES.GET_SITE_LINKS}`,
  SITE_PAGE_INSIGHTS:`${SITES.SITES}${SITES.SITE_PAGE_INSIGHTS}`,
  SITE_CRAWLING_INFO:`${SITES.SITES}${SITES.SITE_CRAWLING_INFO}`,
  UPDATE_RECOMMENDATION:`${SITES.SITES}${SITES.UPDATE_RECOMMENDATION}`,
  SAVE_SELECTED_KEYWORDS:`${SITES.SITES}${SITES.SAVE_SELECTED_KEYWORDS}`,
  APPROVE_RECOMMENDATIONS:`${SITES.SITES}${SITES.APPROVE_RECOMMENDATIONS}`,
  GET_RECOMMENDATIONS_BY_TYPE:`${SITES.SITES}${SITES.GET_RECOMMENDATIONS_BY_TYPE}`,
}
