import { FiBook, FiBookOpen, FiHeadphones, FiSend, FiUser, FiUsers } from "react-icons/fi"
import { GradientIcon } from "@/components/gradient-icon"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

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
    <section className="page-container flex flex-col gap-block">
      <div className="flex flex-col gap-6 text-center md:text-start">
        <h2 className="typo-headline-medium md:typo-display-medium bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
          I numeri
        </h2>
        <p className="typo-body-large md:typo-headline-small md:max-w-120">
          Un network in continua crescita, costruito dagli studenti, per gli studenti.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="h-auto w-full flex-row items-center gap-6 px-8 py-7">
              <GradientIcon icon={stat.icon} className="size-14 shrink-0 md:size-21" />
              <div className="flex flex-col">
                <CardTitle gradient={false} className="typo-display-medium md:typo-display-large text-blue-secondary">
                  {stat.value}
                </CardTitle>
                <CardContent className="typo-body-large md:typo-headline-small">{stat.label}</CardContent>
              </div>
            </Card>
          ))}
        </div>

        <p className="typo-body-large md:typo-headline-small text-center">
          Dal <span className="text-blue-secondary">2016</span> al fianco degli studenti del PoliMi
        </p>
      </div>
    </section>
  )
}
