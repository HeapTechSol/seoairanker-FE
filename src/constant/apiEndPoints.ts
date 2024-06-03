export const AUTH = {
  AUTH:'auth/',
  LOGIN: "login",
  SIGNUP:'signup'
};

export const SITES ={
  SITES:'sites/',
  ADD_SITE:"add",
  SITES_LIST:"list",
  DELETE_SITE:"delete",
  SITE_LINKS_AND_CONTENT:"get_links",
  SITE_PAGE_INSIGHTS:"get_page_insights",
}

export const BILLING ={
  CHECKOUT:'/payment/request',
}

export const APIEndpoint = {
  BILLING:`${BILLING.CHECKOUT}`,
  LOGIN:`${AUTH.AUTH}${AUTH.LOGIN}`,
  SIGNUP:`${AUTH.AUTH}${AUTH.SIGNUP}`,
  ADD_SITE:`${SITES.SITES}${SITES.ADD_SITE}`,
  SITES_LIST:`${SITES.SITES}${SITES.SITES_LIST}`,
  DELETE_SITE:`${SITES.SITES}${SITES.DELETE_SITE}`,
  SITE_PAGE_INSIGHTS:`${SITES.SITES}${SITES.SITE_PAGE_INSIGHTS}`,
  SITE_LINKS_AND_CONTENT:`${SITES.SITES}${SITES.SITE_LINKS_AND_CONTENT}`,
}
