import axios from 'axios'

const server = axios.create({
  baseURL: '/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

server.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

server.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default server
