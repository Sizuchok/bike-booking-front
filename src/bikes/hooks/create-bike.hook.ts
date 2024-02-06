import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { QUERY } from '../../common/const/query-keys.const'
import { http } from '../../services'
import { Bike, CreateBike } from '../types/bike.types'

export const useCreateBike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [QUERY.BIKES.CREATE_ONE],
    mutationFn: async (data: CreateBike) => http.bikes.post<Bike>('', { data }),
    onSuccess: data => {
      toast.success(`Added: ${data.name}`)
    },
    onMutate: async newBike => {
      await queryClient.cancelQueries({ queryKey: [QUERY.BIKES.GET_ALL] })

      const previousBikes = queryClient.getQueryData([QUERY.BIKES.GET_ALL])

      queryClient.setQueryData([QUERY.BIKES.GET_ALL], (old: Bike[]) => {
        return [...old, { ...newBike, _id: Math.random() }] as Bike[]
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
