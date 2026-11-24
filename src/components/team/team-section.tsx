import Image from "next/image"
import { FiUsers } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { GradientIcon } from "@/components/gradient-icon"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { Button } from "@/components/ui/button"
import { teamLeads } from "@/lib/people"
import { cn } from "@/lib/utils"
import { applicationHref, type Team } from "./constants"

/** Each specialism on a glass card. They are not links, so the cards have no hover state. */
function RoleList({ team }: { team: Team }) {
  return (
    <ul aria-label={`Specializzazioni di ${team.title}`} className="grid w-full min-w-0 gap-4 sm:grid-cols-2 sm:gap-6">
      {team.roles.map(({ title, icon }) => (
        <li key={title} className="min-w-0">
          <Glass className="flex h-full min-w-0 items-center gap-4 rounded-rectangles border-white/50 bg-background-blur px-5 py-5">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-rectangles bg-white/70">
              {typeof icon === "string" ? (
                <Image src={icon} alt="" width={24} height={24} className="size-6" />
              ) : (
                <GradientIcon icon={icon} className="size-6" />
              )}
            </span>
            <span className="typo-title-large min-w-0 text-balance text-text-primary">{title}</span>
          </Glass>
        </li>
      ))}
    </ul>
  )
}

/** Who leads the team today, from the register in lib/people */
function Leads({ team }: { team: Team }) {
  const leads = teamLeads(team.id)
  if (leads.length === 0) return null
  return (
    <ul aria-label={`Chi guida ${team.title}`} className="flex flex-wrap gap-x-8 gap-y-3">
      {leads.map((lead) => (
        <li key={`${lead.name}:${lead.role ?? ""}`} className="flex flex-col">
          <span className="typo-title-medium text-text-primary">{lead.name}</span>
          {lead.role && <span className="typo-body-medium text-text-secondary">{lead.role}</span>}
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

/** `reverse` puts the specialisms on the left: the page alternates sides from one team to the next. */
export function TeamSection({ team, reverse = false }: { team: Team; reverse?: boolean }) {
  const title = (
    <h2 id={`${team.id}-title`} className={SECTION_TITLE}>
      {team.title}
    </h2>
  )
  const description = <p className={cn(SECTION_LEAD, "max-w-145")}>{team.description}</p>

  return (
    <section
      id={team.id}
      aria-labelledby={`${team.id}-title`}
      className={cn(
        CONTAINER,
        "grid scroll-mt-36 items-center gap-10 xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] xl:gap-16",
        reverse && "xl:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]"
      )}
    >
      <div className={cn("flex min-w-0 flex-col gap-6", reverse && "xl:order-last")}>
        {title}
        {description}
        <Leads team={team} />
        <div className="pt-2">
          <JoinButton team={team} />
        </div>
      </div>
      <RoleList team={team} />
    </section>
  )
}
