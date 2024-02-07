import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'
import { QUERY } from '../../common/const/query-keys.const'
import { http } from '../../services'
import { AllBikes } from '../types/bike.types'

export const allBikesQo = () => {
  return queryOptions({
    queryKey: [QUERY.BIKES.GET_ALL],
    queryFn: async () => http.bikes.getAll<AllBikes>(),
    placeholderData: keepPreviousData,
  })
}

export const useAllBikes = () => {
  return useQuery(allBikesQo())
}
