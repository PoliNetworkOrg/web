import { CopyTaxCode } from "@/components/chi-siamo/copy-tax-code"
import { Glass } from "@/components/glass"
import { CONTAINER, SECTION_TITLE } from "@/components/layout/page"
import { Shape } from "@/components/shapes"

const TAX_CODE = "97927490157"

const steps = [
  "Nella dichiarazione dei redditi (730, Redditi PF o CU) cerca il riquadro del 5x1000.",
  "Firma nella sezione dedicata al sostegno degli Enti del Terzo Settore.",
  "Sotto la firma, inserisci il nostro codice fiscale.",
] as const

export function SupportSection() {
  return (
    // `id`: the footer's 5x1000 card links here
    <section id="sostienici" className={`${CONTAINER} relative isolate scroll-mt-40`}>
      {/* Real shapes behind the panel, so its blur has something to frost, like the footer's glass. The painted glow
          inside it before made it read as a flat card */}
      <div aria-hidden className="-z-10 pointer-events-none absolute inset-0">
        <Shape variant="big-teal" className="-top-16 right-[8%] size-110" />
        <Shape variant="small-blue" className="bottom-0 left-[6%] size-80" />
      </div>
      <Glass className="relative grid gap-10 rounded-rectangles border-edge/60 bg-background-blur p-6 backdrop-blur-xl sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
        <div className="relative flex min-w-0 flex-col gap-6">
          <h2 className={SECTION_TITLE}>Sostieni PoliNetwork</h2>
          <p className="typo-body-large max-w-140 text-pretty">
            Se vuoi supportare PoliNetwork economicamente, puoi destinarci il 5x1000 nella dichiarazione dei redditi. Si
            tratta di una quota IRPEF che verseresti comunque, e che puoi scegliere di indirizzare a noi senza alcun
            costo aggiuntivo.
          </p>

          <ol className="flex flex-col gap-4">
            {steps.map((step, index) => (
              // Just the number, in the site's blue, like the other numbered steps: no filled circle
              <li key={step} className="typo-body-large grid grid-cols-[1.25rem_minmax(0,1fr)] items-baseline gap-3">
                <span className="text-right font-medium text-blue-secondary tabular-nums">{index + 1}</span>
                <p className="text-pretty">{step}</p>
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
          <p className="typo-body-medium text-pretty text-text-muted">
            Non costa nulla e non sostituisce l’8x1000 o il 2x1000: puoi sceglierli tutti.
          </p>
        </div>
      </Glass>
    </section>
  )
}
