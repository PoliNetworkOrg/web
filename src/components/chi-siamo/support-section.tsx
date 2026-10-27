import { CONTAINER, SECTION_TITLE } from "@/components/layout/page"

// Figma: text on the left, the 5x1000 details on the right, both on the background. The nested glass panels, the
// 57px "5x1000" and the 36px tax code (bigger than the section title) are gone.
export function SupportSection() {
  return (
    <section className={`${CONTAINER} grid gap-10 lg:grid-cols-2 lg:gap-16`}>
      <div className="flex min-w-0 flex-col gap-6">
        <h2 className={SECTION_TITLE}>Sostieni PoliNetwork</h2>
        <p className="typo-body-large max-w-140 text-pretty">
          Se vuoi supportare PoliNetwork economicamente, puoi destinarci il 5x1000 nella dichiarazione dei redditi. Si
          tratta di una quota IRPEF che verseresti comunque, e che puoi scegliere di indirizzare a noi senza alcun costo
          aggiuntivo.
        </p>
      </div>
      <div className="flex min-w-0 flex-col gap-4 lg:pt-3">
        <h3 className="typo-headline-medium text-balance">
          Il tuo <span className="text-blue-secondary">5x1000</span> può fare la differenza
        </h3>
        <p className="typo-body-large max-w-120 text-pretty">
          Nella sezione dedicata agli Enti del Terzo Settore, indica il nostro codice fiscale:
        </p>
        <p className="typo-headline-small text-blue-secondary tabular-nums tracking-wide">97927490157</p>
      </div>
    </section>
  )
}
