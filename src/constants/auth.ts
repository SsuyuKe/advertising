import { generatePath } from '@/utils/url'

export const authAPI = {
  login: '/auth/login',
  register: '/auth/register'
}

export const userAPI = {
  getUser: (id: string) => generatePath('/users/:id', { id }),
  updateUser: (id: string) => generatePath('/users/:id', { id })
}
