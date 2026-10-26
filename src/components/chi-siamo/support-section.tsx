import { FiHeart } from "react-icons/fi"
import { Glass } from "@/components/glass"
import { GradientIcon } from "@/components/gradient-icon"

export function SupportSection() {
  return (
    <section className="page-container">
      <Glass className="grid items-center gap-10 rounded-rectangles border-white/50 bg-background-blur p-6 sm:p-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex min-w-0 flex-col gap-6">
          <GradientIcon icon={FiHeart} className="size-10" />
          <h2 className="typo-headline-medium sm:typo-display-medium text-balance">Sostieni PoliNetwork</h2>
          <p className="typo-body-large text-pretty">
            Se vuoi supportare PoliNetwork economicamente, puoi destinarci il 5x1000 nella dichiarazione dei redditi. Si
            tratta di una quota IRPEF che verseresti comunque, e che puoi scegliere di indirizzare a noi senza alcun
            costo aggiuntivo.
          </p>
        </div>
        <Glass className="flex min-w-0 flex-col gap-5 rounded-rectangles bg-background p-6 sm:p-8">
          <p className="typo-display-medium sm:typo-display-large text-blue-secondary">5x1000</p>
          <h3 className="typo-title-large text-balance">Il tuo sostegno può fare la differenza</h3>
          <p className="typo-body-large text-pretty">
            Nella sezione dedicata agli Enti del Terzo Settore, indica il nostro codice fiscale:
          </p>
          <p className="typo-title-large sm:typo-display-small whitespace-nowrap text-blue-secondary tabular-nums">
            97927490157
          </p>
        </Glass>
      </Glass>
    </section>
  )
}
