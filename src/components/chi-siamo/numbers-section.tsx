import { NumbersCarousel } from "@/components/chi-siamo/numbers-carousel"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"

export function NumbersSection() {
  return (
    <section className={`${CONTAINER} flex flex-col gap-10 md:gap-14`}>
      <div className="flex flex-col gap-4">
        <h2 className={SECTION_TITLE}>I numeri</h2>
        <p className={`${SECTION_LEAD} max-w-160`}>
          Un network in continua crescita, costruito dagli studenti, per gli studenti.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <NumbersCarousel />

        <p className="typo-body-large lg:text-center">
          Dal <span className="text-blue-secondary">2016</span> al fianco degli studenti del PoliMi
        </p>
      </div>
    </section>
  )
}
