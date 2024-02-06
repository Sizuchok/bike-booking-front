import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Cross1Icon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { Bike, BikeAvailability, BikeAvailabilityLabel } from '../../bikes/types/bike.types'
import ComboBox from '../../common/components/combo-box'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { cn } from '../../lib/utils'
import { BIKE_STATUSES } from '../consts/bike.consts'
import { useDeleteBike } from '../hooks/delete-bike.hook'
import { useUpdateBike } from '../hooks/update-bike.hook'

type ColorMap = {
  [key in BikeAvailability]: string
}

type Props = {
  bike: Bike
}

const CardBorderColorMap: ColorMap = {
  available: 'border-green-500',
  busy: 'border-yellow-500',
  unavailable: 'border-red-500',
} as const

const BikeCard = ({ bike }: Props) => {
  const [value, setValue] = useState<BikeAvailability>(bike.status)
  const isMobile = useMediaQuery('(min-width: 375px) and (max-width: 768px)')

  const { mutate: deleteBike } = useDeleteBike(bike._id)
  const { mutate: updateStatus } = useUpdateBike(bike._id)

  return (
    <Card className={cn(CardBorderColorMap[value], 'relative')}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Cross1Icon className="absolute right-2 top-2 hover:cursor-pointer hover:scale-105" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this bike info from the
              server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteBike()}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <CardHeader>
        <CardTitle>
          {bike.name}
          <span className="font-normal">{` - ${bike.type} (${bike.color})`}</span>
        </CardTitle>
        <CardDescription>{`ID: ${bike._id}`}</CardDescription>
      </CardHeader>
      <CardContent
        className={cn(
          'flex flex-col gap-2',
          isMobile ? 'flex-row items-center justify-between' : '',
          'md:flex-row md:items-center md:justify-between',
        )}
      >
        <ComboBox<BikeAvailability, BikeAvailabilityLabel>
          options={BIKE_STATUSES}
          value={value}
          onChange={value => {
            setValue(value)
            updateStatus({ status: value })
          }}
        />
        <span className="text-xl whitespace-nowrap">{`${bike.price}.00 UAH/hr`}</span>
      </CardContent>
    </Card>
  )
}

export default BikeCard
