import type { Metadata } from "next"
import { sectionContainerClass } from "@/components/collabora/section"
import { AdminSection } from "@/components/join/admin"
import { Introduction } from "@/components/join/introduction"
import { MembershipSection } from "@/components/join/membership"
import { TeamsSection } from "@/components/join/teams"
import { Hero } from "@/components/ui/hero"
import { cn } from "@/lib/utils"
import { JoinPhotoShapes, JoinShapes } from "./shapes"

export const metadata: Metadata = {
  title: "Unisciti a noi",
  description:
    "Nessuna simulazione, solo progetti reali. Scopri come entrare in PoliNetwork come admin, membro di un team operativo o socio.",
}

export default function JoinPage() {
  return (
    <main className="flex w-full flex-col gap-24 pb-32 md:gap-36 md:pb-48">
      <div className="relative">
        <JoinShapes section="hero" />
        <section className={cn(sectionContainerClass, "pt-52 md:pt-57.5")}>
          <Hero
            title="Unisciti a Noi"
            description="Nessuna simulazione, solo progetti reali. Scopri come fare la differenza per migliaia di studenti del PoliMi"
            gradientDescription
          />
        </section>
      </div>
      <div className="relative">
        <JoinShapes section="intro" />
        <Introduction />
      </div>
      <div className="relative">
        <JoinShapes section="admin" />
        <AdminSection />
      </div>
      <div className="relative">
        <JoinShapes section="team" />
        <TeamsSection />
      </div>
      <div className="relative">
        <JoinShapes section="membership" />
        <MembershipSection photoDecorations={<JoinPhotoShapes />} />
      </div>
    </main>
  )
}
