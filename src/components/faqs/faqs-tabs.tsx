"use client"

import type { IconType } from "react-icons"
import { FiBookOpen, FiDollarSign, FiEdit, FiFileText, FiHelpCircle, FiSend } from "react-icons/fi"
import AccordionList from "@/components/accordion-list"
import CalloutItem from "@/components/callout-item"
import TabsNavigation from "@/components/tabs"
import { Tabs } from "@/components/tabs/tabs"
import { TabsContent } from "@/components/tabs/tabs-content"
import type { ApiOutput } from "@/types"

type FaqCategory = ApiOutput["web"]["faqs"]["getAllFaqs"][number]

const ICONS: Record<string, IconType> = {
  "book-open": FiBookOpen,
  "dollar-sign": FiDollarSign,
  edit: FiEdit,
  "file-text": FiFileText,
  send: FiSend,
}

const EMPTY_STATE =
  "typo-body-large rounded-rectangles border border-slate-300 border-dashed px-6 py-10 text-center text-slate-600"

export function FaqsTabs({ categories }: { categories: FaqCategory[] }) {
  const tabs = categories.map((category) => ({
    value: String(category.categoryId),
    label: category.titleIt,
    icon: (category.icon && ICONS[category.icon]) || FiHelpCircle,
    accordionItems: category.faqs.map((faq) => ({
      value: String(faq.faqId),
      trigger: faq.titleIt,
      // Answers are plain text: keep the line breaks the editors typed
      content: <p className="whitespace-pre-line">{faq.descriptionIt}</p>,
    })),
  }))
  // Open on a category that has answers: an empty first tab made the page look broken
  const defaultTab = tabs.find((tab) => tab.accordionItems.length > 0) ?? tabs[0]

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {/* Figma's list column: 900px at 1728 */}
      <div className="mx-auto w-full max-w-225">
        {tabs.length === 0 ? (
          <p className={EMPTY_STATE}>Nessuna FAQ disponibile al momento.</p>
        ) : (
          <Tabs defaultValue={defaultTab?.value} className="flex w-full flex-col items-center gap-10 sm:gap-14">
            {/* Full-bleed on phones so the scrolling strip reaches the screen edges */}
            <TabsNavigation
              items={tabs}
              className="max-sm:-mx-6 max-sm:w-[calc(100%+3rem)] max-sm:rounded-none max-sm:border-x-0"
            />
            {tabs.map((tab) => (
              <TabsContent value={tab.value} key={tab.value} className="w-full min-w-0">
                {tab.accordionItems.length > 0 ? (
                  <AccordionList items={tab.accordionItems} defaultValue={tab.accordionItems[0]?.value} />
                ) : (
                  <p className={EMPTY_STATE}>Non ci sono ancora domande in questa categoria.</p>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>

      <div className="mx-auto w-full max-w-225">
        <CalloutItem
          title="Non trovi ciò che stai cercando?"
          href="/guides"
          buttonText={
            <>
              <span className="sm:hidden">Guide</span>
              <span className="hidden sm:inline">Esplora le Guide</span>
            </>
          }
          className="w-full"
        />
      </div>
    </div>
  )
}
