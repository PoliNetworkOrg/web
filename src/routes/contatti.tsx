import { createFileRoute } from "@tanstack/react-router"
import { CollaboraSection } from "@/components/contact/collabora-section"
import { EmailSection } from "@/components/contact/email-section"
import { GroupsSection } from "@/components/contact/groups-section"
import { CONTAINER, PAGE_HERO, PAGE_MAIN } from "@/components/layout/page"
import { Hero } from "@/components/ui/hero"
import { pageMeta, STATIC_PAGE_HEADERS } from "@/lib/seo"

export const Route = createFileRoute("/contatti")({
  head: () => ({
    meta: pageMeta({
      title: "Contatti",
      description: "Contatta PoliNetwork o trova il gruppo del tuo corso al Politecnico di Milano.",
    }),
  }),
  headers: () => STATIC_PAGE_HEADERS,
  component: Contact,
})

function Contact() {
  return (
    <main className={PAGE_MAIN}>
      <section className={`${CONTAINER} ${PAGE_HERO}`}>
        <Hero title="Contatti" description="Qualunque sia la tua domanda, PoliNetwork è a disposizione." />
      </section>
      <GroupsSection />
      <CollaboraSection />
      <EmailSection />
    </main>
  )
}
