import { FiBook, FiBookOpen, FiHeadphones, FiSend, FiUser, FiUsers } from "react-icons/fi"
import { GradientIcon } from "@/components/gradient-icon"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
      <div className="flex flex-col gap-4">
        <h2 className="typo-headline-medium md:typo-display-medium bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
          I numeri
        </h2>
        <p className="typo-body-large sm:typo-headline-extrasmall max-w-160 text-pretty">
          Un network in continua crescita, costruito dagli studenti, per gli studenti.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="h-auto w-full gap-4 p-6 sm:p-8">
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <CardTitle
                  gradient={false}
                  className="typo-display-small sm:typo-display-medium text-blue-secondary tabular-nums"
                >
                  {stat.value}
                </CardTitle>
                <GradientIcon icon={stat.icon} className="size-8 shrink-0" />
              </CardHeader>
              <CardContent className="typo-body-large text-pretty">{stat.label}</CardContent>
            </Card>
          ))}
        </div>

        <p className="typo-body-large text-center">
          Dal <span className="text-blue-secondary">2016</span> al fianco degli studenti del PoliMi
        </p>
      </div>
    </section>
  )
}
