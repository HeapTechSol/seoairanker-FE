export type UserTypes = {
  firstName: string;
  lastName: string;
  email: string;
  access_token: string;
};

export type SignUpTypes = {
  message:string
}

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignUpPayload = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};
