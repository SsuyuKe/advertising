export interface LoginData {
  loginId: string
  password: string
}
export interface LoginResponse {
  accountId: number
  mobile: string
  email: string
  password: string
  name: string
  companyId: string
  companyName: string
  mobileVerified: string
  emailVerified: string
  accessToken: string
  refreshToken: string | null
  status: string
  registerDate: string | null
  loginDate: string
  roleCodeList: string
  functionIdList: string | null
  message?: string
}
export interface UserResponse {
  id: string
  name: string
  email: string
}
