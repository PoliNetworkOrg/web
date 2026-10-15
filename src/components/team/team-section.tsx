import { FiUsers } from "react-icons/fi"
import { CardIcon } from "@/components/card-icon"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { applicationHref, type Team } from "./constants"
import { PeopleGallery } from "./people-gallery"

export function TeamSection({ team }: { team: Team }) {
  return (
    <section
      id={team.id}
      aria-labelledby={`${team.id}-title`}
      className="mx-auto flex w-full max-w-330 scroll-mt-36 flex-col gap-12 px-6"
    >
      <div
        className={cn(
          "grid min-w-0 items-center gap-10 xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] xl:gap-16",
          team.reverse && "xl:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]",
          team.centered && "xl:grid-cols-1"
        )}
      >
        <div
          className={cn(
            "flex min-w-0 flex-col items-center gap-6 text-center xl:items-start xl:text-start",
            team.reverse && "xl:order-last",
            team.centered && "mx-auto max-w-220 xl:items-center xl:text-center"
          )}
        >
          <h2
            id={`${team.id}-title`}
            className="typo-headline-medium sm:typo-display-medium text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent"
          >
            {team.title}
          </h2>
          <p className="typo-body-large sm:typo-headline-extrasmall max-w-145 text-pretty">{team.description}</p>
          <Button asChild size="lg" className="mt-2 w-fit">
            <a href={applicationHref(team.title)}>
              Unisciti a noi <FiUsers aria-hidden />
            </a>
          </Button>
        </div>
        {team.roles.length > 0 && (
          <ul aria-label={`Specializzazioni di ${team.title}`} className="grid w-full min-w-0 gap-4 sm:grid-cols-2">
            {team.roles.map((role) => (
              <li key={role.title} className="min-w-0 sm:last:odd:col-span-2">
                <CardIcon {...role} align="inline" size="inline-sm" className="h-full" />
              </li>
            ))}
          </ul>
        )}
      </div>
      {team.placeholderCount > 0 && <PeopleGallery placeholderCount={team.placeholderCount} />}
    </section>
  )
}
