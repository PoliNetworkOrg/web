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

export function DocumentCategoryCard({ category }: { category: DocumentCategory }) {
  const anchor = getCategoryAnchor(category.id)
  const headingId = getCategoryHeadingId(category.id)
  return (
    <section id={anchor} aria-labelledby={headingId} className="scroll-mt-36">
      <Glass className="grid min-w-0 gap-8 hyphens-auto break-words rounded-rectangles border-white/50 bg-background-blur p-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14">
        <div className="flex min-w-0 flex-col gap-3">
          <h2 id={headingId} className="typo-headline-medium sm:typo-display-small text-text-primary">
            {category.title}
          </h2>
          {/* Like the documents' descriptions, it is left out when admin leaves it empty */}
          {category.description.trim() && (
            <p className="typo-body-large max-w-65 text-text-secondary">{category.description}</p>
          )}
        </div>
        <ul className="flex min-w-0 flex-col gap-2.5">
          {category.documents.map((document) => (
            <li
              key={document.slug}
              // Figma: title above the actions on phones, one row from sm; 8px padding and 16px between the icons. On phones
              // the last row has no line under it: the card's edge closes the list
              className="flex flex-col gap-3 border-grey border-b p-2 max-sm:last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-start gap-6">
                <FiFile aria-hidden="true" className="size-6 shrink-0 text-text-primary" />
                {/* Title and, when admin wrote one, the description: never the version or the upload date */}
                <div className="min-w-0">
                  <p className="typo-body-large text-text-primary">{document.title}</p>
                  {document.description?.trim() && (
                    <p className="typo-body-medium text-text-secondary">{document.description}</p>
                  )}
                </div>
              </div>
              {/* 40px targets around 24px icons: the icons sit 16px apart and line up with the row's padding */}
              <div className="-m-2 flex shrink-0 justify-end">
                <Button
                  asChild
                  variant="glass"
                  size="icon-lg"
                  className="hover:glass-glow size-10 bg-transparent backdrop-blur-none"
                >
                  <Link href={getDocumentViewerHref(document)} aria-label={`Visualizza ${document.title}`}>
                    <FiEye aria-hidden="true" className="size-6" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="glass"
                  size="icon-lg"
                  className="hover:glass-glow size-10 bg-transparent backdrop-blur-none"
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
