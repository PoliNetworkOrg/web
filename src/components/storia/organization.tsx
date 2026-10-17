import Link from "next/link"
import { FiArrowDown } from "react-icons/fi"
import {
  LuBookUser,
  LuCodeXml,
  LuCrown,
  LuGlobe,
  LuHandshake,
  LuPencilRuler,
  LuShield,
  LuShieldCheck,
  LuUserCog,
  LuUsersRound,
} from "react-icons/lu"
import { CardIcon } from "@/components/card-icon"
import { GradientIcon } from "@/components/gradient-icon"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const teamLeads = [
  { title: "Team lead HR", icon: LuBookUser },
  { title: "Team lead IT", icon: LuCodeXml },
  { title: "Team lead Design & Marketing", icon: LuPencilRuler },
  { title: "Team lead International", icon: LuGlobe },
  { title: "Team lead Eventi & Partnership", icon: LuHandshake },
]

const nodeClassName = "[&_h3]:text-text-primary"
const mainNodeClassName = "[&_h3]:typo-title-large w-fit px-4 [&_h3]:whitespace-nowrap"

type BranchPosition = "first" | "middle" | "last" | "only"

/** Horizontal rail and arrow above one child of a branch: the rail runs from the first child's center to the last's. */
function BranchArrow({ position }: { position: BranchPosition }) {
  return (
    <div aria-hidden className="relative flex h-8 justify-center">
      {position !== "only" && (
        <span
          className={cn(
            "absolute top-0 h-0.5 bg-text-secondary",
            position === "first" && "right-0 left-1/2",
            position === "middle" && "inset-x-0",
            position === "last" && "right-1/2 left-0"
          )}
        />
      )}
      <FiArrowDown className="size-6 text-text-secondary" />
    </div>
  )
}

function branchPosition(index: number, count: number): BranchPosition {
  if (count === 1) return "only"
  if (index === 0) return "first"
  return index === count - 1 ? "last" : "middle"
}

function Stem() {
  return <span aria-hidden className="mx-auto block h-6 w-0.5 bg-text-secondary" />
}

function DesktopChart() {
  return (
    <div className="hidden w-full flex-col lg:flex">
      <CardIcon
        title="Direttivo"
        icon={LuCrown}
        size="xs"
        className={cn(nodeClassName, mainNodeClassName, "mx-auto")}
      />
      <Stem />
      <div className="grid grid-cols-6">
        {/* Rail from the center of the admin column (1/12) to the center of the Team growth columns (7/12) */}
        <div aria-hidden className="relative col-span-6 h-8">
          <span className="absolute top-0 right-[41.667%] left-[8.333%] h-0.5 bg-text-secondary" />
          <FiArrowDown className="-translate-x-1/2 absolute top-0 left-[8.333%] size-6 text-text-secondary" />
          <FiArrowDown className="-translate-x-1/2 absolute top-0 left-[58.333%] size-6 text-text-secondary" />
        </div>
        <div className="flex min-w-0 flex-col items-center px-2">
          <CardIcon
            title="Capi admin"
            icon={LuShieldCheck}
            size="xs"
            className={cn(nodeClassName, mainNodeClassName)}
          />
          <BranchArrow position="only" />
          <CardIcon title="Admin" icon={LuShield} size="xs" className={cn(nodeClassName, mainNodeClassName)} />
        </div>
        <div className="col-span-5 flex min-w-0 flex-col">
          <CardIcon
            title="Team growth"
            icon={LuUserCog}
            size="xs"
            className={cn(nodeClassName, mainNodeClassName, "mx-auto")}
          />
          <Stem />
          <ul className="grid grid-cols-5">
            {teamLeads.map((lead, index) => (
              <li key={lead.title} className="flex min-w-0 flex-col">
                <BranchArrow position={branchPosition(index, teamLeads.length)} />
                <div className="flex flex-1 flex-col px-2">
                  <CardIcon title={lead.title} icon={lead.icon} size="xs" className={cn(nodeClassName, "h-full")} />
                </div>
                <BranchArrow position="only" />
              </li>
            ))}
          </ul>
          <div className="px-2">
            <Card className="h-auto w-full flex-row items-center justify-center gap-3 border-white/50 p-4">
              <GradientIcon icon={LuUsersRound} className="size-8 shrink-0" />
              <CardTitle gradient={false} className="typo-title-large">
                Membri dei team
              </CardTitle>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileChart() {
  return (
    <div className="flex min-w-0 flex-col items-center lg:hidden">
      <CardIcon title="Direttivo" icon={LuCrown} size="xs" className={cn(nodeClassName, mainNodeClassName)} />
      <Stem />
      <div className="grid w-full min-w-0 grid-cols-2 gap-4">
        <div aria-hidden className="relative col-span-2 h-8">
          <span className="absolute top-0 right-1/4 left-1/4 h-0.5 bg-text-secondary" />
          <FiArrowDown className="-translate-x-1/2 absolute top-0 left-1/4 size-6 text-text-secondary" />
          <FiArrowDown className="-translate-x-1/2 absolute top-0 left-3/4 size-6 text-text-secondary" />
        </div>
        <div className="flex min-w-0 flex-col items-center">
          <CardIcon
            title="Capi admin"
            icon={LuShieldCheck}
            size="xs"
            className={cn(nodeClassName, "[&_h3]:typo-title-medium")}
          />
          <BranchArrow position="only" />
          <CardIcon title="Admin" icon={LuShield} size="xs" className={cn(nodeClassName, "[&_h3]:typo-title-medium")} />
        </div>
        <div className="flex min-w-0 flex-col items-center">
          <CardIcon
            title="Team growth"
            icon={LuUserCog}
            size="xs"
            className={cn(nodeClassName, "[&_h3]:typo-title-medium")}
          />
          <BranchArrow position="only" />
          <ul className="flex w-full min-w-0 flex-col gap-2">
            {teamLeads.map((lead) => (
              <li key={lead.title}>
                <Card className="h-auto min-h-14 w-full flex-row items-center gap-3 border-white/50 p-3">
                  <GradientIcon icon={lead.icon} className="size-6 shrink-0" />
                  <CardTitle gradient={false} className="typo-label-medium min-w-0">
                    {lead.title}
                  </CardTitle>
                </Card>
              </li>
            ))}
          </ul>
          <BranchArrow position="only" />
          <CardIcon
            title="Membri dei team"
            icon={LuUsersRound}
            size="xs"
            className={cn(nodeClassName, "[&_h3]:typo-title-medium")}
          />
        </div>
      </div>
    </div>
  )
}

export function Organization() {
  return (
    <section className="mx-auto flex w-full max-w-330 flex-col gap-10 px-6" aria-labelledby="struttura-title">
      <div className="flex max-w-140 flex-col gap-6">
        <h2 id="struttura-title" className="typo-headline-medium sm:typo-display-medium text-balance">
          Come è organizzata PoliNetwork
        </h2>
        <p className="typo-body-large sm:typo-headline-extrasmall max-w-94 text-pretty">
          Direttivo, team operativi, admin e soci. Guarda come funziona la macchina dall’interno.
        </p>
        <Button asChild className="w-fit">
          <Link href="#organigramma">
            Scopri la struttura <FiArrowDown aria-hidden />
          </Link>
        </Button>
      </div>
      <div
        id="organigramma"
        role="img"
        aria-label="Il Direttivo coordina i Capi admin e il Team growth. I Capi admin coordinano gli Admin. Il Team growth coordina i team lead HR, IT, Design & Marketing, International ed Eventi & Partnership, con i rispettivi membri."
        className="xl:-mt-57 w-full scroll-mt-32 xl:max-w-220 xl:self-end"
      >
        <DesktopChart />
        <MobileChart />
      </div>
    </section>
  )
}
