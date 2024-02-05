import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { API } from '../../common/const/api-keys.const'
import { QUERY } from '../../common/const/query-keys.const'
import { http } from '../../services'
import { useAuthStore } from '../store/auth-store'

export const useSignOut = () => {
  return useMutation({
    mutationKey: [QUERY.AUTH.SIGN_OUT],
    mutationFn: async () => http.auth.post(API.AUTH.SIGN_OUT, {}),
    onError: error => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message ?? error.message)
      }
    },
    onSuccess: () => {
      const name = useAuthStore.getState().user?.name
      toast.success(`See you later, ${name}!`)
      useAuthStore.setState({ accessToken: undefined, user: undefined })
    },
  })
}
