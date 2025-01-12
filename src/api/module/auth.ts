import server from '@/api'
import { authAPI } from '@/constants/auth'
import { LoginData, LoginResponse } from '@/types/api/auth'

// Auth 請求
export const login = async (loginData: LoginData): Promise<LoginResponse> => {
  try {
    const { data } = await server.post<LoginResponse>(authAPI.LOGIN, loginData)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// User 請求
// export const getUser = async (id: string): Promise<UserResponse> => {
//   const { data } = await server.get<UserResponse>(userAPI.getUser(id))
//   return data
// }
