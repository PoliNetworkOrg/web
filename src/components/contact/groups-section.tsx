import Image from "next/image"
import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { Button } from "@/components/ui/button"

export function GroupsSection() {
  return (
    <section className="flex w-full flex-col items-center gap-21 px-6 sm:flex-row sm:items-end sm:px-48">
      <div className="flex flex-col gap-6 sm:flex-1">
        <h2 className="typo-headline-medium sm:typo-display-medium text-center sm:text-start">
          Hai mille dubbi sul Poli?
          <br />
          Siamo pronti ad aiutarti!
        </h2>

        <p className="typo-body-large sm:typo-headline-small text-center sm:text-start">
          Il modo più rapido per ottenere risposte su esami, burocrazia universitaria o sulla vita al Politecnico è{" "}
          <Link href="/groups" className="text-blue-secondary hover:underline focus-visible:underline">
            entrare nel gruppo del tuo corso
          </Link>
          , su Telegram o su WhatsApp, dove gli admin sono presenti ogni giorno.
        </p>
        <Button variant="primary" size="lg" className="w-fit gap-2 self-center md:self-start">
          Trova il tuo gruppo
          <FiArrowUpRight />
        </Button>
      </div>

      <div className="flex items-center justify-center sm:flex-1">
        <Image
          src="/contact-group.png"
          alt="Foto di gruppo della community PoliNetwork"
          width={721}
          height={342}
          className="h-auto w-full max-w-180 rounded-rectangles object-cover"
        />
      </div>
    </section>
  )
}
