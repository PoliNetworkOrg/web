import { CopyTaxCode } from "@/components/chi-siamo/copy-tax-code"
import { Glass } from "@/components/glass"
import { CONTAINER, SECTION_TITLE } from "@/components/layout/page"

const TAX_CODE = "97927490157"

const steps = [
  "Nella dichiarazione dei redditi (730, Redditi PF o CU) cerca il riquadro del 5x1000.",
  "Firma nella sezione dedicata al sostegno degli Enti del Terzo Settore.",
  "Sotto la firma, inserisci il nostro codice fiscale.",
] as const

export function SupportSection() {
  return (
    // `id`: the footer's 5x1000 card links here
    <section id="sostienici" className={`${CONTAINER} scroll-mt-40`}>
      <Glass className="relative grid gap-10 overflow-hidden rounded-rectangles border-white/60 bg-background-blur p-6 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
        {/* A soft blue glow behind the figure, so the panel doesn't read as one more flat card */}
        <div
          aria-hidden
          className="-top-32 -right-32 pointer-events-none absolute size-96 rounded-full bg-blue-secondary/15 blur-3xl"
        />

        <div className="relative flex min-w-0 flex-col gap-6">
          <h2 className={SECTION_TITLE}>Sostieni PoliNetwork</h2>
          <p className="typo-body-large max-w-140 text-pretty">
            Se vuoi supportare PoliNetwork economicamente, puoi destinarci il 5x1000 nella dichiarazione dei redditi. Si
            tratta di una quota IRPEF che verseresti comunque, e che puoi scegliere di indirizzare a noi senza alcun
            costo aggiuntivo.
          </p>

          <ol className="flex flex-col gap-4">
            {steps.map((step, index) => (
              <li key={step} className="flex items-start gap-4">
                <span className="typo-label-large flex size-8 shrink-0 items-center justify-center rounded-full bg-linear-to-b from-blue-secondary to-blue-primary text-white tabular-nums">
                  {index + 1}
                </span>
                <p className="typo-body-large text-pretty pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative flex min-w-0 flex-col justify-center gap-6">
          <p
            aria-hidden
            className="typo-display-large sm:typo-display-extralarge bg-linear-to-b from-blue-secondary to-blue-primary bg-clip-text text-transparent tabular-nums leading-none"
          >
            5x1000
          </p>
          <h3 className="typo-headline-medium text-balance">Il tuo 5x1000 può fare la differenza</h3>
          <CopyTaxCode value={TAX_CODE} />
          <p className="typo-body-medium text-pretty text-slate-600">
            Non costa nulla e non sostituisce l’8x1000 o il 2x1000: puoi sceglierli tutti.
          </p>
        </div>
      </Glass>
    </section>
  )
}
