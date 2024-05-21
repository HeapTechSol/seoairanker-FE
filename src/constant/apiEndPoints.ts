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
}

export const BILLING ={
  CHECKOUT:'/payment/request',
}

export const APIEndpoint = {
  LOGIN:`${AUTH.AUTH}${AUTH.LOGIN}`,
  SIGNUP:`${AUTH.AUTH}${AUTH.SIGNUP}`,
  ADD_SITE:`${SITES.SITES}${SITES.ADD_SITE}`,
  SITES_LIST:`${SITES.SITES}${SITES.SITES_LIST}`,
  DELETE_SITE:`${SITES.SITES}${SITES.DELETE_SITE}`,
  BILLING:`${BILLING.CHECKOUT}`,
}
