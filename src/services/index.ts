import { User } from '../auth/types/user.types'
import { Bike } from '../bikes/types/bike.types'
import { API } from '../common/const/api-keys.const'
import { HttpService } from './http.service'

const auth = new HttpService<User>(API.AUTH.INDEX)
const bikes = new HttpService<Bike>(API.BIKES.INDEX)

export const http = {
  auth,
  bikes,
} as const
