import { FiDownload, FiEye, FiFile } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { Button } from "@/components/ui/button"
import type { DocumentCategory } from "./types"

export function DocumentCategoryCard({ category }: { category: DocumentCategory }) {
  return (
    <section id={category.id} aria-labelledby={`${category.id}-title`} className="scroll-mt-36">
      <Glass className="grid gap-6 rounded-rectangles border-white/50 bg-background-blur p-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14">
        <div className="flex flex-col gap-3">
          <h2 id={`${category.id}-title`} className="typo-headline-medium sm:typo-display-small text-text-primary">
            {category.title}
          </h2>
          <p className="typo-body-large max-w-65 text-text-secondary">{category.description}</p>
        </div>
        <ul className="flex min-w-0 flex-col gap-2.5">
          {category.documents.map((document) => (
            <li key={document.href} className="flex items-center justify-between gap-3 border-grey border-b p-2">
              <div className="flex min-w-0 items-start gap-3 sm:gap-6">
                <FiFile aria-hidden="true" className="mt-1 size-6 shrink-0 text-text-primary" />
                <div className="min-w-0">
                  <p className="typo-body-large break-words text-text-primary">{document.title}</p>
                  {document.description && (
                    <p className="typo-body-medium text-text-secondary">{document.description}</p>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-1 sm:flex-row sm:gap-2">
                <Button
                  asChild
                  variant="glass"
                  size="icon-lg"
                  className="size-11 bg-transparent hover:bg-blue-tertiary/30"
                >
                  <a
                    href={document.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visualizza ${document.title} (PDF dimostrativo, nuova scheda)`}
                  >
                    <FiEye aria-hidden="true" className="size-6" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="glass"
                  size="icon-lg"
                  className="size-11 bg-transparent hover:bg-blue-tertiary/30"
                >
                  <a href={document.href} download aria-label={`Scarica ${document.title} (PDF dimostrativo)`}>
                    <FiDownload aria-hidden="true" className="size-6" />
                  </a>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Glass>
    </section>
  )
}
