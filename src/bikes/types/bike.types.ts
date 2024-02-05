import { z } from 'zod'
import { Id } from '../../common/types/Id.type'
import { ValueLabel } from '../../common/types/common.types'
import { createBikeSchema } from '../schemas/create-bike.schema'
import { updateBikeShema } from '../schemas/update-bike.schema'

export type Bike = Id & CreateBike

export type CreateBike = z.infer<typeof createBikeSchema>
export type UpdateBike = z.infer<typeof updateBikeShema>

export type BikeAvailability = CreateBike['status']

export type BikeValueLabel = ValueLabel<BikeAvailability, 'Available' | 'Unavailable' | 'Busy'>
