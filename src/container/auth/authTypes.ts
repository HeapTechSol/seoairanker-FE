export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  profileImage: string
}

export type UserTypes = {
  user: User
  access_token: string
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

export type UpdateUserProfilePayload = {
  email: string
  first_name: string
  last_name: string
  profile_img: string
}

export type UpdateUserPasswordPayload = {
 new_password:string
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
