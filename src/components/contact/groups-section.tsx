import Image from "next/image"
import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { CONTAINER, INLINE_LINK, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { Button } from "@/components/ui/button"

export function GroupsSection() {
  return (
    <section className={`${CONTAINER} grid items-center gap-10 xl:grid-cols-2 xl:gap-16`}>
      <div className="flex flex-col items-start gap-6">
        <h2 className={SECTION_TITLE}>
          Hai mille dubbi sul Poli?
          <br />
          Siamo pronti ad aiutarti!
        </h2>

        <p className={`${SECTION_LEAD} max-w-2xl`}>
          Il modo più rapido per ottenere risposte su esami, burocrazia universitaria o sulla vita al Politecnico è{" "}
          <Link href="/groups" className={INLINE_LINK}>
            entrare nel gruppo del tuo corso
          </Link>
          , su Telegram o su WhatsApp, dove gli admin sono presenti ogni giorno.
        </p>

        <Button variant="primary" size="lg" className="mt-2" asChild>
          <Link href="/groups">
            Trova il tuo gruppo
            <FiArrowUpRight />
          </Link>
        </Button>
      </div>

      <Image
        src="/contact-group.png"
        alt="Foto di gruppo della community PoliNetwork"
        width={512}
        height={246}
        sizes="(min-width: 80rem) 600px, (min-width: 42rem) 672px, 100vw"
        // The source is only 512px wide: capped at 672px so it never stretches past ~1.3x
        className="mx-auto h-auto w-full max-w-2xl rounded-rectangles xl:max-w-none"
      />
    </section>
  )
}
