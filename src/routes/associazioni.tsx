import { createFileRoute } from "@tanstack/react-router"
import { AssociationsList } from "@/components/associations/associations-list"
import { CONTAINER, PAGE_HERO, PAGE_MAIN } from "@/components/layout/page"
import { Hero } from "@/components/ui/hero"
import { pageMeta } from "@/lib/seo"
import { fetchAssociations } from "@/queries/functions"

export const Route = createFileRoute("/associazioni")({
  loader: () => fetchAssociations(),
  head: () => ({
    meta: pageMeta({ title: "Associazioni", description: "Scopri le associazioni studentesche del Politecnico" }),
  }),
  component: AssociationsPage,
})

function AssociationsPage() {
  const associations = Route.useLoaderData()

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
