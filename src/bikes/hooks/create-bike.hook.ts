import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { QUERY } from '../../common/const/query-keys.const'
import { http } from '../../services'
import { Bike, CreateBike } from '../types/bike.types'
import { allBikesQo } from './all-bikes.hook'

export const useCreateBike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QUERY.BIKES.CREATE_ONE],
    mutationFn: async (data: CreateBike) => http.bikes.post<Bike>('', { data }),
    onSuccess: data => {
      toast.success(`Added: ${data.name}`)
    },
    onMutate: async newBike => {
      await queryClient.cancelQueries({ queryKey: allBikesQo().queryKey })

      const previousBikes = queryClient.getQueryData(allBikesQo().queryKey)

      queryClient.setQueryData(allBikesQo().queryKey, old => {
        if (!old) return old

        return {
          ...old,
          bikes: [...old.bikes, { ...newBike, _id: 'tmp-id' }],
        }
      })

      return { previousBikes }
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(allBikesQo().queryKey, context?.previousBikes)

      if (isAxiosError(error)) {
        toast.error(error.response?.data.message ?? error.message)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: allBikesQo().queryKey })
    },
  })
}
