import type { Metadata } from "next"
import { AdminSection } from "@/components/join/admin"
import { Introduction } from "@/components/join/introduction"
import { MembershipSection } from "@/components/join/membership"
import { TeamsSection } from "@/components/join/teams"
import { CONTAINER, PAGE_HERO, PAGE_MAIN } from "@/components/layout/page"
import { Hero } from "@/components/ui/hero"

export const metadata: Metadata = {
  title: "Unisciti a noi",
  description:
    "Nessuna simulazione, solo progetti reali. Scopri come entrare in PoliNetwork come admin, membro di un team operativo o socio.",
}

export default function JoinPage() {
  return (
    <main className={PAGE_MAIN}>
      <section className={`${CONTAINER} ${PAGE_HERO}`}>
        <Hero
          title="Unisciti a Noi"
          description="Nessuna simulazione, solo progetti reali. Scopri come fare la differenza per migliaia di studenti del PoliMi"
          gradientDescription
        />
      </section>
      <Introduction />
      <AdminSection />
      <TeamsSection />
      <MembershipSection />
    </main>
  )
}
