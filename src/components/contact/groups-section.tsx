import Image from "next/image"
import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { Button } from "@/components/ui/button"

export function GroupsSection() {
  return (
    <section className="flex w-full flex-col items-center gap-21 px-6 min-[1616px]:flex-row min-[1616px]:items-end min-[1616px]:px-36">
      <div className="flex flex-col gap-6 text-center min-[1616px]:min-w-158 min-[1616px]:flex-1 min-[1616px]:text-start">
        <h2 className="typo-headline-medium md:typo-display-medium text-center min-[1616px]:text-start">
          Hai mille dubbi sul Poli?
          <br />
          Siamo pronti ad aiutarti!
        </h2>

        <p className="typo-body-large md:typo-headline-small pb-6 text-center min-[1616px]:text-start">
          Il modo più rapido per ottenere risposte su esami, burocrazia universitaria o sulla vita al Politecnico è{" "}
          <Link href="/groups" className="text-blue-secondary hover:underline focus-visible:underline">
            entrare nel gruppo del tuo corso
          </Link>
          , su Telegram o su WhatsApp, dove gli admin sono presenti ogni giorno.
        </p>
        <Button variant="primary" size="lg" className="w-fit gap-2 self-center min-[1616px]:self-start">
          Trova il tuo gruppo
          <FiArrowUpRight />
        </Button>
      </div>

      <div className="flex w-full items-center justify-center min-[1616px]:w-auto min-[1616px]:flex-1">
        <Image
          src="/contact-group.png"
          alt="Foto di gruppo della community PoliNetwork"
          width={721}
          height={342}
          className="h-auto w-full max-w-[721px] rounded-rectangles object-cover min-[1616px]:min-w-[721px]"
        />
      </div>
    </section>
  )
}
