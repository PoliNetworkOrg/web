import type { IconType } from "react-icons"
import { FiArrowRight } from "react-icons/fi"
import { LuBookUser, LuCodeXml, LuHandshake, LuPencilRuler, LuScale } from "react-icons/lu"
import { CardCaption } from "@/components/card-caption"
import { Link } from "@/components/link"
import { Button } from "@/components/ui/button"
import { arbiters, areas, currentTerm, type Holder } from "@/lib/people"
import { cn } from "@/lib/utils"

/** The teams' icons, as in the organisation chart */
const teamIcons: Record<string, IconType> = {
  it: LuCodeXml,
  "design-marketing": LuPencilRuler,
  hr: LuBookUser,
  "events-partnership": LuHandshake,
}

/** Who holds each office today, read from the same register as the history page */
const offices = [
  { name: "Collegio dei Probiviri", icon: LuScale, people: currentTerm(arbiters)?.people ?? [], href: undefined },
  ...areas.flatMap((area) =>
    area.teamId
      ? [
          {
            name: area.name,
            icon: teamIcons[area.teamId],
            people: currentTerm(area.terms)?.people ?? [],
            href: `/team#${area.teamId}`,
          },
        ]
      : []
  ),
]

function People({ people }: { people: Holder[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {people.map((person, index) => (
        <li key={`${index}:${person.name}`} className="flex flex-col">
          <span className="typo-title-medium text-text-primary">{person.name}</span>
          {person.role && <span className="typo-body-medium text-text-secondary">{person.role}</span>}
        </li>
      ))}
    </ul>
  )
}

export function CurrentRoles() {
  return (
    <div className="flex flex-col items-center gap-8">
      {/* Five cards: three then two, the second row centred */}
      <ul className="grid w-full auto-rows-fr grid-cols-1 gap-6 md:grid-cols-4 xl:grid-cols-6">
        {offices.map((office, index) => (
          <li
            key={office.name}
            className={cn(
              "flex min-w-0 md:col-span-2",
              index === 3 && "xl:col-start-2",
              index === 4 && "md:col-start-2 xl:col-start-4"
            )}
          >
            <CardCaption
              title={office.name}
              icon={office.icon}
              href={office.href}
              ariaLabel={office.href ? `${office.name}: scopri il team` : undefined}
              caption={<People people={office.people} />}
              className="h-full w-full gap-5 p-6"
              titleClassName="typo-headline-small text-balance"
            />
          </li>
        ))}
      </ul>
      <Button asChild variant="tertiary" size="lg">
        <Link href="/storia#incarichi">
          Tutti gli incarichi dal 2016 <FiArrowRight aria-hidden />
        </Link>
      </Button>
    </div>
  )
}
