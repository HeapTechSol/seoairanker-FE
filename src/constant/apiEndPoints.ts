export const AUTH = {
  AUTH:'auth/',
  LOGIN: "login",
  SIGNUP:'signup'
};

export const SITES ={
  SITES:'sites/',
  ADD_SITE:"add-site",
  SITES_LIST:"get-sites",
  DELETE_SITE:"delete",
}

export const APIEndpoint = {
  LOGIN:`${AUTH.AUTH}${AUTH.LOGIN}`,
  SIGNUP:`${AUTH.AUTH}${AUTH.SIGNUP}`,
  ADD_SITE:`${SITES.SITES}${SITES.ADD_SITE}`,
  SITES_LIST:`${SITES.SITES}${SITES.SITES_LIST}`,
  DELETE_SITE:`${SITES.SITES}${SITES.DELETE_SITE}`,
}
