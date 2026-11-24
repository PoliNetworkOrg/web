import { createFileRoute } from "@tanstack/react-router"
import { AboutSection } from "@/components/collabora/about-section"
import { AssociationSection } from "@/components/collabora/association-section"
import { CollaborationSection } from "@/components/collabora/collaboration-section"
import { CompanySection } from "@/components/collabora/company-section"
import { ContactSection } from "@/components/collabora/contact-section"
import { PhotoSlider } from "@/components/collabora/photo-slider"
import { CONTAINER, PAGE_HERO, PAGE_MAIN } from "@/components/layout/page"
import { Hero } from "@/components/ui/hero"
import { pageMeta, STATIC_PAGE_HEADERS } from "@/lib/seo"

export const Route = createFileRoute("/collabora")({
  head: () => ({
    meta: pageMeta({
      title: "Collabora con noi",
      description:
        "Mettiamo la nostra infrastruttura e i nostri talenti a disposizione di chi ha buone idee per gli studenti del PoliMi",
    }),
  }),
  headers: () => STATIC_PAGE_HEADERS,
  component: CollaboraPage,
})

function CollaboraPage() {
  return (
    <main className={PAGE_MAIN}>
      <section className={`${CONTAINER} ${PAGE_HERO}`}>
        <Hero
          title="Collabora con noi"
          description="Mettiamo la nostra infrastruttura e i nostri talenti a disposizione di chi ha buone idee per gli studenti del PoliMi"
        />
      </section>
      <AboutSection />
      <CollaborationSection />
      <AssociationSection />
      <CompanySection />
      <PhotoSlider />
      <ContactSection />
    </main>
  )
}
