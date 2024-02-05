import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QUERY } from '../../common/const/query-keys.const'
import { http } from '../../services'

export const useAllBikes = () => {
  return useQuery({
    queryKey: [QUERY.BIKES.GET_ALL],
    queryFn: async () => http.bikes.getAll(),
    placeholderData: keepPreviousData,
  })
}
