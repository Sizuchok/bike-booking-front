import { Id } from '../../common/types/Id.type'

export type Bike = Id & {
  name: string
  type: string
  color: string
  status: BikeAvailability
}
export type BikeAvailability = 'available' | 'unavailable' | 'busy'
