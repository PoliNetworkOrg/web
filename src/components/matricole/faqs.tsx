import AccordionList from "@/components/accordion-list"
import type { FreshmanContent } from "@/queries/types"

export function FAQsPage({ faqs }: { faqs: FreshmanContent["faqs"] }) {
  const accordionItems = faqs.map((faq) => ({
    value: String(faq.faqId),
    trigger: faq.titleIt,
    content: faq.descriptionIt,
  }))
  return (
    <section className="mx-auto flex w-full max-w-400 flex-col items-center justify-center gap-16 px-9 py-32 sm:gap-20 sm:py-38">
      <h2 className="typo-headline-medium sm:typo-display-medium text-center text-text-primary">
        Domande Frequenti tra le Matricole
      </h2>

      <div className="mx-auto flex w-full max-w-255 flex-col">
        <AccordionList items={accordionItems} />
      </div>
    </section>
  )
}
