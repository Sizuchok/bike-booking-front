import axios, { InternalAxiosRequestConfig, isAxiosError } from 'axios'
import { useAuthStore } from '../../auth/store/auth-store'
import { SignInResponse } from '../../auth/types/auth.types'
import { API } from '../../common/const/api-keys.const'

export const apiClient = axios.create({
  baseURL: 'http://localhost:3121',
  withCredentials: true,
})

apiClient.interceptors.request.use(config => {
  const token = useAuthStore.getState().accessToken

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// apiClient.interceptors.request.use(config =>
//   new Promise(resolve => setTimeout(resolve, 2000)).then(() => config),
// )

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const initialRequestConfig = error.config as InternalAxiosRequestConfig & { isRetried: boolean }
    const refetchUrl = `/${API.AUTH.INDEX}/${API.AUTH.REFRESH}`

    if (
      isAxiosError(error) &&
      error.response?.status === 401 &&
      !initialRequestConfig.isRetried &&
      initialRequestConfig.url !== refetchUrl
    ) {
      initialRequestConfig.isRetried = true
      try {
        const response = await apiClient.get<SignInResponse>(refetchUrl)

        useAuthStore.setState({ ...response.data })

        return apiClient(initialRequestConfig)
      } catch (error) {
        useAuthStore.setState({ user: undefined, accessToken: undefined })

        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  },
)
