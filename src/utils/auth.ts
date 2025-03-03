import { setItem, getItem, removeItem } from './localStorage'

const USER = 'user'
const TOKEN = 'token'

export const getToken = () => {
  const user = getItem(USER)
  if (user) {
    const token = user.state.token
    return token || ''
  }
}

export const setToken = (token: string) => {
  if (token) {
    setItem(TOKEN, token)
  }
}

export const removeToken = () => {
  removeItem(TOKEN)
}
