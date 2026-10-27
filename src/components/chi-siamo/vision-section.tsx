import { CONTAINER } from "@/components/layout/page"

// Both Figma versions open with the vision statement and no buttons: the two CTAs here existed in neither
export function VisionSection() {
  return (
    <section className={`${CONTAINER} flex flex-col items-center gap-6 text-center`}>
      <p className="typo-title-large text-blue-secondary">La nostra visione</p>
      <h1 className="typo-display-small sm:typo-display-medium lg:typo-display-large max-w-260 text-balance bg-linear-to-b from-text-primary to-text-secondary bg-clip-text text-transparent">
        Un Politecnico in cui nessuno studente resti indietro per mancanza di{" "}
        <span className="text-blue-secondary">informazioni.</span>
      </h1>
      <p className="typo-body-large sm:typo-headline-extrasmall max-w-180 text-balance">
        Rendiamo le informazioni sul PoliMi più accessibili, comprensibili e facili da trovare.
      </p>
    </section>
  )
}
