"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import {
  FiArrowLeft,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiFile,
  FiMaximize,
  FiSearch,
  FiSidebar,
  FiZoomIn,
  FiZoomOut,
} from "react-icons/fi"
import type { DocumentProps } from "react-pdf"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"
import { Glass } from "@/components/glass"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { highlightPdfText } from "./pdf-search"
import { PdfThumbnail } from "./pdf-thumbnail"
import type { DocumentItem } from "./types"
import { getDocumentFileHref, getDocumentFileName, getPdfPixelRatio } from "./utils"

pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs"
const pdfOptions = { cMapUrl: "/pdfjs/cmaps/", standardFontDataUrl: "/pdfjs/standard_fonts/", wasmUrl: "/pdfjs/wasm/" }
type PDFDocumentProxy = Parameters<NonNullable<DocumentProps["onLoadSuccess"]>>[0]
type Fit = "actual" | "width" | "height"

export default function PdfViewer({ document }: { document: DocumentItem }) {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null)
  const [zoom, setZoom] = useState(1)
  const [fit, setFit] = useState<Fit>("width")
  const [page, setPage] = useState(1)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [pageSize, setPageSize] = useState<{ page: number; width: number; height: number } | null>(null)
  const [failed, setFailed] = useState(false)
  const [pageError, setPageError] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const [query, setQuery] = useState("")
  const [searched, setSearched] = useState("")
  const [matches, setMatches] = useState<number[]>([])
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState(false)
  const searchRun = useRef(0)
  const viewport = useRef<HTMLElement>(null)
  const fileHref = getDocumentFileHref(document)
  const pageCount = pdf?.numPages ?? 0
  const ready = pageCount > 0 && !failed
  const pageMeasured = pageSize?.page === page
  const baseWidth =
    fit === "actual"
      ? (pageSize?.width ?? size.width)
      : fit === "height" && pageSize
        ? Math.min(size.width, (size.height * pageSize.width) / pageSize.height)
        : size.width
  const pageWidth = Math.max(1, baseWidth * zoom)
  const scale = pageSize ? pageWidth / pageSize.width : 1
  const controlClass = "size-11 lg:size-14"

  useEffect(() => {
    const element = viewport.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => {
      if (entry)
        setSize({
          width: Math.max(1, entry.contentRect.width - 32),
          height: Math.max(1, entry.contentRect.height - 48),
        })
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(
    () => () => {
      searchRun.current += 1
    },
    []
  )

  function goToPage(next: number) {
    if (next < 1 || next > pageCount) return
    setPageError(false)
    setPage(next)
    viewport.current?.scrollTo(0, 0)
  }

  function changeFit(next: Fit) {
    setFit(next)
    setZoom(1)
    setPageError(false)
    viewport.current?.scrollTo(0, 0)
  }

  async function search() {
    if (!pdf) return
    const run = ++searchRun.current
    const term = query.trim()
    setSearched(term)
    setMatches([])
    setSearchError(false)
    setSearching(!!term)
    if (!term) return
    try {
      const found: number[] = []
      for (let number = 1; number <= pdf.numPages; number++) {
        const loaded = await pdf.getPage(number)
        if (run !== searchRun.current) return
        const content = await loaded.getTextContent()
        if (run !== searchRun.current) return
        const text = content.items.map((item) => ("str" in item ? item.str + (item.hasEOL ? "\n" : "") : "")).join("")
        if (text.toLocaleLowerCase().includes(term.toLocaleLowerCase())) found.push(number)
      }
      setMatches(found)
      if (found[0]) goToPage(found[0])
    } catch {
      if (run === searchRun.current) setSearchError(true)
    } finally {
      if (run === searchRun.current) setSearching(false)
    }
  }

  const matchIndex = matches.indexOf(page)
  function nextMatch(direction: number) {
    const index =
      matchIndex < 0
        ? direction > 0
          ? 0
          : matches.length - 1
        : (matchIndex + direction + matches.length) % matches.length
    if (matches[index]) goToPage(matches[index])
  }

  return (
    <Glass className="flex h-[calc(100svh-136px)] min-h-120 flex-col gap-4 overflow-hidden rounded-rectangles border-white/50 bg-background-blur p-2 sm:h-[calc(100svh-200px)] sm:gap-6 sm:p-6 lg:p-8 lg:pb-0">
      <div className="flex flex-wrap items-center justify-between gap-3 lg:gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-2 lg:gap-4">
          <Button asChild variant="glass" size="icon-lg" className={controlClass}>
            <Link href="/documenti" aria-label="Torna ai documenti">
              <FiArrowLeft aria-hidden="true" className="size-6" />
            </Link>
          </Button>
          <h1
            title={document.title}
            className="typo-title-medium flex min-w-0 items-center gap-4 rounded-buttonsL bg-background-blur p-3 lg:p-4"
          >
            <FiFile aria-hidden="true" className="hidden size-6 shrink-0 sm:block" />
            <span className="truncate">{document.title}</span>
          </h1>
        </div>
        <Button
          variant="glass"
          size="icon-lg"
          className="size-11 lg:hidden"
          aria-label="Miniature delle pagine"
          aria-expanded={sidebar}
          aria-controls="pdf-pages"
          onClick={() => setSidebar(!sidebar)}
        >
          <FiSidebar aria-hidden="true" className="size-5" />
        </Button>
        <div className="flex items-center gap-2 lg:gap-4">
          <fieldset
            aria-label="Adattamento della pagina"
            disabled={!ready}
            className="hidden items-center rounded-buttonsL bg-background-blur sm:flex"
          >
            <Button
              variant="glass"
              size="icon-lg"
              className={cn(controlClass, "bg-transparent aria-pressed:bg-background-blur")}
              title="Dimensione reale"
              aria-label="Dimensione reale"
              aria-pressed={fit === "actual"}
              onClick={() => changeFit("actual")}
            >
              <span className="relative">
                <FiMaximize aria-hidden="true" className="size-6" />
                <span className="absolute inset-0 flex items-center justify-center text-[9px]">1:1</span>
              </span>
            </Button>
            <Button
              variant="glass"
              size="icon-lg"
              className={cn(controlClass, "bg-transparent aria-pressed:bg-background-blur")}
              title="Adatta alla larghezza"
              aria-label="Adatta alla larghezza"
              aria-pressed={fit === "width"}
              onClick={() => changeFit("width")}
            >
              {/* biome-ignore lint/performance/noImgElement: Local 24px Figma SVG icon. */}
              <img src="/icons/pdf/fit-width.svg" alt="" />
            </Button>
            <Button
              variant="glass"
              size="icon-lg"
              className={cn(controlClass, "bg-transparent aria-pressed:bg-background-blur")}
              title="Adatta alla pagina"
              aria-label="Adatta alla pagina"
              aria-pressed={fit === "height"}
              onClick={() => changeFit("height")}
            >
              {/* biome-ignore lint/performance/noImgElement: Local 24px Figma SVG icon. */}
              <img src="/icons/pdf/fit-height.svg" alt="" />
            </Button>
          </fieldset>
          <fieldset
            aria-label="Zoom"
            disabled={!ready}
            className="flex items-center rounded-buttonsL bg-background-blur"
          >
            <Button
              variant="glass"
              size="icon-lg"
              className={cn(controlClass, "bg-transparent")}
              aria-label="Aumenta zoom"
              disabled={zoom >= 3}
              onClick={() => {
                setZoom(Math.min(3, zoom + 0.25))
                setPageError(false)
              }}
            >
              <FiZoomIn aria-hidden="true" className="size-6" />
            </Button>
            <Button
              variant="glass"
              className="h-11 bg-transparent px-1 tabular-nums lg:h-14"
              aria-label="Ripristina lo zoom"
              onClick={() => {
                setZoom(1)
                setPageError(false)
              }}
            >
              {Math.round(scale * 100)}%
            </Button>
            <Button
              variant="glass"
              size="icon-lg"
              className={cn(controlClass, "bg-transparent")}
              aria-label="Riduci zoom"
              disabled={zoom <= 0.25}
              onClick={() => {
                setZoom(Math.max(0.25, zoom - 0.25))
                setPageError(false)
              }}
            >
              <FiZoomOut aria-hidden="true" className="size-6" />
            </Button>
          </fieldset>
        </div>
        <select
          aria-label="Adattamento della pagina"
          value={fit}
          disabled={!ready}
          onChange={(event) => changeFit(event.target.value as Fit)}
          className="h-11 min-w-0 rounded-buttonsL bg-background-blur px-3 text-base focus-visible:outline-2 sm:hidden"
        >
          <option value="actual">Dimensione reale</option>
          <option value="width">Adatta alla larghezza</option>
          <option value="height">Adatta alla pagina</option>
        </select>
        <form
          className="relative flex min-w-40 flex-1 items-center gap-1 rounded-buttonsL bg-background-blur lg:max-w-64"
          onSubmit={(event) => {
            event.preventDefault()
            void search()
          }}
        >
          <FiSearch aria-hidden="true" className="pointer-events-none absolute left-4 size-5" />
          <input
            aria-label="Cerca nel documento"
            type="search"
            value={query}
            disabled={!ready}
            onChange={(event) => {
              setQuery(event.target.value)
              searchRun.current += 1
              setSearching(false)
              setSearched("")
              setMatches([])
              setSearchError(false)
            }}
            placeholder="Cerca nel documento"
            spellCheck={false}
            autoComplete="off"
            className="h-11 w-full min-w-0 rounded-buttonsL bg-transparent pr-3 pl-12 text-base outline-offset-2 focus-visible:outline-2 lg:h-14"
          />
        </form>
        <Button asChild variant="glass" size="icon-lg" className={controlClass}>
          <a href={fileHref} download={getDocumentFileName(document)} aria-label={`Scarica ${document.title}`}>
            <FiDownload aria-hidden="true" className="size-6" />
          </a>
        </Button>
      </div>
      {searched && (
        <div className="typo-body-medium flex flex-wrap items-center gap-2" aria-live="polite">
          {searching
            ? "Ricerca in corso…"
            : searchError
              ? "Impossibile cercare nel documento. Riprova."
              : matches.length
                ? `${matchIndex >= 0 ? matchIndex + 1 : "–"} di ${matches.length} pagine con risultati`
                : "Nessun risultato. I PDF scansionati potrebbero non contenere testo ricercabile."}
          {!searching && matches.length > 0 && (
            <>
              <Button variant="glass" size="icon" aria-label="Risultato precedente" onClick={() => nextMatch(-1)}>
                <FiChevronLeft aria-hidden="true" />
              </Button>
              <Button variant="glass" size="icon" aria-label="Risultato successivo" onClick={() => nextMatch(1)}>
                <FiChevronRight aria-hidden="true" />
              </Button>
            </>
          )}
        </div>
      )}
      <div className="flex min-h-0 flex-1 gap-4 lg:gap-12">
        <aside
          id="pdf-pages"
          aria-label="Pagine del documento"
          className={cn(
            "w-36 shrink-0 flex-col gap-6 overflow-auto rounded-t-rectangles bg-background-blur p-3 lg:flex lg:w-58 lg:p-6",
            sidebar ? "flex" : "hidden"
          )}
        >
          <div className="sticky top-0 z-10 flex flex-wrap items-center justify-center gap-1 rounded-rectangles bg-background-blur p-1 backdrop-blur-md">
            <span className="typo-body-medium">Pagine</span>
            <Button
              variant="glass"
              size="icon-sm"
              aria-label="Pagina precedente"
              disabled={!ready || page <= 1}
              onClick={() => goToPage(page - 1)}
            >
              <FiChevronLeft aria-hidden="true" />
            </Button>
            <output className="typo-body-medium tabular-nums">
              {page} di {pageCount || "–"}
            </output>
            <Button
              variant="glass"
              size="icon-sm"
              aria-label="Pagina successiva"
              disabled={!ready || page >= pageCount}
              onClick={() => goToPage(page + 1)}
            >
              <FiChevronRight aria-hidden="true" />
            </Button>
          </div>
          {pdf &&
            Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
              <PdfThumbnail key={number} pdf={pdf} number={number} selected={page === number} onSelect={goToPage} />
            ))}
        </aside>
        <section
          ref={viewport}
          className="min-h-0 min-w-0 flex-1 overflow-auto rounded-t-rectangles bg-background-blur"
          aria-label="Anteprima PDF"
          // biome-ignore lint/a11y/noNoninteractiveTabindex: The PDF viewport must support keyboard scrolling.
          tabIndex={0}
        >
          {size.width > 0 && (
            <Document
              file={fileHref}
              options={pdfOptions}
              suspense={false}
              onLoadSuccess={(loaded) => {
                setPdf(loaded)
                setFailed(false)
              }}
              onLoadError={() => setFailed(true)}
              externalLinkTarget="_blank"
              externalLinkRel="noopener noreferrer"
              onItemClick={({ pageNumber }) => {
                setPageError(false)
                setPage(pageNumber)
                viewport.current?.scrollTo(0, 0)
              }}
              loading={<output className="typo-body-large p-4">Caricamento del PDF…</output>}
              error={
                <p role="alert" className="typo-body-large p-4">
                  Impossibile visualizzare il PDF. Puoi scaricarlo con il pulsante in alto.
                </p>
              }
              className="flex min-w-full p-4 lg:pt-6"
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
                onRenderError={() => setPageError(true)}
                onRenderSuccess={() => setPageError(false)}
                customTextRenderer={({ str }) => highlightPdfText(str, searched)}
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
      </div>
      {pageError && (
        <p role="alert" className="typo-body-medium text-center">
          Impossibile visualizzare questa pagina a questo zoom. Prova a ridurre lo zoom o scaricare il PDF.
        </p>
      )}
      <div className="flex items-center justify-center gap-3 lg:hidden">
        <Button
          variant="glass"
          size="icon"
          aria-label="Pagina precedente"
          disabled={!ready || page <= 1}
          onClick={() => goToPage(page - 1)}
        >
          <FiChevronLeft aria-hidden="true" />
        </Button>
        <output className="typo-body-medium">
          Pagina {page} di {pageCount || "–"}
        </output>
        <Button
          variant="glass"
          size="icon"
          aria-label="Pagina successiva"
          disabled={!ready || page >= pageCount}
          onClick={() => goToPage(page + 1)}
        >
          <FiChevronRight aria-hidden="true" />
        </Button>
      </div>
    </Glass>
  )
}
