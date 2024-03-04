export const COOCKIES_EXPIRATION_TIME = new Date(
  Date.now() + 7 * 24 * 60 * 60 * 1000
);
export const COOKIES_SECRET_KEY = "overcomeX";

export const EMAIL_DELIVERY_CONFIRMATION = (email: string) =>
  `We have sent an OTP to your email ${
    email || ""
  }, Please verify your account to proceed`;
