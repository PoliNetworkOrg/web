import { useNavigate, useSearch } from "@tanstack/react-router"
import { ALL, type FilterOption, FilterSelect } from "@/components/wizard/course-filters"

/** The value of a search parameter as the URL has it: the first one when repeated */
const current = (value: unknown) => {
  const first = Array.isArray(value) ? value[0] : value
  return first === undefined ? ALL : String(first)
}

/** Programme and campus filters, kept in the URL (`?corso=…&sede=…`) so a filtered list can be shared. */
export function AssociationFilters({ programmes, campuses }: { programmes: FilterOption[]; campuses: FilterOption[] }) {
  const navigate = useNavigate()
  const search: { corso?: unknown; sede?: unknown } = useSearch({ strict: false })

  const update = (key: "corso" | "sede", value: string) =>
    navigate({
      to: ".",
      search: (previous) => ({ ...previous, [key]: value === ALL ? undefined : value }),
      replace: true,
      resetScroll: false,
    })

  return (
    <div className="flex flex-wrap gap-3">
      {programmes.length > 0 && (
        <div className="min-w-48 flex-1 md:w-72 md:flex-none">
          <FilterSelect
            label="Tutti i corsi"
            value={current(search.corso)}
            options={programmes}
            onChange={(value) => update("corso", value)}
          />
        </div>
      )}
      {campuses.length > 0 && (
        <div className="min-w-32 flex-1 md:w-56 md:flex-none">
          <FilterSelect
            label="Tutte le sedi"
            value={current(search.sede)}
            options={campuses}
            onChange={(value) => update("sede", value)}
          />
        </div>
      )}
    </div>
  )
}
