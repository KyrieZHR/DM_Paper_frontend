import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

request.interceptors.response.use(
  (res) => res.data,
  (error) => {
    console.error('Request failed:', error)
    return Promise.reject(error)
  }
)

export default request
