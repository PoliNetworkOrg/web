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

export function FaqsTabs({ categories }: { categories: FaqCategory[] }) {
  const tabs = categories.map((category) => ({
    value: String(category.categoryId),
    label: category.titleIt,
    icon: (category.icon && ICONS[category.icon]) || FiHelpCircle,
    accordionItems: category.faqs.map((faq) => ({
      value: String(faq.faqId),
      trigger: faq.titleIt,
      content: faq.descriptionIt,
    })),
  }))

  return (
    <div className="mx-auto flex w-full max-w-255 flex-col gap-68 sm:gap-79">
      {tabs.length === 0 ? (
        <p className="typo-body-large text-center">Nessuna FAQ disponibile al momento.</p>
      ) : (
        <Tabs defaultValue={tabs[0]?.value} className="flex w-full flex-col items-center">
          <TabsNavigation items={tabs} className="max-md:-mx-2 mb-19 max-md:w-[calc(100%+1rem)] max-md:rounded-none" />
          {tabs.map((tab) => (
            <TabsContent value={tab.value} key={tab.value} className="w-full min-w-0">
              <AccordionList items={tab.accordionItems} defaultValue={tab.accordionItems[0]?.value} />
            </TabsContent>
          ))}
        </Tabs>
      )}

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
  )
}
