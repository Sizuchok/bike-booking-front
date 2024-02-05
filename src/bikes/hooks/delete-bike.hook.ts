import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { QUERY } from '../../common/const/query-keys.const'
import { http } from '../../services'
import { Bike } from '../types/bike.types'

export const useDeleteBike = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QUERY.BIKES.DELETE_ONE, id],
    mutationFn: async () => http.bikes.delete<void>(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [QUERY.BIKES.GET_ALL] })

      const previousBikes = queryClient.getQueryData([QUERY.BIKES.GET_ALL])

      queryClient.setQueryData([QUERY.BIKES.GET_ALL], (old: Bike[]) => {
        return old.filter(bike => bike._id !== id)
      })

      return { previousBikes }
    },
    onError: (error, _, context) => {
      queryClient.setQueryData([QUERY.BIKES.GET_ALL], context?.previousBikes)

      if (isAxiosError(error)) {
        toast.error(error.response?.data.message ?? error.message)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY.BIKES.GET_ALL] })
    },
  })
}
