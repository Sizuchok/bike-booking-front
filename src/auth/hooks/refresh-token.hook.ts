import { useQuery } from '@tanstack/react-query'
import { API } from '../../common/const/api-keys.const'
import { QUERY } from '../../common/const/query-keys.const'
import { http } from '../../services'
import { SignInResponse } from '../types/auth.types'

export const useRefreshToken = () => {
  return useQuery({
    queryKey: [QUERY.AUTH.REFRESH],
    queryFn: async () => http.auth.get<SignInResponse>(`${API.AUTH.REFRESH}`),
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
}
