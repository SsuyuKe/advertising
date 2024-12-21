import server from '@/api'
import { authAPI, userAPI } from '@/constants/auth'
import { AuthData, LoginResponse, UserResponse } from '@/types/api/auth'

// Auth 請求
export const login = async (loginData: AuthData): Promise<LoginResponse> => {
  const { data } = await server.post<LoginResponse>(authAPI.login, loginData)
  return data
}

// User 請求
export const getUser = async (id: string): Promise<UserResponse> => {
  const { data } = await server.get<UserResponse>(userAPI.getUser(id))
  return data
}
