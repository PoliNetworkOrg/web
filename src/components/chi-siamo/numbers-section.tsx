import { FiBook, FiBookOpen, FiHeadphones, FiSend, FiUser, FiUsers } from "react-icons/fi"
import { GradientIcon } from "@/components/gradient-icon"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { Card } from "@/components/ui/card"

const stats = [
  { value: "500+", label: "gruppi Telegram e WhatsApp attivi", icon: FiSend },
  { value: "30+", label: "corsi di laurea coperti", icon: FiBook },
  { value: "45k+", label: "studenti raggiunti ogni anno", icon: FiUser },
  { value: "100+", label: "admin volontari su tutte le sedi", icon: FiUsers },
  { value: "5", label: "team operativi", icon: FiHeadphones },
  { value: "100%", label: "progetti tecnici rilasciati open source", icon: FiBookOpen },
] as const

export function NumbersSection() {
  return (
    <section className={`${CONTAINER} flex flex-col gap-10 md:gap-14`}>
      <div className="flex flex-col gap-4">
        <h2 className={SECTION_TITLE}>I numeri</h2>
        <p className={`${SECTION_LEAD} max-w-160`}>
          Un network in continua crescita, costruito dagli studenti, per gli studenti.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Figma sets the figures at headline size beside the icon: at 45px they outranked the section titles */}
        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
          {stats.map((stat) => (
            <li key={stat.label}>
              <Card className="h-full w-full flex-row items-center gap-5 p-6">
                <GradientIcon icon={stat.icon} className="size-10 shrink-0" />
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="typo-headline-large text-blue-secondary tabular-nums">{stat.value}</p>
                  <p className="typo-body-large text-pretty">{stat.label}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>

        <p className="typo-body-large lg:text-center">
          Dal <span className="text-blue-secondary">2016</span> al fianco degli studenti del PoliMi
        </p>
      </div>
    </section>
  )
}
