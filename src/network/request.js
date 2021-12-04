import axios from 'axios'
import store from '@/store'
import config from '@/config'

const service = axios.create({
  baseURL: config.baseURL,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    // 添加请求头
    config.headers.Authorization = `Bearer ${store.getters.token}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (
      (response.status >= 200 && response.status <= 300) ||
      response.status === 304
    ) {
      // 登录请求返回的错误
      if (response.data.code === -1) {
        return Promise.reject(response.data)
      }
      return response.data
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
