import type { Metadata } from "next"
import { CollaboraSection } from "@/components/contact/collabora-section"
import { EmailSection } from "@/components/contact/email-section"
import { GroupsSection } from "@/components/contact/groups-section"
import { Hero } from "@/components/ui/hero"

export const metadata: Metadata = {
  title: "Contattaci",
  description: "Contatta PoliNetwork o trova il gruppo del tuo corso al Politecnico di Milano.",
}

export default function Contact() {
  return (
    <main className="mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-60 px-4 py-49 md:gap-75">
      <Hero
        title="Contattaci"
        description="Qualunque sia la tua domanda, PoliNetwork è a disposizione."
        gradientDescription
      />
      <GroupsSection />
      <CollaboraSection />
      <EmailSection />
    </main>
  )
}
