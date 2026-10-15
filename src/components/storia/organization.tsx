import Image from "next/image"
import Link from "next/link"
import { FiArrowDown, FiMonitor } from "react-icons/fi"
import { LuCrown, LuShield, LuShieldCheck, LuUserCog } from "react-icons/lu"
import organizationImage from "@/assets/images/storia/organigramma.png"
import { CardIcon } from "@/components/card-icon"
import { Glass } from "@/components/glass"
import { Button } from "@/components/ui/button"

const teams = ["HR", "IT", "Design e Marketing", "International", "Eventi"]

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
      <div id="organigramma" className="xl:-mt-57 w-full scroll-mt-32 xl:max-w-220 xl:self-end">
        <Image
          src={organizationImage}
          alt="Il Direttivo coordina i Capi admin e il Team growth. I Capi admin coordinano gli Admin. Il Team growth coordina i team lead HR, IT, Design e Marketing, International ed Eventi, con i rispettivi membri."
          className="hidden h-auto w-full object-contain mix-blend-multiply md:block"
          sizes="(max-width: 1279px) 100vw, 882px"
        />
        <div className="flex flex-col items-center gap-4 md:hidden">
          <CardIcon title="Direttivo" icon={LuCrown} size="xs" className="max-w-40" />
          <FiArrowDown aria-hidden className="size-5 text-blue-secondary" />
          <div className="grid w-full gap-6 min-[480px]:grid-cols-2">
            <Glass className="flex flex-col items-center gap-4 rounded-rectangles p-4">
              <CardIcon title="Capi admin" icon={LuShieldCheck} size="xs" />
              <FiArrowDown aria-hidden className="size-5 text-blue-secondary" />
              <CardIcon title="Admin" icon={LuShield} size="xs" />
            </Glass>
            <Glass className="flex flex-col items-center gap-4 rounded-rectangles p-4">
              <CardIcon title="Team growth" icon={LuUserCog} size="xs" />
              <FiArrowDown aria-hidden className="size-5 text-blue-secondary" />
              <ul className="grid w-full grid-cols-2 gap-3 min-[480px]:grid-cols-1">
                {teams.map((team) => (
                  <li key={team} className="min-w-0">
                    <CardIcon title={`Team lead ${team}`} icon={FiMonitor} size="xs" className="h-full" />
                  </li>
                ))}
              </ul>
              <FiArrowDown aria-hidden className="size-5 text-blue-secondary" />
              <CardIcon title="Membri dei team" icon={FiMonitor} size="xs" />
            </Glass>
          </div>
        </div>
      </div>
    </section>
  )
}
