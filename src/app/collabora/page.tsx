import type { Metadata } from "next"
import { AboutSection } from "@/components/collabora/about-section"
import { AssociationSection } from "@/components/collabora/association-section"
import { CollaborationSection } from "@/components/collabora/collaboration-section"
import { CompanySection } from "@/components/collabora/company-section"
import { ContactSection } from "@/components/collabora/contact-section"
import { CONTAINER, PAGE_HERO, PAGE_MAIN } from "@/components/layout/page"
import { Hero } from "@/components/ui/hero"

export const metadata: Metadata = {
  title: "Collabora con Noi",
  description:
    "Mettiamo la nostra infrastruttura e i nostri talenti a disposizione di chi ha buone idee per gli studenti del PoliMi",
}

export default function CollaboraPage() {
  return (
    <main className={PAGE_MAIN}>
      <section className={`${CONTAINER} ${PAGE_HERO}`}>
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
