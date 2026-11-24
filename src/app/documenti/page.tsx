import type { Metadata } from "next"
import { DocumentCategoryCard } from "@/components/documents/document-category-card"
import { DocumentCategoryNav } from "@/components/documents/document-category-nav"
import { CONTAINER, EMPTY_STATE, PAGE_HERO_TOP } from "@/components/layout/page"
import { Hero } from "@/components/ui/hero"
import { getDocumentCatalog } from "@/queries/documents"

export const metadata: Metadata = {
  title: "Documenti",
  description: "Tutti i documenti che cerchi, in un unico posto.",
}

// Uploaded from the admin dashboard: read from the backend at request time, like /progetti
export const dynamic = "force-dynamic"

export default async function DocumentsPage() {
  const { categories, backendUnavailable } = await getDocumentCatalog()

  return (
    // One block from the hero to the list: Figma leaves 156px under the description (136px on phones), less than the
    // gap between the sections of the other pages, and nothing else sits on the page
    <main className="flex w-full flex-col pb-24 md:pb-32 xl:pb-45">
      <section className={`${CONTAINER} ${PAGE_HERO_TOP} pb-34 md:pb-39`}>
        <Hero title="Documenti" description="Tutti i documenti che cerchi, in un unico posto." />
      </section>

      <div className={`${CONTAINER} flex min-w-0 flex-col gap-6`}>
        {categories.length > 0 ? (
          <>
            <DocumentCategoryNav categories={categories.map(({ id, title }) => ({ id, title }))} />
            {categories.map((category) => (
              <DocumentCategoryCard key={category.id} category={category} />
            ))}
          </>
        ) : (
          // Only what admin published is listed: say why the list is empty instead of showing stand-ins
          <p className={EMPTY_STATE}>
            {backendUnavailable
              ? "I documenti non sono disponibili al momento. Riprova più tardi."
              : "Non ci sono ancora documenti pubblicati."}
          </p>
        )}
      </div>
    </main>
  )
}
