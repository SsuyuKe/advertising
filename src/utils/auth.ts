import { setItem, getItem, removeItem } from './localStorage'

const TOKEN = 'TOKEN'

export const getToken = () => {
  const token = getItem(TOKEN)
  return token || ''
}

export const setToken = (token: string) => {
  if (token) {
    setItem(TOKEN, token)
  }
}

export const removeToken = () => {
  removeItem(TOKEN)
}
