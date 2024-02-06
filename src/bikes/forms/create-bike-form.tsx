import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import ComboBox from '../../common/components/combo-box'
import { Button } from '../../components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { BIKE_STATUSES } from '../consts/bike.consts'
import { useCreateBike } from '../hooks/create-bike.hook'
import { createBikeSchema } from '../schemas/create-bike.schema'
import { BikeAvailability, BikeAvailabilityLabel, CreateBike } from '../types/bike.types'

const CreateBikeForm = () => {
  const { mutate, isPending, isSuccess } = useCreateBike()

  const form = useForm<CreateBike>({
    resolver: zodResolver(createBikeSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      color: '',
      description: '',
      price: 0,
      status: 'available',
      type: '',
      wheelSize: 0,
    },
  })

  const { control, handleSubmit, reset } = form

  const onSubmit = (data: CreateBike) => {
    mutate(data)
  }

  useEffect(() => {
    if (isSuccess) {
      reset()
    }
  }, [isSuccess, reset])

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-2 p-[1px]">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="Type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="Color" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="wheelSize"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="Wheele size" {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="Price" {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="status"
          render={({ field: { value, onChange, disabled } }) => (
            <FormItem>
              <FormControl>
                <ComboBox<BikeAvailability, BikeAvailabilityLabel>
                  value={value}
                  onChange={onChange}
                  disabled={disabled}
                  options={BIKE_STATUSES}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? <ReloadIcon className="animate-spin" /> : 'Create'}
        </Button>
        <Button type="button" disabled={isPending} variant="secondary" onClick={() => reset()}>
          Clear
        </Button>
      </form>
    </Form>
  )
}

export default CreateBikeForm
