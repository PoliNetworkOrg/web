import type { Metadata } from "next"
import { DocumentCategoryCard } from "@/components/documents/document-category-card"
import { mockDocumentCategories } from "@/components/documents/mock-data"
import { Hero } from "@/components/ui/hero"

export const metadata: Metadata = {
  title: "Documenti",
  description: "Tutti i documenti che cerchi, in un unico posto.",
}

export default function DocumentsPage() {
  return (
    <main className="mx-auto flex w-full max-w-432 flex-col gap-16 px-6 pt-36 pb-24 text-text-primary sm:px-10 sm:pt-35 lg:px-20 xl:gap-39 xl:px-36 xl:pb-49">
      <Hero
        title="Documenti"
        description="Tutti i documenti che cerchi, in un unico posto."
        titleClassName="typo-display-medium sm:typo-display-extralarge"
      />
      <div className="flex min-w-0 flex-col gap-6">
        <nav aria-label="Categorie dei documenti" className="overflow-x-auto border-grey border-b">
          <ul className="flex w-max gap-6 px-3 sm:gap-16">
            {mockDocumentCategories.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${category.id}`}
                  className="typo-body-large inline-block rounded-images py-3 text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-blue-primary focus-visible:outline-offset-[-2px]"
                >
                  {category.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="typo-body-small text-text-secondary">
          Anteprima dimostrativa: tutti i PDF presenti sono esempi e non sono documenti ufficiali.
        </p>
        {mockDocumentCategories.map((category) => (
          <DocumentCategoryCard key={category.id} category={category} />
        ))}
      </div>
    </main>
  )
}
