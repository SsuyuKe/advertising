import { generatePath } from '@/utils/url'

export const postAPI = {
  POST_LIST: '/api/Post/List',
  POST: (PostId: number) => generatePath('/api/Post/Post/:PostId', { PostId }),
  POST_REMOVE: '/api/Post/Remove'
}
