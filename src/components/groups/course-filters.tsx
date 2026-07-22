"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ALL = "all"

type FilterSelectProps = {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      {/* larghezza fissa dal wrapper: testo a sinistra, freccia attaccata al bordo destro */}
      <SelectTrigger className="w-full justify-between">
        <SelectValue placeholder={label} className="truncate" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>{label}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function CourseFilters({ campuses, languages }: { campuses: string[]; languages: string[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const update = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === ALL) params.delete(key)
    else params.set(key, value)
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  return (
    <div className="flex flex-wrap gap-3">
      <div className="w-56">
        <FilterSelect
          label="Tutti i campus"
          value={searchParams.get("campus") ?? ALL}
          options={campuses}
          onChange={(value) => update("campus", value)}
        />
      </div>
      <div className="w-56">
        <FilterSelect
          label="Tutte le lingue"
          value={searchParams.get("lang") ?? ALL}
          options={languages}
          onChange={(value) => update("lang", value)}
        />
      </div>
    </div>
  )
}
