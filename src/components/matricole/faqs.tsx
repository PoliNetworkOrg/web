"use client"
import AccordionList from "@/components/accordion-list"
import { accordionItems } from "./constants"

export function FAQsPage() {
  return (
    <section className="page-container flex flex-col items-center gap-block">
      <h2 className="typo-headline-medium sm:typo-display-medium text-center text-text-primary">
        Domande Frequenti tra le Matricole
      </h2>

      <div className="mx-auto flex w-full max-w-255 flex-col">
        <AccordionList items={accordionItems} />
      </div>
    </section>
  )
}
