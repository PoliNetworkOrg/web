import Link from "next/link"
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi"
import { Button } from "@/components/ui/button"

export function VisionSection() {
  return (
    <section className="page-container flex flex-col items-center gap-6 pt-page-top text-center">
      <p className="typo-title-large text-blue-secondary">Su di noi</p>
      <h1 className="typo-display-small sm:typo-display-medium lg:typo-display-large max-w-260 text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
        Un Politecnico in cui nessuno studente resti indietro per mancanza di{" "}
        <span className="text-blue-secondary">informazioni.</span>
      </h1>
      <p className="typo-body-large sm:typo-headline-extrasmall max-w-180 text-balance">
        Rendiamo le informazioni sul PoliMi più accessibili, comprensibili e facili da trovare.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <Link href="#cosa-facciamo">
            Scopri cosa facciamo <FiArrowDown aria-hidden />
          </Link>
        </Button>
        <Button asChild size="lg" variant="glass">
          <Link href="/collabora">
            Entra nel network <FiArrowUpRight aria-hidden />
          </Link>
        </Button>
      </div>
    </section>
  )
}
