export type UserTypes = {
  access_token: string;
  user: {
    id:string
    firstName: string;
    lastName: string;
    email: string;
  };
  isActiveSubscription:boolean
};

export type SignUpTypes = {
  message: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignUpPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
