import Image from "next/image"
import { FiUsers } from "react-icons/fi"
import { LuCrown, LuShield, LuShieldCheck, LuUserCog, LuUsersRound } from "react-icons/lu"
import arrow from "@/assets/icons/structure/arrow.svg"
import branch from "@/assets/icons/structure/branch.svg"
import organizationImage from "@/assets/images/storia/organigramma.png"
import { CardIcon } from "@/components/card-icon"
import { Glass } from "@/components/glass"
import { GradientIcon } from "@/components/gradient-icon"
import { Card, CardTitle } from "@/components/ui/card"
import { teamLeads } from "./constants"

function DownArrow() {
  return (
    <div aria-hidden className="flex h-6 items-center justify-center">
      <Image src={arrow} alt="" className="h-auto w-5 rotate-90" />
    </div>
  )
}

export function OrganizationChart() {
  return (
    <section aria-label="Organigramma di PoliNetwork" className="mx-auto flex w-full max-w-330 flex-col gap-8 px-6">
      <Image
        src={organizationImage}
        alt="Il Direttivo coordina i Capi admin e il Team Growth. I Capi admin coordinano gli Admin. Il Team Growth coordina i responsabili HR, IT, Design e Marketing, International ed Eventi e Partnership, con i rispettivi membri."
        className="mx-auto hidden h-auto w-full max-w-280 mix-blend-multiply md:block"
        sizes="(max-width: 1279px) 100vw, 1120px"
      />
      <div className="flex min-w-0 flex-col items-center md:hidden">
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
