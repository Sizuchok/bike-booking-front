import axios from 'axios'
import { useAuthStore } from '../../auth/store/auth-store'

export const apiClient = axios.create({
  baseURL: 'http://localhost:3121',
  withCredentials: true,
})

apiClient.interceptors.request.use(
  config => {
    const token = useAuthStore.getState().accessToken

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return Promise.resolve(config)
  },
  error => Promise.reject(error),
)

// apiClient.interceptors.request.use(config =>
//   new Promise(resolve => setTimeout(resolve, 2000)).then(() => config),
// )

// apiClient.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config
//     if (
//       isAxiosError(error) &&
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       originalRequest.url !== `/${API.AUTH.INDEX}/${API.AUTH.REFRESH}`
//     ) {
//       originalRequest._retry = true
//       try {
//         const response = await apiClient.get<SignInResponse>(
//           `/${API.AUTH.INDEX}/${API.AUTH.REFRESH}`,
//           {
//             withCredentials: true,
//           },
//         )

//         useAuthStore.setState({
//           ...response.data,
//         })

//         return apiClient(originalRequest)
//       } catch (error) {
//         return Promise.reject(error)
//       }
//     }
//     return Promise.reject(error)
//   },
// )
