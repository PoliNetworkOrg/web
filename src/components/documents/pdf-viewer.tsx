"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { FiArrowLeft, FiChevronLeft, FiChevronRight, FiDownload, FiZoomIn, FiZoomOut } from "react-icons/fi"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/TextLayer.css"
import { Glass } from "@/components/glass"
import { Button } from "@/components/ui/button"
import type { DocumentItem } from "./types"
import { getDocumentFileHref, getDocumentFileName, getPdfPixelRatio } from "./utils"

pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs"
const pdfOptions = { cMapUrl: "/pdfjs/cmaps/", standardFontDataUrl: "/pdfjs/standard_fonts/", wasmUrl: "/pdfjs/wasm/" }

export default function PdfViewer({ document }: { document: DocumentItem }) {
  const [zoom, setZoom] = useState(1)
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [width, setWidth] = useState(0)
  const [pageSize, setPageSize] = useState<{ page: number; width: number; height: number } | null>(null)
  // The whole document failed to load: nothing to page or zoom through
  const [failed, setFailed] = useState(false)
  // Only the current page failed to draw: cleared when the page or zoom changes, so the controls stay usable
  const [pageError, setPageError] = useState(false)
  const viewport = useRef<HTMLElement>(null)
  const fileHref = getDocumentFileHref(document)
  const pageWidth = Math.min(width, 900) * zoom
  const pageMeasured = pageSize?.page === page

  useEffect(() => {
    const element = viewport.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setWidth(Math.max(1, entry.contentRect.width - 32))
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <Glass className="flex h-[calc(100svh-184px)] min-h-120 flex-col gap-4 rounded-rectangles border-white/50 bg-background-blur p-3 sm:h-[calc(100svh-200px)] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 basis-full items-center gap-3 sm:basis-auto">
          <Button asChild variant="glass" size="icon-lg" className="size-11">
            <Link href="/documents" aria-label="Torna ai documenti">
              <FiArrowLeft aria-hidden="true" className="size-5" />
            </Link>
          </Button>
          <h1 className="typo-body-large min-w-0 break-words">{document.title}</h1>
        </div>
        <fieldset
          aria-label="Controlli del documento"
          className="ml-auto flex items-center gap-1 rounded-buttonsL bg-background-blur p-1"
        >
          <Button
            variant="glass"
            size="icon-lg"
            className="size-11 aria-disabled:opacity-50"
            aria-label="Riduci zoom"
            disabled={!pageCount || failed}
            aria-disabled={zoom <= 0.5}
            onClick={() => {
              if (zoom <= 0.5) return
              setPageError(false)
              setZoom((value) => Math.max(0.5, value - 0.25))
            }}
          >
            <FiZoomOut aria-hidden="true" className="size-5" />
          </Button>
          <Button
            variant="glass"
            className="h-11 min-w-16"
            aria-label="Ripristina zoom al 100%"
            disabled={!pageCount || failed}
            onClick={() => {
              setPageError(false)
              setZoom(1)
            }}
          >
            {Math.round(zoom * 100)}%
          </Button>
          <Button
            variant="glass"
            size="icon-lg"
            className="size-11 aria-disabled:opacity-50"
            aria-label="Aumenta zoom"
            disabled={!pageCount || failed}
            aria-disabled={zoom >= 3}
            onClick={() => {
              if (zoom >= 3) return
              setPageError(false)
              setZoom((value) => Math.min(3, value + 0.25))
            }}
          >
            <FiZoomIn aria-hidden="true" className="size-5" />
          </Button>
          <Button asChild variant="glass" size="icon-lg" className="size-11">
            <a href={fileHref} download={getDocumentFileName(document)} aria-label={`Scarica ${document.title}`}>
              <FiDownload aria-hidden="true" className="size-5" />
            </a>
          </Button>
        </fieldset>
      </div>
      <section
        ref={viewport}
        className="min-h-0 flex-1 overflow-auto rounded-images"
        aria-label="Anteprima PDF"
        // biome-ignore lint/a11y/noNoninteractiveTabindex: Allow keyboard scrolling within the PDF viewport.
        tabIndex={0}
      >
        {width > 0 && (
          <Document
            file={fileHref}
            options={pdfOptions}
            suspense={false}
            onLoadSuccess={({ numPages }) => {
              setPageCount(numPages)
              setFailed(false)
            }}
            onLoadError={() => setFailed(true)}
            loading={<output className="typo-body-large p-4">Caricamento del PDF…</output>}
            error={
              <p role="alert" className="typo-body-large p-4">
                Impossibile visualizzare il PDF. Puoi scaricarlo con il pulsante in alto.
              </p>
            }
            className="flex min-w-full justify-start p-4"
          >
            <Page
              pageNumber={page}
              width={pageWidth}
              renderMode={pageMeasured ? "canvas" : "none"}
              devicePixelRatio={
                pageMeasured
                  ? getPdfPixelRatio(
                      pageWidth,
                      (pageWidth * pageSize.height) / pageSize.width,
                      window.devicePixelRatio || 1
                    )
                  : 1
              }
              renderAnnotationLayer={false}
              onLoadSuccess={(loadedPage) => {
                const dimensions = loadedPage.getViewport({ scale: 1 })
                setPageSize((previous) =>
                  previous?.page === page &&
                  previous.width === dimensions.width &&
                  previous.height === dimensions.height
                    ? previous
                    : { page, width: dimensions.width, height: dimensions.height }
                )
              }}
              onLoadError={() => setPageError(true)}
              onRenderError={() => setPageError(true)}
              onRenderSuccess={() => setPageError(false)}
              loading={<output className="typo-body-large p-4">Caricamento della pagina…</output>}
              error={
                <p role="alert" className="typo-body-large p-4">
                  Impossibile visualizzare questa pagina. Puoi scaricare il PDF con il pulsante in alto.
                </p>
              }
              className="mx-auto shrink-0 shadow-sm"
            />
          </Document>
        )}
      </section>
      {pageError && (
        <p role="alert" className="typo-body-medium text-center">
          Impossibile visualizzare questa pagina a questo zoom. Prova a ridurre lo zoom, cambiare pagina o scaricare il
          PDF.
        </p>
      )}
      {pageCount > 0 && !failed && (
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="glass"
            size="icon-lg"
            className="size-11 aria-disabled:opacity-50"
            aria-label="Pagina precedente"
            aria-disabled={page <= 1}
            onClick={() => {
              if (page <= 1) return
              setPageError(false)
              setPage((value) => value - 1)
              viewport.current?.scrollTo(0, 0)
            }}
          >
            <FiChevronLeft aria-hidden="true" className="size-5" />
          </Button>
          <output className="typo-body-medium">
            Pagina {page} di {pageCount}
          </output>
          <Button
            variant="glass"
            size="icon-lg"
            className="size-11 aria-disabled:opacity-50"
            aria-label="Pagina successiva"
            aria-disabled={page >= pageCount}
            onClick={() => {
              if (page >= pageCount) return
              setPageError(false)
              setPage((value) => value + 1)
              viewport.current?.scrollTo(0, 0)
            }}
          >
            <FiChevronRight aria-hidden="true" className="size-5" />
          </Button>
        </div>
      )}
    </Glass>
  )
}
