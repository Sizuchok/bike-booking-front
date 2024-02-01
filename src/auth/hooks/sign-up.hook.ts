import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { API } from '../../common/const/api-keys.const'
import { QUERY } from '../../common/const/query-keys.const'
import { http } from '../../services'
import { SignUpToServer } from '../types/auth.types'

export const useSignUp = () => {
  return useMutation({
    mutationKey: [QUERY.AUTH.SIGN_UP],
    mutationFn: async (data: SignUpToServer) => http.auth.post(API.AUTH.SIGN_UP, { data }),
    onError: error => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message ?? error.message)
      }
    },
    onSuccess: (_, variables) => {
      toast.success(`Sign up successull, you can now sign in as ${variables.name}`)
    },
  })
}
