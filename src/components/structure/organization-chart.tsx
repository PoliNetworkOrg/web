import type { IconType } from "react-icons"
import { FiArrowDown, FiArrowLeft, FiUsers } from "react-icons/fi"
import { LuCrown, LuShield, LuShieldCheck, LuUserCog, LuUsersRound } from "react-icons/lu"
import { Glass } from "@/components/glass"
import { GradientIcon } from "@/components/gradient-icon"
import { cn } from "@/lib/utils"
import { CONTAINER, teamLeads } from "./constants"

const CHART_LABEL =
  "Il Direttivo coordina i Capi admin e il Team growth. I Capi admin coordinano gli Admin. Il Team growth coordina i team lead HR, IT, Design & Marketing, International ed Eventi & Partnership, con i rispettivi membri."

// Figma "Nodo organigramma": a glass tile with the icon above a 22px label. Nodes are not links, so no hover.
const tileClassName = "rounded-rectangles border-white/50 bg-background-blur text-text-primary"

function Node({ icon, label, className }: { icon: IconType; label: string; className?: string }) {
  return (
    <Glass
      className={cn(
        tileClassName,
        "flex min-w-32 flex-col items-center gap-2 px-5 py-4 lg:min-w-44 lg:gap-3 lg:px-6 lg:py-5",
        className
      )}
    >
      <GradientIcon icon={icon} className="size-8 shrink-0 lg:size-12" />
      <span className="typo-headline-extrasmall lg:typo-headline-medium text-balance text-center">{label}</span>
    </Glass>
  )
}

function LeadNode({ icon, label }: { icon: IconType; label: string }) {
  return (
    <Glass
      className={cn(tileClassName, "flex h-full flex-col items-center justify-center gap-2 px-2 py-3 text-center")}
    >
      <GradientIcon icon={icon} className="size-6 shrink-0 xl:size-8" />
      <span className="typo-label-large xl:typo-title-medium text-balance">{label}</span>
    </Glass>
  )
}

function Arrow({ className }: { className?: string }) {
  return <FiArrowDown aria-hidden className={cn("size-5 text-text-secondary", className)} />
}

/** Horizontal rail and arrow above one child of a branch: the rail runs from the first child's center to the last's. */
function BranchArrow({ position }: { position: "first" | "middle" | "last" | "only" }) {
  return (
    <div aria-hidden className="relative flex h-7 justify-center">
      {position !== "only" && (
        <span
          className={cn(
            "absolute top-0 h-px bg-text-secondary",
            position === "first" && "right-0 left-1/2",
            position === "middle" && "inset-x-0",
            position === "last" && "right-1/2 left-0"
          )}
        />
      )}
      <Arrow />
    </div>
  )
}

function branchPosition(index: number, count: number) {
  if (count === 1) return "only"
  if (index === 0) return "first"
  return index === count - 1 ? "last" : "middle"
}

function Stem() {
  return <span aria-hidden className="mx-auto block h-5 w-px bg-text-secondary" />
}

function DesktopChart() {
  return (
    <div className="hidden w-full flex-col items-center lg:flex">
      <Node icon={LuCrown} label="Direttivo" />
      <Stem />
      <div className="grid w-full grid-cols-6">
        {/* Rail from the center of the admin column (1/12) to the center of the Team growth columns (7/12) */}
        <div aria-hidden className="relative col-span-6 h-7">
          <span className="absolute top-0 right-[41.667%] left-[8.333%] h-px bg-text-secondary" />
          <Arrow className="-translate-x-1/2 absolute top-0 left-[8.333%]" />
          <Arrow className="-translate-x-1/2 absolute top-0 left-[58.333%]" />
        </div>
        <div className="flex min-w-0 flex-col items-center px-2">
          <Node icon={LuShieldCheck} label="Capi admin" className="w-full min-w-0 px-2 lg:min-w-0 lg:px-3" />
          <BranchArrow position="only" />
          <Node icon={LuShield} label="Admin" className="w-full min-w-0 px-2 lg:min-w-0 lg:px-3" />
        </div>
        <div className="col-span-5 flex min-w-0 flex-col items-center">
          <Node icon={LuUserCog} label="Team growth" />
          <Stem />
          <ul className="grid w-full grid-cols-5">
            {teamLeads.map((lead, index) => (
              <li key={lead.title} className="flex min-w-0 flex-col">
                <BranchArrow position={branchPosition(index, teamLeads.length)} />
                <div className="flex flex-1 flex-col px-2">
                  <LeadNode icon={lead.icon} label={lead.title} />
                </div>
                <BranchArrow position="only" />
              </li>
            ))}
          </ul>
          <div className="w-full px-2">
            <Glass className={cn(tileClassName, "flex items-center justify-center gap-3 px-4 py-3")}>
              <GradientIcon icon={LuUsersRound} className="size-8 shrink-0" />
              <span className="typo-headline-small">Membri Team</span>
            </Glass>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Figma mobile "Sezione organigramma": two columns, team leads hanging off a vertical rail, Membri Team balancing the admin column. */
function MobileChart() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center lg:hidden">
      <Node icon={LuCrown} label="Direttivo" />
      <Stem />
      <div className="grid w-full grid-cols-2 gap-x-4">
        <div aria-hidden className="relative col-span-2 h-7">
          <span className="absolute top-0 right-1/4 left-1/4 h-px bg-text-secondary" />
          <Arrow className="-translate-x-1/2 absolute top-0 left-1/4" />
          <Arrow className="-translate-x-1/2 absolute top-0 left-3/4" />
        </div>
        <div className="flex min-w-0 flex-col items-center">
          <Node icon={LuShieldCheck} label="Capi admin" className="w-full min-w-0 px-2 lg:min-w-0 lg:px-3" />
          <BranchArrow position="only" />
          <Node icon={LuShield} label="Admin" className="w-full min-w-0 px-2 lg:min-w-0 lg:px-3" />
          <div className="relative mt-auto w-full pt-6">
            <Node icon={LuUsersRound} label="Membri Team" className="w-full min-w-0 px-2 lg:min-w-0 lg:px-3" />
            {/* Arrow from the team leads' rail, across the column gap */}
            <span
              aria-hidden
              className="-translate-y-1/2 absolute top-[calc(50%+0.75rem)] left-full flex w-6 items-center sm:w-7"
            >
              <FiArrowLeft className="-ml-1 size-4 shrink-0 text-text-secondary" />
              <span className="h-px flex-1 bg-text-secondary" />
            </span>
          </div>
        </div>
        <div className="flex min-w-0 flex-col items-center">
          <Node icon={LuUserCog} label="Team growth" className="w-full min-w-0 px-2 lg:min-w-0 lg:px-3" />
          <Stem />
          <ul className="ml-2 flex w-[calc(100%-0.5rem)] flex-col gap-2 border-text-secondary border-l py-2 sm:ml-3 sm:w-[calc(100%-0.75rem)]">
            {teamLeads.map((lead) => (
              <li key={lead.title} className="flex items-center">
                <span aria-hidden className="h-px w-2 shrink-0 bg-text-secondary sm:w-3" />
                <Glass
                  className={cn(tileClassName, "flex min-w-0 flex-1 items-center gap-1.5 px-2 py-2.5 sm:gap-2 sm:px-3")}
                >
                  <GradientIcon icon={lead.icon} className="size-4 shrink-0 sm:size-5" />
                  <span className="typo-label-medium sm:typo-label-large min-w-0">{lead.title}</span>
                </Glass>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/** The organisation diagram, shared by /about and /storia. */
export function OrganizationDiagram({ id, className }: { id?: string; className?: string }) {
  return (
    <div id={id} role="img" aria-label={CHART_LABEL} className={cn("w-full", className)}>
      <DesktopChart />
      <MobileChart />
    </div>
  )
}

export function OrganizationChart() {
  return (
    <section aria-label="Organigramma di PoliNetwork" className={cn(CONTAINER, "flex flex-col gap-10")}>
      {/* Chart and Soci share one column, as in Figma */}
      <div className="mx-auto flex w-full max-w-280 flex-col gap-10">
        <OrganizationDiagram />
        <Glass className={cn(tileClassName, "flex flex-col gap-3 p-6 md:flex-row md:items-start md:gap-6")}>
          <GradientIcon icon={FiUsers} className="hidden size-12 shrink-0 md:block" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <h3 className="typo-headline-small flex items-center gap-3">
                <GradientIcon icon={FiUsers} className="size-8 shrink-0 md:hidden" />
                Soci
              </h3>
              {/* A label, not an action: Figma's "Ruolo trasversale" tag */}
              <span className="typo-label-medium rounded-buttonsM bg-blue-tertiary-blur px-3 py-1 text-blue-secondary">
                Ruolo trasversale
              </span>
            </div>
            <p className="typo-body-large text-pretty">
              Essere socio è una condizione trasversale, compatibile con qualsiasi ruolo all’interno di PoliNetwork.
              Ogni persona può ricoprire più ruoli contemporaneamente.
            </p>
          </div>
        </Glass>
      </div>
    </section>
  )
}
