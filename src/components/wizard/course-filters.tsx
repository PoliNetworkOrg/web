import { useNavigate, useSearch } from "@tanstack/react-router"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ALL = "all"

export type FilterOption = { value: string; label: string }

type FilterSelectProps = {
  label: string
  value: string
  options: FilterOption[]
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
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function CourseFilters({ campuses, languages }: { campuses: FilterOption[]; languages: FilterOption[] }) {
  const navigate = useNavigate()
  const search: { campus?: unknown; lang?: unknown } = useSearch({ strict: false })
  const current = (value: unknown) => (value === undefined || value === "" ? ALL : String(value))

  // The filters live in the URL, so a filtered list can be shared and survives a reload
  const update = (key: "campus" | "lang", value: string) =>
    navigate({
      to: ".",
      search: (current) => ({ ...current, [key]: value === ALL ? undefined : value }),
      replace: true,
      resetScroll: false,
    })

  return (
    <div className="flex flex-wrap gap-3">
      <div className="min-w-32 flex-1 md:w-56 md:flex-none">
        <FilterSelect
          label="Tutti i Campus"
          value={current(search.campus)}
          options={campuses}
          onChange={(value) => update("campus", value)}
        />
      </div>
      <div className="min-w-32 flex-1 md:w-56 md:flex-none">
        <FilterSelect
          label="Tutte le lingue"
          value={current(search.lang)}
          options={languages}
          onChange={(value) => update("lang", value)}
        />
      </div>
    </div>
  )
}
