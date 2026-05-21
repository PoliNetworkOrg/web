import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface DropdownOption {
  label: string
  value: string
}

export interface ButtonDropdownProps {
  placeholder?: string
  options: DropdownOption[]
  value?: string
  onChange?: (value: string) => void
  className?: string
  size?: "default" | "sm"
}

export function DropdownButton({
  placeholder = "Select",
  options,
  value,
  onChange,
  className,
  size = "default",
}: ButtonDropdownProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className} size={size}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
