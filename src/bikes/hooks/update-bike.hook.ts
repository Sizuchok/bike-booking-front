import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { QUERY } from '../../common/const/query-keys.const'
import { http } from '../../services'
import { AllBikes, Bike, UpdateBike } from '../types/bike.types'
import { allBikesQo } from './all-bikes.hook'

export const useUpdateBike = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [QUERY.BIKES.UPDATE_ONE, id],
    mutationFn: async (data: UpdateBike) => http.bikes.patch<Bike>(id, { data }),
    onMutate: async updatedBike => {
      await queryClient.cancelQueries({ queryKey: allBikesQo().queryKey })

      const previousBikes = queryClient.getQueryData<AllBikes>(allBikesQo().queryKey)

      queryClient.setQueryData(allBikesQo().queryKey, old => {
        if (!old) return old

        return {
          ...old,
          bikes: old.bikes.map(bike => (bike._id === id ? { ...bike, ...updatedBike } : bike)),
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
    onSuccess: data => {
      toast.success(`Updated: ${data.name}`)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: allBikesQo().queryKey })
    },
  })
}
