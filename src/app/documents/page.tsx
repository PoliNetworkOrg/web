import type { Metadata } from "next"
import { DocumentCategoryCard } from "@/components/documents/document-category-card"
import { getCategoryAnchor } from "@/components/documents/utils"
import { CONTAINER, PAGE_HERO, PAGE_MAIN } from "@/components/layout/page"
import { Hero } from "@/components/ui/hero"
import { getDocumentCategories } from "@/queries/documents"

export const metadata: Metadata = {
  title: "Documenti",
  description: "Tutti i documenti che cerchi, in un unico posto.",
}

// Uploaded from the admin dashboard: read from the backend at request time, like /projects
export const dynamic = "force-dynamic"

export default async function DocumentsPage() {
  const categories = await getDocumentCategories()

  return (
    <main className={PAGE_MAIN}>
      <section className={`${CONTAINER} ${PAGE_HERO}`}>
        <Hero title="Documenti" description="Tutti i documenti che cerchi, in un unico posto." />
      </section>

      <div className={`${CONTAINER} flex min-w-0 flex-col gap-6`}>
        <nav aria-label="Categorie dei documenti" className="overflow-x-auto border-grey border-b">
          <ul className="flex w-max gap-6 px-3 sm:gap-16">
            {categories.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${getCategoryAnchor(category.id)}`}
                  className="typo-body-large inline-block rounded-images py-3 text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-blue-primary focus-visible:outline-offset-[-2px]"
                >
                  {category.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {categories.map((category) => (
          <DocumentCategoryCard key={category.id} category={category} />
        ))}
      </div>
    </main>
  )
}
