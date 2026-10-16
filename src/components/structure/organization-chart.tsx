import Image from "next/image"
import { FiArrowDown, FiUsers } from "react-icons/fi"
import { LuCrown, LuShield, LuShieldCheck, LuUserCog, LuUsersRound } from "react-icons/lu"
import arrow from "@/assets/icons/structure/arrow.svg"
import branch from "@/assets/icons/structure/branch.svg"
import { CardIcon } from "@/components/card-icon"
import { Glass } from "@/components/glass"
import { GradientIcon } from "@/components/gradient-icon"
import { Card, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { teamLeads } from "./constants"

function DownArrow() {
  return (
    <div aria-hidden className="flex h-6 items-center justify-center">
      <Image src={arrow} alt="" className="h-auto w-5 rotate-90" />
    </div>
  )
}

const nodeClassName = "[&_h3]:text-text-primary"
// The admin column is one sixth of the chart: a smaller title and padding keep "Capi admin" on one line
const adminNodeClassName = "[&_h3]:typo-headline-small [&>*]:px-4 [&_h3]:whitespace-nowrap"

/** Horizontal rail and arrow above one child of a branch: the rail runs from the first child's center to the last's. */
function BranchArrow({ position }: { position: "first" | "middle" | "last" | "only" }) {
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

function branchPosition(index: number, count: number) {
  if (count === 1) return "only"
  if (index === 0) return "first"
  return index === count - 1 ? "last" : "middle"
}

function Stem() {
  return <span aria-hidden className="mx-auto block h-6 w-0.5 bg-text-secondary" />
}

function DesktopChart() {
  return (
    <div
      role="img"
      aria-label="Il Direttivo coordina i Capi admin e il Team Growth. I Capi admin coordinano gli Admin. Il Team Growth coordina i responsabili HR, IT, Design e Marketing, International ed Eventi e Partnership, con i rispettivi membri."
      className="mx-auto hidden w-full max-w-280 flex-col lg:flex"
    >
      <CardIcon title="Direttivo" icon={LuCrown} size="sm" className={cn(nodeClassName, "mx-auto w-fit")} />
      <Stem />
      <div className="grid grid-cols-6">
        {/* Rail from the center of the admin column (1/12) to the center of the Team Growth columns (7/12) */}
        <div aria-hidden className="relative col-span-6 h-8">
          <span className="absolute top-0 right-[41.667%] left-[8.333%] h-0.5 bg-text-secondary" />
          <FiArrowDown className="-translate-x-1/2 absolute top-0 left-[8.333%] size-6 text-text-secondary" />
          <FiArrowDown className="-translate-x-1/2 absolute top-0 left-[58.333%] size-6 text-text-secondary" />
        </div>
        <div className="flex min-w-0 flex-col items-center">
          <div className="flex w-full flex-col items-center px-2">
            <CardIcon
              title="Capi admin"
              icon={LuShieldCheck}
              size="sm"
              className={cn(nodeClassName, adminNodeClassName)}
            />
            <BranchArrow position="only" />
            <CardIcon title="Admin" icon={LuShield} size="sm" className={cn(nodeClassName, adminNodeClassName)} />
          </div>
        </div>
        <div className="col-span-5 flex min-w-0 flex-col">
          <CardIcon title="Team Growth" icon={LuUserCog} size="sm" className={cn(nodeClassName, "mx-auto w-fit")} />
          <Stem />
          <ul aria-hidden className="grid grid-cols-5">
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
              <CardTitle gradient={false} className="typo-headline-extrasmall">
                Membri Team
              </CardTitle>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export function OrganizationChart() {
  return (
    <section aria-label="Organigramma di PoliNetwork" className="mx-auto flex w-full max-w-330 flex-col gap-8 px-6">
      <DesktopChart />
      <div className="flex min-w-0 flex-col items-center lg:hidden">
        <CardIcon
          title="Direttivo"
          icon={LuCrown}
          size="xs"
          className="[&_h3]:typo-title-large w-fit px-4 [&_h3]:text-text-primary"
        />
        <div aria-hidden className="relative flex h-6 w-1/2">
          <div className="relative w-1/2">
            <Image
              src={branch}
              alt=""
              className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-auto w-4 rotate-90"
            />
          </div>
          <div className="relative w-1/2">
            <Image
              src={branch}
              alt=""
              className="-translate-x-1/2 -translate-y-1/2 -scale-y-100 absolute top-1/2 left-1/2 h-auto w-4 rotate-90"
            />
          </div>
        </div>
        <div className="grid w-full min-w-0 grid-cols-2 gap-4">
          <div className="flex min-w-0 flex-col items-center">
            <CardIcon
              title="Capi admin"
              icon={LuShieldCheck}
              size="xs"
              className="[&_h3]:typo-title-medium h-28 [&_h3]:text-text-primary"
            />
            <DownArrow />
            <CardIcon
              title="Admin"
              icon={LuShield}
              size="xs"
              className="[&_h3]:typo-title-medium h-28 [&_h3]:text-text-primary"
            />
          </div>
          <div className="flex min-w-0 flex-col items-center">
            <CardIcon
              title="Team Growth"
              icon={LuUserCog}
              size="xs"
              className="[&_h3]:typo-title-medium h-28 [&_h3]:text-text-primary"
            />
            <DownArrow />
            <ul aria-label="Responsabili dei cinque team operativi" className="flex w-full min-w-0 flex-col gap-2">
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
            <DownArrow />
            <CardIcon
              title="Membri Team"
              icon={LuUsersRound}
              size="xs"
              className="[&_h3]:typo-title-medium [&_h3]:text-text-primary"
            />
          </div>
        </div>
      </div>
      <Glass className="flex flex-col gap-4 rounded-rectangles border-white/50 p-6 md:flex-row md:items-center md:gap-6">
        <div className="flex items-center gap-4 md:contents">
          <GradientIcon icon={FiUsers} className="size-10 shrink-0 md:size-14" />
          <h3 className="typo-headline-small md:hidden">Soci</h3>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h3 className="typo-headline-small hidden md:block">Soci</h3>
          <p className="typo-body-medium md:typo-body-large text-pretty">
            Essere socio è una condizione trasversale, compatibile con qualsiasi ruolo all’interno di PoliNetwork. Ogni
            persona può ricoprire più ruoli contemporaneamente.
          </p>
        </div>
      </Glass>
    </section>
  )
}
