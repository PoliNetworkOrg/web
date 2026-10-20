import type { Metadata } from "next"
import { AdminSection } from "@/components/join/admin"
import { Introduction } from "@/components/join/introduction"
import { MembershipSection } from "@/components/join/membership"
import { TeamsSection } from "@/components/join/teams"
import { Hero } from "@/components/ui/hero"

export const metadata: Metadata = {
  title: "Unisciti a noi",
  description:
    "Nessuna simulazione, solo progetti reali. Scopri come entrare in PoliNetwork come admin, membro di un team operativo o socio.",
}

export default function JoinPage() {
  return (
    <main className="flex w-full flex-col gap-24 pb-32 md:gap-36 md:pb-48">
      <section className={"mx-auto w-full max-w-330 px-6 pt-52 md:pt-57.5"}>
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
