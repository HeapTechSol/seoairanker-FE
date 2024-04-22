export const AUTH = {
  LOGIN: "login",
  SIGNUP: "signup",
  PERMISSION_DENIED: "permission_denied",
  UNAUTHORIZED: "unauthorized",
  RESET_PASSWORD: "reset_password",
  VERIFY_OTP: "verify_otp",
  CHANGE_PASSWORD: "change_password",
  FORGET_PASSWORD: "forget_password",
};

export const BILLING = {
  PLANS: "plans",
  CHECKOUT: "checkout",
  PAYMENT_HISTORY: "payment-history",
  BILLING_DETAIL: "billing-detail",
};

export const SITES = {
  RECOMMENDATIONS: "recommendations",
  ADD_SITE: "add-site",
};

export const EXACT_ROUTES = {
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  PERMISSION_DENIED: "/permission_denied",
  UNAUTHORIZED: "/unauthorized",
  RESET_PASSWORD: "/auth/reset_password",
  VERIFY_OTP: "/auth/verify_otp",
  CHANGE_PASSWORD: "/auth/change_password",
  FORGET_PASSWORD: "/auth/forget_password",
  BILLING_PLANS: "/plans",
  PAYMENT_HISTORY: "/payment-history",
  CHECKOUT: "/checkout",
  BILLING_DETAIL: "/billing-detail",
  RECOMMENDATIONS: `/${SITES.RECOMMENDATIONS}`,
  ADD_SITE: `/${SITES.ADD_SITE}`,
};
