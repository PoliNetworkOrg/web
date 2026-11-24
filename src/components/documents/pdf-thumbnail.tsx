import { useEffect, useRef, useState } from "react"
import type { DocumentProps } from "react-pdf"
import { Page } from "react-pdf"
import { cn } from "@/lib/utils"

type PDFDocumentProxy = Parameters<NonNullable<DocumentProps["onLoadSuccess"]>>[0]

export function PdfThumbnail({
  pdf,
  number,
  selected,
  onSelect,
}: {
  pdf: PDFDocumentProxy
  number: number
  selected: boolean
  onSelect: (page: number) => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => setVisible(!!entry?.isIntersecting), {
      root: element.closest("aside"),
      rootMargin: "160px",
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (!selected || !ref.current) return
    const element = ref.current
    const parent = element.closest("aside")
    if (!parent) return
    const top = element.offsetTop - parent.offsetTop
    if (top < parent.scrollTop || top + element.offsetHeight > parent.scrollTop + parent.clientHeight)
      parent.scrollTop = Math.max(0, top - 64)
  }, [selected])
  return (
    <button
      ref={ref}
      type="button"
      aria-label={`Vai a pagina ${number}`}
      aria-current={selected ? "page" : undefined}
      onClick={() => onSelect(number)}
      className="mx-auto flex shrink-0 flex-col items-center gap-1 rounded p-1 focus-visible:outline-2"
    >
      <span
        className={cn(
          "block min-h-34 w-24 overflow-hidden rounded border-2 bg-white shadow-sm",
          selected ? "border-text-secondary" : "border-transparent"
        )}
      >
        {visible && (
          <Page
            pdf={pdf}
            suspense={false}
            pageNumber={number}
            width={92}
            devicePixelRatio={1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            loading=""
            error={<span className="text-slate-900 text-sm">Anteprima non disponibile</span>}
          />
        )}
      </span>
      <span className="typo-body-medium">{number}</span>
    </button>
  )
}
