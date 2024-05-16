export type SignupPayloadTypes = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginPayloadTypes = {
  email: string;
  password: string;
};

export type ResetPasswordPayloadTypes = {
  password: string;
  confirmPassword: string;
};

export type ChangePasswordPayloadTypes = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

export type VerifyOTPPayloadTypes = {
  p1: string;
  p2: string;
  p3: string;
  p4: string;
};

export type ForgetPasswordPayloadTypes = {
  email: string;
};
