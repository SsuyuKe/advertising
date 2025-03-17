import server from '@/api'
import { postAPI } from '@/constants/post'
import { getToken } from '@/utils/auth'

// export const getPostList = async (): Promise<MaterialItem[]> => {
//   const { data } = await server.get(postAPI.POST_LIST)
//   return data
// }

export const getPost = async (id: number) => {
  const { data } = await server.get(postAPI.POST(id))
  return data
}

export const removePost = async (postId: string) => {
  const accessToken = getToken()
  const { data } = await server.post(postAPI.POST_REMOVE, {
    accessToken,
    postId
  })
  return data
}
