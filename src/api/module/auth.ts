// import server from '@/api'
// import { authAPI } from '@/constants/auth'
// import { LoginData, LoginResponse } from '@/types/api/auth'

// Auth 請求
// export const login = async (loginData: LoginData): Promise<LoginResponse> => {
//   try {
//     const data = await server
//       .post<LoginResponse>(authAPI.LOGIN, loginData)
//       .then((response) => {
//         console.log(response.data) // 确保可以打印出响应
//       })
//     return data
//   } catch (err) {
//     console.error(err)
//   }
// }

// User 請求
// export const getUser = async (id: string): Promise<UserResponse> => {
//   const { data } = await server.get<UserResponse>(userAPI.getUser(id))
//   return data
// }
