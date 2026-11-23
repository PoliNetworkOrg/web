import type { Metadata } from "next"
import { AssociationsList } from "@/components/associations/associations-list"
import { CONTAINER, PAGE_HERO, PAGE_MAIN } from "@/components/layout/page"
import { Hero } from "@/components/ui/hero"
import { getAllAssociations } from "@/queries/associations"

export const metadata: Metadata = {
  title: "Associazioni",
  description: "Scopri le associazioni studentesche del Politecnico",
}

export const dynamic = "force-dynamic"

export default async function AssociationsPage() {
  const associations = await getAllAssociations()

  return (
    <main className={PAGE_MAIN}>
      <section className={`${CONTAINER} ${PAGE_HERO}`}>
        <Hero title="Associazioni" description="Scopri le associazioni studentesche del Politecnico" />
      </section>

      {/* Figma's list column: 1200px at 1728 */}
      <section aria-label="Elenco delle associazioni" className={CONTAINER}>
        <div className="mx-auto w-full max-w-300">
          <AssociationsList associations={associations} />
        </div>
      </section>
    </main>
  )
}
