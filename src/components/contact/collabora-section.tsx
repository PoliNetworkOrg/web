import Image from "next/image"
import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import associationsImage from "@/assets/images/collabora_associations.jpg"
import companyImage from "@/assets/images/collabora_company.jpg"
import { Glass } from "@/components/glass"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import { Button } from "@/components/ui/button"

/** The two kinds of partners the text names, with the photos of their sections on /collabora */
const partners = [
  // The first photo is half covered by the second: its label sits at the top, the part that shows
  {
    label: "Associazioni studentesche",
    image: associationsImage,
    className: "top-0 left-0",
    labelClassName: "top-3 sm:top-4",
  },
  { label: "Aziende", image: companyImage, className: "right-0 bottom-0", labelClassName: "bottom-3 sm:bottom-4" },
] as const

export function CollaboraSection() {
  return (
    <section className={`${CONTAINER} grid items-center gap-12 lg:grid-cols-2 lg:gap-16`}>
      <div className="flex max-w-3xl flex-col items-start gap-6">
        <h2 className={SECTION_TITLE}>Vuoi sviluppare un progetto insieme a noi?</h2>

        <div className={`${SECTION_LEAD} flex flex-col gap-3`}>
          <p>
            Siamo sempre felici di{" "}
            <span className="text-blue-secondary">collaborare con aziende o associazioni studentesche</span> per portare
            agli studenti del PoliMi eventi e attività di valore.
          </p>
          <p>Consulta la pagina dedicata per scoprire come possiamo unire le forze!</p>
        </div>

        <Button variant="primary" size="lg" className="mt-2" asChild>
          <Link href="/collabora">
            Collabora con noi
            <FiArrowUpRight />
          </Link>
        </Button>
      </div>

      {/* Two overlapping photos, one per kind of partner, each named by a glass label */}
      <div aria-hidden className="relative mx-auto aspect-[5/4] w-full max-w-xl">
        {partners.map((partner) => (
          <div
            key={partner.label}
            className={`absolute aspect-[4/3] w-[68%] overflow-hidden rounded-rectangles shadow-xl ${partner.className}`}
          >
            <Image src={partner.image} alt="" fill sizes="(min-width: 1024px) 380px, 68vw" className="object-cover" />
            <Glass
              className={`typo-label-large absolute left-3 rounded-full border-white/60 bg-white/70 px-3 py-1.5 text-blue-secondary sm:left-4 ${partner.labelClassName}`}
            >
              {partner.label}
            </Glass>
          </div>
        ))}
      </div>
    </section>
  )
}
