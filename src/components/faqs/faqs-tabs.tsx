"use client"

import type { IconType } from "react-icons"
import { FiBookOpen, FiDollarSign, FiEdit, FiFileText, FiSend } from "react-icons/fi"
import AccordionList from "@/components/accordion-list"
import type { AccordionListItem } from "@/components/accordion-list/types"
import CalloutItem from "@/components/callout-item"
import TabsNavigation from "@/components/tabs"
import { Tabs } from "@/components/tabs/tabs"
import { TabsContent } from "@/components/tabs/tabs-content"

const faqItems: {
  value: string
  label: string
  icon: IconType
  accordionItems: AccordionListItem[]
}[] = [
  {
    value: "tab1",
    label: "Lezioni",
    icon: FiBookOpen,
    accordionItems: [
      {
        value: "item-1",
        trigger: "Per le lauree le lezioni sono sospese?",
        content:
          "Spesso, la prima settimana, i Professori utilizzano le ore destinate alle esercitazioni per qualche ora di lezione in più: saranno quindi i docenti a specificare come verranno utilizzate queste ore. Dunque, le esercitazioni non sono da considerarsi annullate, salvo diversa comunicazione da parte del docente o dell'esercitatore.",
      },
    ],
  },
  {
    value: "tab2",
    label: "Tasse",
    icon: FiDollarSign,
    accordionItems: [
      {
        value: "item-1",
        trigger: "Per le lauree le lezioni sono sospese?",
        content:
          "Spesso, la prima settimana, i Professori utilizzano le ore destinate alle esercitazioni per qualche ora di lezione in più: saranno quindi i docenti a specificare come verranno utilizzate queste ore. Dunque, le esercitazioni non sono da considerarsi annullate, salvo diversa comunicazione da parte del docente o dell'esercitatore.",
      },
    ],
  },
  {
    value: "tab3",
    label: "Esami",
    icon: FiEdit,
    accordionItems: [
      {
        value: "item-1",
        trigger: "Per le lauree le lezioni sono sospese?",
        content:
          "Spesso, la prima settimana, i Professori utilizzano le ore destinate alle esercitazioni per qualche ora di lezione in più: saranno quindi i docenti a specificare come verranno utilizzate queste ore. Dunque, le esercitazioni non sono da considerarsi annullate, salvo diversa comunicazione da parte del docente o dell'esercitatore.",
      },
    ],
  },
  {
    value: "tab4",
    label: "Piano di Studi",
    icon: FiFileText,
    accordionItems: [
      {
        value: "item-1",
        trigger: "Per le lauree le lezioni sono sospese?",
        content:
          "Spesso, la prima settimana, i Professori utilizzano le ore destinate alle esercitazioni per qualche ora di lezione in più: saranno quindi i docenti a specificare come verranno utilizzate queste ore. Dunque, le esercitazioni non sono da considerarsi annullate, salvo diversa comunicazione da parte del docente o dell'esercitatore.",
      },
    ],
  },
  {
    value: "tab5",
    label: "Mobilità Internazionale",
    icon: FiSend,
    accordionItems: [
      {
        value: "item-1",
        trigger: "Per le lauree le lezioni sono sospese? ",
        content:
          "Spesso, la prima settimana, i Professori utilizzano le ore destinate alle esercitazioni per qualche ora di lezione in più: saranno quindi i docenti a specificare come verranno utilizzate queste ore. Dunque, le esercitazioni non sono da considerarsi annullate, salvo diversa comunicazione da parte del docente o dell'esercitatore.",
      },
      {
        value: "item-2",
        trigger: "Per le lauree le lezioni sono sospese? ",
        content:
          "Spesso, la prima settimana, i Professori utilizzano le ore destinate alle esercitazioni per qualche ora di lezione in più: saranno quindi i docenti a specificare come verranno utilizzate queste ore. Dunque, le esercitazioni non sono da considerarsi annullate, salvo diversa comunicazione da parte del docente o dell'esercitatore.",
      },
      {
        value: "item-3",
        trigger: "Per le lauree le lezioni sono sospese? ",
        content:
          "Spesso, la prima settimana, i Professori utilizzano le ore destinate alle esercitazioni per qualche ora di lezione in più: saranno quindi i docenti a specificare come verranno utilizzate queste ore. Dunque, le esercitazioni non sono da considerarsi annullate, salvo diversa comunicazione da parte del docente o dell'esercitatore.",
      },
      {
        value: "item-4",
        trigger: "Per le lauree le lezioni sono sospese? ",
        content:
          "Spesso, la prima settimana, i Professori utilizzano le ore destinate alle esercitazioni per qualche ora di lezione in più: saranno quindi i docenti a specificare come verranno utilizzate queste ore. Dunque, le esercitazioni non sono da considerarsi annullate, salvo diversa comunicazione da parte del docente o dell'esercitatore.",
      },
      {
        value: "item-5",
        trigger: "Per le lauree le lezioni sono sospese? ",
        content:
          "Spesso, la prima settimana, i Professori utilizzano le ore destinate alle esercitazioni per qualche ora di lezione in più: saranno quindi i docenti a specificare come verranno utilizzate queste ore. Dunque, le esercitazioni non sono da considerarsi annullate, salvo diversa comunicazione da parte del docente o dell'esercitatore.",
      },
    ],
  },
]

export function FaqsTabs() {
  return (
    <div className="mx-auto flex w-full max-w-255 flex-col gap-68 sm:gap-79">
      <Tabs defaultValue="tab5" className="flex w-full flex-col items-center">
        <TabsNavigation
          items={faqItems}
          className="max-md:-mx-2 mb-19 max-md:w-[calc(100%+1rem)] max-md:rounded-none"
        />
        {faqItems.map((item) => (
          <TabsContent value={item.value} key={item.value} className="w-full min-w-0">
            <AccordionList items={item.accordionItems} defaultValue={item.accordionItems[0]?.value} />
          </TabsContent>
        ))}
      </Tabs>

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
