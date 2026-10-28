import AccordionList from "@/components/accordion-list"
import { CONTAINER, SECTION_TITLE } from "@/components/layout/page"
import { cn } from "@/lib/utils"
import type { FreshmanContent } from "@/queries/types"

export function FAQsPage({ faqs }: { faqs: FreshmanContent["faqs"] }) {
  const accordionItems = faqs.map((faq) => ({
    value: String(faq.faqId),
    trigger: faq.titleIt,
    content: faq.descriptionIt,
  }))
  return (
    <section className={cn(CONTAINER, "flex flex-col items-center gap-10 sm:gap-14")}>
      <h2 className={cn(SECTION_TITLE, "text-center")}>Domande Frequenti tra le Matricole</h2>

      <div className="flex w-full max-w-255 flex-col">
        <AccordionList items={accordionItems} />
      </div>
    </section>
  )
}
