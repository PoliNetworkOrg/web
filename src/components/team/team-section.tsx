import Image from "next/image"
import { FiUsers } from "react-icons/fi"
import { GradientIcon } from "@/components/gradient-icon"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { applicationHref, type Team } from "./constants"

/**
 * The specialisms are not links, so they are set as a plain list (icon + label on a hairline) rather than as tiles:
 * Figma draws them in four different tile variants and which one becomes the standard is still a design decision.
 */
function RoleList({ team }: { team: Team }) {
  return (
    <ul
      aria-label={`Specializzazioni di ${team.title}`}
      className={cn("grid w-full min-w-0 gap-x-10 sm:grid-cols-2", team.layout === "stacked" && "xl:grid-cols-3")}
    >
      {team.roles.map(({ title, icon }) => (
        <li key={title} className="flex min-w-0 items-center gap-4 border-slate-300/70 border-t py-5">
          {typeof icon === "string" ? (
            <Image src={icon} alt="" width={24} height={24} className="size-6 shrink-0" />
          ) : (
            <GradientIcon icon={icon} className="size-6 shrink-0" />
          )}
          <span className="typo-title-large text-text-primary">{title}</span>
        </li>
      ))}
    </ul>
  )
}

function JoinButton({ team }: { team: Team }) {
  return (
    <Button asChild size="lg" className="w-fit">
      <a href={applicationHref(team.title)}>
        Unisciti a noi <FiUsers aria-hidden />
      </a>
    </Button>
  )
}

export function TeamSection({ team }: { team: Team }) {
  const title = (
    <h2 id={`${team.id}-title`} className={SECTION_TITLE}>
      {team.title}
    </h2>
  )
  const description = <p className={cn(SECTION_LEAD, "max-w-145")}>{team.description}</p>

  // Figma closes the sequence with a different composition: title and text side by side, specialisms underneath
  if (team.layout === "stacked") {
    return (
      <section
        id={team.id}
        aria-labelledby={`${team.id}-title`}
        className={cn(CONTAINER, "flex scroll-mt-36 flex-col gap-10 xl:gap-14")}
      >
        <div className="grid gap-6 xl:grid-cols-2 xl:gap-16">
          {title}
          <div className="flex flex-col gap-8 xl:pt-3">
            {description}
            <JoinButton team={team} />
          </div>
        </div>
        <RoleList team={team} />
      </section>
    )
  }

  return (
    <section
      id={team.id}
      aria-labelledby={`${team.id}-title`}
      className={cn(
        CONTAINER,
        "grid scroll-mt-36 items-center gap-10 xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] xl:gap-16",
        team.layout === "reverse" && "xl:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]"
      )}
    >
      <div className={cn("flex min-w-0 flex-col gap-6", team.layout === "reverse" && "xl:order-last")}>
        {title}
        {description}
        <div className="pt-2">
          <JoinButton team={team} />
        </div>
      </div>
      <RoleList team={team} />
    </section>
  )
}
