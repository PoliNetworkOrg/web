import Image from "next/image"
import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { Button } from "@/components/ui/button"

export function GroupsSection() {
  return (
    <section className="flex w-full flex-row items-end gap-21 px-48">
      <div className="flex flex-1 flex-col gap-6">
        <h2 className="typo-display-large sm:typo-display-medium text-start">
          Hai mille dubbi sul Poli?
          <br />
          Siamo pronti ad aiutarti!
        </h2>

        <p className="typo-title-large sm:typo-headline-small">
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

      <div className="flex flex-1 items-center justify-center">
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
