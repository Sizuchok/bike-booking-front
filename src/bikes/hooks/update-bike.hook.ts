import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { QUERY } from '../../common/const/query-keys.const'
import { http } from '../../services'
import { Bike, UpdateBike } from '../types/bike.types'

export const useUpdateBike = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [QUERY.BIKES.UPDATE_ONE, id],
    mutationFn: async (data: UpdateBike) => http.bikes.patch<Bike>(id, { data }),
    onMutate: async updatedBike => {
      await queryClient.cancelQueries({ queryKey: [QUERY.BIKES.GET_ALL] })

      const previousBikes = queryClient.getQueryData([QUERY.BIKES.GET_ALL])

      queryClient.setQueryData([QUERY.BIKES.GET_ALL], (old: Bike[]) => {
        return old.map(bike => (bike._id === id ? { ...bike, ...updatedBike } : bike))
      })

      return { previousBikes }
    },
    onError: (error, _, context) => {
      queryClient.setQueryData([QUERY.BIKES.GET_ALL], context?.previousBikes)

      if (isAxiosError(error)) {
        toast.error(error.response?.data.message ?? error.message)
      }
    },
    onSuccess: data => {
      toast.success(`Updated: ${data.name}`)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY.BIKES.GET_ALL] })
    },
  })
}
