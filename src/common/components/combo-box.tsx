import { CaretSortIcon } from '@radix-ui/react-icons'
import { CheckIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../../components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
import { cn } from '../../lib/utils'
import { ValueLabel } from '../types/common.types'

type Props<Value = string, Label = string> = {
  value: Value
  onChange: (value: Value) => void
  disabled?: boolean
  options: ValueLabel<Value, Label>[]
}

const ComboBox = <Value extends string, Label extends string>({
  value,
  onChange,
  disabled,
  options,
}: Props<Value, Label>) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="max-w-[200px] w-full justify-between"
          disabled={disabled}
        >
          {options.find(status => status.value === value)?.label ?? 'Choose status...'}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[200px] w-full p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>Nothing found.</CommandEmpty>
          <CommandGroup>
            {options.map(status => (
              <CommandItem
                key={status.value}
                value={status.value}
                onSelect={value => {
                  onChange(value as Value)
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
  )
}

export default ComboBox
