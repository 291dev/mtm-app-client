import { HttpException } from "./error"

export type UserInfo = {
  userId: string,
  email: string,
  tel: string,
  firstname: string
}

export type UserRegisterReq = {
  firstName: string,
  lastName?: string,
  password: string,
  email: string,
  telephoneNumber?: string,
  dateOfBirth?: Date
}

export type Credentials = {
  accessToken: string,
  idToken: string,
  refleshToken: string
}

export type UserInfoStore = {
  info: UserInfo,
  credentials: Credentials,
  isLoading: boolean,
  error?: HttpException
}

export type LoginReq = {
  email: string,
  password: string
}