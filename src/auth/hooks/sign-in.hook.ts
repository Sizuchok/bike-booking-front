import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { API } from '../../common/const/api-keys.const'
import { QUERY } from '../../common/const/query-keys.const'
import { http } from '../../services'
import { SignIn, SignInResponse } from '../types/auth.types'

export const useSignIn = () => {
  return useMutation({
    mutationKey: [QUERY.AUTH.SIGN_IN],
    mutationFn: async (data: SignIn) =>
      http.auth.post<SignInResponse>(API.AUTH.SIGN_IN, {
        data,
      }),
    onError: error => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message ?? error.message)
      }
    },
    onSuccess: data => {
      toast.success(`Welcome, ${data.user.name}`)
    },
  })
}
