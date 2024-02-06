import { BikeValueLabel } from '../types/bike.types'

export const BIKE_STATUSES: BikeValueLabel[] = [
  {
    value: 'available',
    label: 'Available',
  },
  {
    value: 'busy',
    label: 'Busy',
  },
  {
    value: 'unavailable',
    label: 'Unavailable',
  },
] as const
