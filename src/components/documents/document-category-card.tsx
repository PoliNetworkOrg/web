import Link from "next/link"
import { FiDownload, FiEye, FiFile } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { Button } from "@/components/ui/button"
import type { DocumentCategory } from "./types"
import {
  getCategoryAnchor,
  getCategoryHeadingId,
  getDocumentFileHref,
  getDocumentFileName,
  getDocumentViewerHref,
} from "./utils"

// Dates are plain YYYY-MM-DD (UTC midnight): format them in UTC so no server timezone shifts the day
const dateFormat = new Intl.DateTimeFormat("it-IT", { dateStyle: "long", timeZone: "UTC" })

function formatDate(date: string) {
  return dateFormat.format(new Date(date))
}

export function DocumentCategoryCard({ category }: { category: DocumentCategory }) {
  const anchor = getCategoryAnchor(category.id)
  const headingId = getCategoryHeadingId(category.id)
  return (
    <section id={anchor} aria-labelledby={headingId} className="scroll-mt-36">
      <Glass className="grid min-w-0 gap-6 hyphens-auto break-words rounded-rectangles border-white/50 bg-background-blur p-4 sm:p-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14">
        <div className="flex min-w-0 flex-col gap-3">
          <h2 id={headingId} className="typo-headline-medium sm:typo-display-small text-text-primary">
            {category.title}
          </h2>
          <p className="typo-body-large max-w-65 text-text-secondary">{category.description}</p>
        </div>
        <ul className="flex min-w-0 flex-col gap-2.5">
          {category.documents.map((document) => (
            <li
              key={document.slug}
              className="flex flex-col gap-2 border-grey border-b py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:p-2"
            >
              <div className="flex min-w-0 items-start gap-3 sm:gap-6">
                <FiFile aria-hidden="true" className="mt-1 size-6 shrink-0 text-text-primary" />
                <div className="min-w-0">
                  <p className="typo-body-large text-text-primary">{document.title}</p>
                  {document.description && (
                    <p className="typo-body-medium text-text-secondary">{document.description}</p>
                  )}
                  {document.version && document.date && (
                    <p className="typo-body-small text-text-secondary">
                      Versione {document.version} · aggiornato il {formatDate(document.date)}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 gap-2 pl-9 sm:pl-0">
                <Button
                  asChild
                  variant="glass"
                  size="icon-lg"
                  className="size-11 bg-transparent hover:bg-blue-tertiary/30"
                >
                  <Link href={getDocumentViewerHref(document)} aria-label={`Visualizza ${document.title}`}>
                    <FiEye aria-hidden="true" className="size-6" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="glass"
                  size="icon-lg"
                  className="size-11 bg-transparent hover:bg-blue-tertiary/30"
                >
                  <a
                    href={getDocumentFileHref(document)}
                    download={getDocumentFileName(document)}
                    aria-label={`Scarica ${document.title}`}
                  >
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
