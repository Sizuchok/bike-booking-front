import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { QUERY } from '../../common/const/query-keys.const'
import { http } from '../../services'
import { Bike, CreateBike } from '../types/bike.types'

export const useCreateBike = () => {
  return useMutation({
    mutationKey: [QUERY.BIKES.CREATE_ONE],
    mutationFn: async (data: CreateBike) => http.bikes.post<Bike>('', { data }),
    onError: error => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message ?? error.message)
      }
    },
    onSuccess: data => {
      toast.success(`Added: ${data.name}`)
    },
  })
}
