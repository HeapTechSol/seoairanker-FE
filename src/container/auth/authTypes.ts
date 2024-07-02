export type UserTypes = {
  access_token: string
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
    profileImage: string
  }
  isActiveSubscription: boolean
}

export type SignUpTypes = {
  message: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type SignUpPayload = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type GoogleLoginPayload = {
  email: string
  firstName: string
  lastName: string
  profileImage: string
}

export type GoogleUserInfo = {
  email: string
  given_name: string
  family_name: string
  picture: string
  [key: string]: string | number | boolean
}
