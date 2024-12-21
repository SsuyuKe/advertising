export interface AuthData {
  account: string
  password: string
}
export interface LoginResponse {
  token: string
  user: {
    id: string
    name: string
  }
}
export interface UserResponse {
  id: string
  name: string
  email: string
}
