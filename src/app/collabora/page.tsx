import type { Metadata } from "next"
import { AboutSection } from "@/components/collabora/about-section"
import { AssociationSection } from "@/components/collabora/association-section"
import { CollaborationSection } from "@/components/collabora/collaboration-section"
import { Hero } from "@/components/ui/hero"

export const metadata: Metadata = {
  title: "Collabora con Noi",
  description:
    "Mettiamo la nostra infrastruttura e i nostri talenti a disposizione di chi ha buone idee per gli studenti del PoliMi",
}

export default function CollaboraPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-700 flex-col items-center justify-center gap-20 px-4 py-49 md:gap-38">
      <Hero
        title="Collabora con Noi"
        description="Mettiamo la nostra infrastruttura e i nostri talenti a disposizione di chi ha buone idee per gli studenti del PoliMi"
        gradientDescription
      />

      <AboutSection />
      <CollaborationSection />
      <AssociationSection />
    </main>
  )
}
