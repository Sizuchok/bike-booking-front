import { AxiosRequestConfig } from 'axios'
import { apiClient } from './util/api-client'

export class HttpService<TResponse = unknown> {
  constructor(private endpoint: string) {
    this.endpoint = endpoint
  }

  async getAll(config?: AxiosRequestConfig<never>) {
    const response = await apiClient.get<TResponse[]>(this.endpoint, config)
    return response.data
  }

  async get<OwnResponse = TResponse>(params: string | number, config?: AxiosRequestConfig<never>) {
    const response = await apiClient.get<OwnResponse>(`${this.endpoint}/${params}`, config)
    return response.data
  }

  async post<OwnResponse = unknown>(param: string, config: AxiosRequestConfig) {
    const response = await apiClient.post<OwnResponse>(
      `${this.endpoint}/${param}`,
      config.data,
      config,
    )
    return response.data
  }
}
