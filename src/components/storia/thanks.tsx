import { FiHeart } from "react-icons/fi"
import { GradientIcon } from "@/components/gradient-icon"
import { CONTAINER, SECTION_LEAD, SECTION_TITLE } from "@/components/layout/page"
import TextOnlyLayout from "@/components/layout/TextOnlySection"
import { cn } from "@/lib/utils"

export function Thanks() {
  return (
    <TextOnlyLayout
      title="Un grazie speciale"
      description={
        <>
          <h3 className={SECTION_TITLE}>Centinaia di persone, una sola comunità.</h3>
          <p className={cn(SECTION_LEAD, "mt-3")}>
            PoliNetwork esiste grazie a tutte le persone che, in modi diversi, hanno dedicato tempo, energie e idee alla
            sua crescita. Alcune hanno coordinato un corso, altre sviluppato uno strumento, organizzato un evento,
            moderato un gruppo o semplicemente aiutato qualcuno nel momento giusto.
          </p>
          <p className={SECTION_LEAD}>Questa è la nostra memoria collettiva.</p>
        </>
      }
      classNames={{
        section: `${CONTAINER} gap-12 xl:flex-row xl:items-center xl:gap-16 [&>div>h2]:typo-title-large`,
        textDiv: "items-start text-start xl:w-1/2",
        title: "text-start text-blue-secondary",
        descriptionDiv: "text-start",
        contentDiv: "min-w-0 xl:w-1/2",
      }}
    >
      {/* Same quote block as "Quello che abbiamo fatto di più" further down the page */}
      <div className="flex flex-col gap-4 border-blue-primary/30 border-l pl-6 sm:pl-10">
        <GradientIcon icon={FiHeart} className="size-10 sm:size-14" />
        <p className="typo-headline-small sm:typo-headline-medium text-balance text-blue-secondary">
          Grazie a chi c’è stato, e a chi ci sarà.
        </p>
      </div>
    </TextOnlyLayout>
  )
}
