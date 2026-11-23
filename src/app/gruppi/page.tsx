import type { Metadata } from "next"
import { FiBook, FiStar } from "react-icons/fi"
import { CardIcon } from "@/components/card-icon"
import { GroupSearch } from "@/components/home/group-search"
import { PAGE_HERO_TOP } from "@/components/layout/page"

const groups = [
  {
    title: "Gruppi Didattici",
    caption: "Ingegneria, Architettura, Design, e tutti i gruppi del tuo corso di studi.",
    href: "/gruppi/didattica",
    icon: FiBook,
    cta: "Inizia",
  },
  {
    title: "Gruppi Extra",
    caption: "Affitti, mercatino, eventi, hobby e tutto ciò che riguarda la vita studentesca.",
    href: "/gruppi/extra",
    icon: FiStar,
    cta: "Esplora",
  },
] as const

export const metadata: Metadata = {
  title: "Gruppi",
  description: "Esplora i gruppi del Politecnico di Milano, dai gruppi didattici a quelli extra-curriculari.",
}

export default function Home() {
  return (
    <main className="w-full">
      <div className={`${PAGE_HERO_TOP} flex min-h-svh flex-col items-center gap-16 px-6 pb-32 md:gap-20`}>
        <div className="flex w-full flex-col items-center gap-5 text-center">
          <h1 className="typo-display-fluid-extralarge w-fit py-4 text-gradient-grey md:py-10">Gruppi</h1>
          <GroupSearch />
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row md:gap-13">
          {groups.map((group) => (
            <CardIcon
              key={group.title}
              title={group.title}
              description={group.caption}
              href={group.href}
              icon={group.icon}
              cta={group.cta}
              align="start"
              hoverEffect
              className="w-full max-w-108"
              size="compact"
            />
          ))}
        </div>
      </div>
    </main>
  )
}
