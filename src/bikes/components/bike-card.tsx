import { CaretSortIcon } from '@radix-ui/react-icons'
import { CheckIcon } from 'lucide-react'
import { useState } from 'react'
import { Bike, BikeAvailability, BikeValueLabel } from '../../bikes/types/bike.types'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Command, CommandEmpty, CommandGroup, CommandItem } from '../../components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
import { cn } from '../../lib/utils'
import { useUpdateBike } from '../hooks/update-bike.hook'

const statuses: BikeValueLabel[] = [
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
]

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
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<BikeAvailability>(bike.status)

  const { mutate } = useUpdateBike(bike._id)

  return (
    <Card className={CardBorderColorMap[value]}>
      <CardHeader>
        <CardTitle>{`${bike.name} - ${bike.type} (${bike.color})`}</CardTitle>
        <CardDescription>{`ID: ${bike._id}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? statuses.find(status => status.value === value)?.label
                : 'Select framework...'}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {statuses.map(status => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={currentValue => {
                      mutate({ status: currentValue as BikeAvailability })
                      setValue(currentValue as BikeAvailability)
                      setOpen(false)
                    }}
                  >
                    {status.label}
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        value === status.value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  )
}

export default BikeCard
