import Link from "next/link"
import { FiArrowRight } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { arbiters, areas, currentTerm, formatPeriod, type Term } from "@/lib/people"

/** Who holds each office today, read from the same register as the history page */
const offices = [
  { name: "Collegio dei Probiviri", term: currentTerm(arbiters), href: undefined },
  ...areas.map((area) => ({
    name: area.name,
    term: currentTerm(area.terms),
    href: area.teamId && `/team#${area.teamId}`,
  })),
].filter((office): office is { name: string; term: Term; href: string | undefined } => Boolean(office.term))

export function CurrentRoles() {
  return (
    <div className="flex flex-col items-center gap-8">
      <ul className="grid w-full gap-6 md:grid-cols-2 xl:grid-cols-3">
        {offices.map(({ name, term, href }) => {
          const period = formatPeriod(term)
          return (
            <li key={name} className="flex">
              <Card className="h-auto w-full gap-5 border-white/50 p-6">
                <CardHeader className="gap-1">
                  <CardTitle gradient={false} className="typo-title-large text-balance">
                    {href ? (
                      <Link href={href} className="underline-offset-4 hover:text-blue-secondary hover:underline">
                        {name}
                      </Link>
                    ) : (
                      name
                    )}
                  </CardTitle>
                  {period && <p className="typo-body-medium text-text-secondary">{period}</p>}
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-3">
                    {term.people.map((person) => (
                      <li key={person.name} className="flex flex-col">
                        <span className="typo-title-medium text-text-primary">{person.name}</span>
                        {person.role && <span className="typo-body-medium text-text-secondary">{person.role}</span>}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </li>
          )
        })}
      </ul>
      <Button asChild variant="tertiary" size="lg">
        <Link href="/storia#incarichi">
          Tutti gli incarichi dal 2016 <FiArrowRight aria-hidden />
        </Link>
      </Button>
    </div>
  )
}
