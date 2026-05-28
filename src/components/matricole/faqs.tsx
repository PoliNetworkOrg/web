"use client"
import AccordionList from "@/components/accordion-list"
import { accordionItems } from "./constants"

export function FAQsPage() {
  return (
    <section className="mx-auto flex w-full max-w-400 flex-col items-center justify-center gap-16 px-9 py-38 sm:gap-20">
      <h2 className="typo-headline-medium sm:typo-display-medium text-center text-text-primary">
        Domande Frequenti tra le Matricole
      </h2>

      <div className="mx-auto flex w-full max-w-255 flex-col">
        <AccordionList items={accordionItems} />
      </div>
    </section>
  )
}
