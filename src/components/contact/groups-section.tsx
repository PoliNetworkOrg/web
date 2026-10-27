import Image from "next/image"
import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
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
          <Link href="/groups" className="text-blue-secondary hover:underline focus-visible:underline">
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

      {/* Figma crops the photo to ~2.1:1 next to the text; it keeps that ratio at every width instead of growing tall */}
      <Image
        src="/contact-group.png"
        alt="Foto di gruppo della community PoliNetwork"
        width={721}
        height={342}
        sizes="(min-width: 1280px) 50vw, 100vw"
        className="aspect-[721/342] h-auto w-full max-w-3xl rounded-rectangles object-cover xl:max-w-none"
      />
    </section>
  )
}
