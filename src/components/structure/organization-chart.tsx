import type { IconType } from "react-icons"
import { FiUsers } from "react-icons/fi"
import { LuCrown, LuShield, LuShieldCheck, LuUserCog, LuUsersRound } from "react-icons/lu"
import { Glass } from "@/components/glass"
import { GradientIcon } from "@/components/gradient-icon"
import { CONTAINER } from "@/components/layout/page"
import { cn } from "@/lib/utils"
import { teamLeads } from "./constants"

const teamNames = new Intl.ListFormat("it").format(teamLeads.map((lead) => lead.title.replace("Team lead ", "")))
const CHART_LABEL = `Il Direttivo coordina i Capi admin e i Team. I Capi admin coordinano gli Admin. I Team sono guidati dai team lead ${teamNames}, con i rispettivi membri.`

// Nodes are not links, so they have no hover state
const TILE = "rounded-rectangles border-white/50 bg-background-blur text-text-primary"
/** The chart's lines: 4px and rounded in the site's light blue, like the timelines. No arrows */
const LINE = "rounded-full bg-blue-primary/25"

/**
 * Every node of the chart: the same size, icon and title whatever its level. Only Membri Team, which gathers the
 * members of all four teams, is wider.
 */
function Node({ icon, label, className }: { icon: IconType; label: string; className?: string }) {
  return (
    <Glass
      className={cn(
        TILE,
        "flex h-36 w-full min-w-0 flex-col items-center justify-center gap-3 px-3 py-4 text-center",
        className
      )}
    >
      <GradientIcon icon={icon} className="size-9 shrink-0" />
      <span className="typo-title-medium text-balance">{label}</span>
    </Glass>
  )
}

function VLine({ className }: { className?: string }) {
  return <span aria-hidden className={cn("mx-auto block h-6 w-1", LINE, className)} />
}

/**
 * From xl, the tree laid out in rem, so the rails meet the centers of the nodes exactly: an 11rem column for the
 * admins, a 4rem gap, then the four team leads (11rem each, 1.5rem apart) under Team.
 */
function DesktopChart() {
  return (
    <div className="hidden flex-col items-center xl:flex">
      <div className="w-44">
        <Node icon={LuCrown} label="Direttivo" />
      </div>
      <VLine />
      {/* Rail from the admins' column center (5.5rem) to Team's (11 + 4 + 24.25 = 39.25rem) */}
      <div aria-hidden className="relative h-1 w-[63.5rem]">
        <span className={cn(LINE, "absolute inset-y-0 left-[calc(5.5rem-2px)] w-[calc(33.75rem+4px)]")} />
      </div>
      <div className="flex w-[63.5rem] items-start gap-16">
        <div className="flex w-44 shrink-0 flex-col items-center">
          <VLine />
          <Node icon={LuShieldCheck} label="Capi admin" />
          <VLine />
          <Node icon={LuShield} label="Admin" />
        </div>
        <div className="flex w-[48.5rem] flex-col items-center">
          <VLine />
          <div className="w-44">
            <Node icon={LuUserCog} label="Team" />
          </div>
          <VLine />
          {/* Rail over the four team leads, from the first one's center to the last one's */}
          <div aria-hidden className="relative h-1 w-full">
            <span className={cn(LINE, "absolute inset-y-0 right-[calc(5.5rem-2px)] left-[calc(5.5rem-2px)]")} />
          </div>
          <ul className="grid w-full grid-cols-4 gap-6">
            {teamLeads.map((lead) => (
              <li key={lead.title} className="flex flex-col items-center">
                <VLine />
                <Node icon={lead.icon} label={lead.title} />
                <VLine />
              </li>
            ))}
          </ul>
          <div aria-hidden className="relative h-1 w-full">
            <span className={cn(LINE, "absolute inset-y-0 right-[calc(5.5rem-2px)] left-[calc(5.5rem-2px)]")} />
          </div>
          <VLine />
          <Node icon={LuUsersRound} label="Membri Team" className="h-auto flex-row py-5" />
        </div>
      </div>
    </div>
  )
}

/**
 * Below xl, two columns: the admins on the left, Team on the right with its four leads hanging off a line beside them,
 * then Membri Team across both columns, reached by a line from the leads.
 */
function MobileChart() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center xl:hidden">
      <div className="w-[calc(50%-0.5rem)]">
        <Node icon={LuCrown} label="Direttivo" />
      </div>
      <VLine />
      {/* Rail between the two columns' centers */}
      <div aria-hidden className="relative h-1 w-full">
        <span className={cn(LINE, "absolute inset-y-0 right-[calc(25%-0.25rem-2px)] left-[calc(25%-0.25rem-2px)]")} />
      </div>
      <div className="grid w-full grid-cols-2 gap-x-4">
        <div className="flex min-w-0 flex-col items-center">
          <VLine />
          <Node icon={LuShieldCheck} label="Capi admin" />
          <VLine />
          <Node icon={LuShield} label="Admin" />
        </div>
        <div className="relative flex min-w-0 flex-col items-center">
          <VLine />
          <Node icon={LuUserCog} label="Team" />
          <VLine />
          {/* The leads hang off a line down their left side: across from under Team, then down past the last of
              them to Membri Team */}
          <ul className="relative flex w-full flex-col gap-3 pt-4 pl-5">
            <span aria-hidden className={cn(LINE, "absolute top-0 left-0 h-1 w-[calc(50%+2px)]")} />
            <span aria-hidden className={cn(LINE, "absolute top-0 bottom-0 left-0 w-1")} />
            {teamLeads.map((lead) => (
              <li key={lead.title} className="relative min-w-0">
                <span aria-hidden className={cn(LINE, "-translate-y-1/2 absolute top-1/2 right-full h-1 w-5")} />
                <Node icon={lead.icon} label={lead.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* The leads' line, carried on down to Membri Team: it runs along the right column's left edge */}
      <div aria-hidden className="w-full pl-[calc(50%+0.5rem)]">
        <span className={cn(LINE, "block h-6 w-1")} />
      </div>
      <Node icon={LuUsersRound} label="Membri Team" className="h-auto flex-row py-5" />
    </div>
  )
}

export function OrganizationChart() {
  return (
    <section aria-label="Organigramma di PoliNetwork" className={cn(CONTAINER, "flex flex-col gap-10")}>
      <div className="mx-auto flex w-full max-w-280 flex-col items-center gap-10">
        <div role="img" aria-label={CHART_LABEL} className="w-full">
          <DesktopChart />
          <MobileChart />
        </div>

        {/* The members: not a level of the chart but a condition that goes with any role */}
        <Glass
          className={cn(
            TILE,
            "flex w-full max-w-[63.5rem] flex-col items-center gap-5 p-6 text-center sm:flex-row sm:items-center sm:gap-8 sm:p-8 sm:text-start"
          )}
        >
          <Glass className="flex size-20 shrink-0 items-center justify-center rounded-full border-white bg-white/70 p-0">
            <GradientIcon icon={FiUsers} className="size-10" />
          </Glass>
          <div className="flex min-w-0 flex-col gap-2">
            <h3 className="typo-headline-small">Soci</h3>
            <p className="typo-body-large text-pretty">
              Essere socio è <span className="text-blue-secondary">compatibile con qualsiasi ruolo</span> all’interno di
              PoliNetwork, e ogni persona può ricoprire{" "}
              <span className="text-blue-secondary">più ruoli contemporaneamente</span>.
            </p>
          </div>
        </Glass>
      </div>
    </section>
  )
}
