import { RoleType } from "@/global";

export type RegisterUserType = {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  userName: string
  isMale: boolean
  role: string

}

export type LoginUserType = {
  username: string,
  password: string,
}