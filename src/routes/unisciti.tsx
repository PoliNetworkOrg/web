import { createFileRoute } from "@tanstack/react-router"
import { AdminSection } from "@/components/join/admin"
import { Introduction } from "@/components/join/introduction"
import { MembershipSection } from "@/components/join/membership"
import { TeamsSection } from "@/components/join/teams"
import { CONTAINER, PAGE_HERO } from "@/components/layout/page"
import { Hero } from "@/components/ui/hero"
import { pageMeta, STATIC_PAGE_HEADERS } from "@/lib/seo"

export const Route = createFileRoute("/unisciti")({
  head: () => ({
    meta: pageMeta({
      title: "Unisciti a noi",
      description:
        "Nessuna simulazione, solo progetti reali. Scopri come entrare in PoliNetwork come admin, membro di un team operativo o socio.",
    }),
  }),
  headers: () => STATIC_PAGE_HEADERS,
  component: JoinPage,
})

function JoinPage() {
  return (
    // 5/4 of PAGE_MAIN's rhythm (96/128/180px): a long page of dense text needs more air between its sections
    <main className="flex w-full flex-col gap-30 pb-30 md:gap-40 md:pb-40 xl:gap-56.25 xl:pb-56.25">
      <section className={`${CONTAINER} ${PAGE_HERO}`}>
        <Hero
          title="Unisciti a noi"
          description="Nessuna simulazione, solo progetti reali. Scopri come fare la differenza per migliaia di studenti del PoliMi"
        />
      </section>
      <Introduction />
      <AdminSection />
      <TeamsSection />
      <MembershipSection />
    </main>
  )
}
