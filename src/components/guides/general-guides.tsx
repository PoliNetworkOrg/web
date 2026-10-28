import AccordionList from "@/components/accordion-list"
import { GENERAL_GUIDES } from "@/components/guides/constants"
import { FLOW_MAIN, FlowHeader } from "@/components/layout/flow-header"
import { EMPTY_STATE } from "@/components/layout/page"

export function GeneralGuides() {
  return (
    <main className={FLOW_MAIN}>
      <FlowHeader title="Guide Generali" backHref="/guides" replaceBack />

      {GENERAL_GUIDES.length > 0 ? (
        <AccordionList items={GENERAL_GUIDES} />
      ) : (
        <p className={EMPTY_STATE}>Nessuna guida disponibile al momento.</p>
      )}
    </main>
  )
}
