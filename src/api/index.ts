import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const server = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
})

server.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

server.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)

export default server
