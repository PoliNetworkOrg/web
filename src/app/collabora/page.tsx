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
    <main className="relative mx-auto flex min-h-screen w-full max-w-700 flex-col items-center justify-center gap-60 px-4 py-49 md:gap-38">
      {/* This page is broken on mobile */}
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
