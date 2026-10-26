import type { Metadata } from "next"
import { AboutSection } from "@/components/collabora/about-section"
import { AssociationSection } from "@/components/collabora/association-section"
import { CollaborationSection } from "@/components/collabora/collaboration-section"
import { CompanySection } from "@/components/collabora/company-section"
import { ContactSection } from "@/components/collabora/contact-section"
import { sectionContainerClass } from "@/components/collabora/section"
import { Hero } from "@/components/ui/hero"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Collabora con Noi",
  description:
    "Mettiamo la nostra infrastruttura e i nostri talenti a disposizione di chi ha buone idee per gli studenti del PoliMi",
}

export default function CollaboraPage() {
  return (
    <main className="flex w-full flex-col">
      {/* Title at y=262 (mobile) / 286 (desktop) as in Figma; Hero adds 16px / 56px above it */}
      <section className={cn(sectionContainerClass, "pt-61.5 pb-29 sm:pt-57.5 md:pb-64.5")}>
        <Hero
          title="Collabora con Noi"
          description="Mettiamo la nostra infrastruttura e i nostri talenti a disposizione di chi ha buone idee per gli studenti del PoliMi"
          gradientDescription
        />
      </section>
      <AboutSection />
      <CollaborationSection />
      <AssociationSection />
      <CompanySection />
      <ContactSection />
    </main>
  )
}
