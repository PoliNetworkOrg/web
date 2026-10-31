import type { Metadata } from "next"
import { CollaboraSection } from "@/components/contact/collabora-section"
import { EmailSection } from "@/components/contact/email-section"
import { GroupsSection } from "@/components/contact/groups-section"
import { CONTAINER, PAGE_HERO, PAGE_MAIN } from "@/components/layout/page"
import { Hero } from "@/components/ui/hero"

export const metadata: Metadata = {
  title: "Contattaci",
  description: "Contatta PoliNetwork o trova il gruppo del tuo corso al Politecnico di Milano.",
}

export default function Contact() {
  return (
    <main className={PAGE_MAIN}>
      <section className={`${CONTAINER} ${PAGE_HERO}`}>
        <Hero
          title="Contattaci"
          description="Qualunque sia la tua domanda, PoliNetwork è a disposizione."
          gradientDescription
        />
      </section>
      <GroupsSection />
      <CollaboraSection />
      <EmailSection />
    </main>
  )
}
