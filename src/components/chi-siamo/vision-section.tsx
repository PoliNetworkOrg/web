import { CONTAINER, PAGE_HERO } from "@/components/layout/page"
import { Hero } from "@/components/ui/hero"

export function VisionSection() {
  return (
    <section className={`${CONTAINER} ${PAGE_HERO}`}>
      <Hero title="Su di noi" description="Rendiamo le informazioni sul PoliMi più semplici." />
    </section>
  )
}
