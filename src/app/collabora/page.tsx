import type { Metadata } from "next"
import { AboutSection } from "@/components/collabora/about-section"
import { AssociationSection } from "@/components/collabora/association-section"
import { CollaborationSection } from "@/components/collabora/collaboration-section"
import { CompanySection } from "@/components/collabora/company-section"
import { ContactSection } from "@/components/collabora/contact-section"
import { Hero } from "@/components/ui/hero"
import {
  CollaboraAboutShapes,
  CollaboraAssociationShapes,
  CollaboraCollaborationShapes,
  CollaboraCompanyShapes,
  CollaboraContactShapes,
  CollaboraHeroShapes,
} from "./shapes"

export const metadata: Metadata = {
  title: "Collabora con Noi",
  description:
    "Mettiamo la nostra infrastruttura e i nostri talenti a disposizione di chi ha buone idee per gli studenti del PoliMi",
}

export default function CollaboraPage() {
  return (
    <main className="page-layout relative flex flex-col items-center gap-section">
      <CollaboraHeroShapes />
      <Hero
        title="Collabora con Noi"
        description="Mettiamo la nostra infrastruttura e i nostri talenti a disposizione di chi ha buone idee per gli studenti del PoliMi"
        gradientDescription
      />

      <div className="relative w-full">
        <CollaboraAboutShapes />
        <AboutSection />
      </div>
      <div className="relative w-full">
        <CollaboraCollaborationShapes />
        <CollaborationSection />
      </div>
      <div className="relative w-full">
        <CollaboraAssociationShapes />
        <AssociationSection />
      </div>
      <div className="relative w-full">
        <CollaboraCompanyShapes />
        <CompanySection />
      </div>
      <div className="relative w-full">
        <CollaboraContactShapes />
        <ContactSection />
      </div>
    </main>
  )
}
