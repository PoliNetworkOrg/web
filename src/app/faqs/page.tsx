"use client"

import { FiBookOpen, FiDollarSign, FiEdit, FiFileText, FiSend } from "react-icons/fi"
import AccordionList from "@/components/accordion-list"
import CalloutItem from "@/components/callout-item"
import TabsNavigation from "@/components/tabs"
import { Tabs } from "@/components/tabs/tabs"
import { TabsContent } from "@/components/tabs/tabs-content"

const faqItems = [
  {
    value: "tab1",
    label: "Lezioni",
    content: "Content for Tab 1",
    icon: FiBookOpen,
  },
  {
    value: "tab2",
    label: "Tasse",
    content: "Content for Tab 2",
    icon: FiDollarSign,
  },
  {
    value: "tab3",
    label: "Esami",
    content: "Content for Tab 3",
    icon: FiEdit,
  },
  {
    value: "tab4",
    label: "Piano di Studi",
    content: "Content for Tab 4",
    icon: FiFileText,
  },
  {
    value: "tab5",
    label: "Mobilitá Internazionale",
    content: (
      <div className="flex flex-col items-start py-4">
        <h1 className="typo-title-large">Content for Tab 5</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
      </div>
    ),
    icon: FiSend,
  },
]

const accordionItems = [
  {
    value: "item-1",
    trigger: "Per le lauree le lezioni sono sospese? ",
    content:
      "Spesso, la prima settimana, i Professori utilizzano le ore destinate alle esercitazioni per qualche ora di lezione in più: saranno quindi i docenti a specificare come verranno utilizzate queste ore. Dunque, le esercitazioni non sono da considerarsi annullate, salvo diversa comunicazione da parte del docente o dell’esercitatore.",
  },
  {
    value: "item-2",
    trigger: "Per le lauree le lezioni sono sospese? ",
    content:
      "Spesso, la prima settimana, i Professori utilizzano le ore destinate alle esercitazioni per qualche ora di lezione in più: saranno quindi i docenti a specificare come verranno utilizzate queste ore. Dunque, le esercitazioni non sono da considerarsi annullate, salvo diversa comunicazione da parte del docente o dell’esercitatore.",
  },
  {
    value: "item-3",
    trigger: "Per le lauree le lezioni sono sospese? ",
    content:
      "Spesso, la prima settimana, i Professori utilizzano le ore destinate alle esercitazioni per qualche ora di lezione in più: saranno quindi i docenti a specificare come verranno utilizzate queste ore. Dunque, le esercitazioni non sono da considerarsi annullate, salvo diversa comunicazione da parte del docente o dell’esercitatore.",
  },
  {
    value: "item-4",
    trigger: "Per le lauree le lezioni sono sospese? ",
    content:
      "Spesso, la prima settimana, i Professori utilizzano le ore destinate alle esercitazioni per qualche ora di lezione in più: saranno quindi i docenti a specificare come verranno utilizzate queste ore. Dunque, le esercitazioni non sono da considerarsi annullate, salvo diversa comunicazione da parte del docente o dell’esercitatore.",
  },
  {
    value: "item-5",
    trigger: "Per le lauree le lezioni sono sospese? ",
    content:
      "Spesso, la prima settimana, i Professori utilizzano le ore destinate alle esercitazioni per qualche ora di lezione in più: saranno quindi i docenti a specificare come verranno utilizzate queste ore. Dunque, le esercitazioni non sono da considerarsi annullate, salvo diversa comunicazione da parte del docente o dell’esercitatore.",
  },
]

export default function FAQsPage() {
  return (
    <main className="w-full">
      <div className="mx-auto w-225 py-12">
        <AccordionList items={accordionItems} defaultValue="item-1" />
      </div>
      <div className="mx-auto w-225 py-12">
        <Tabs defaultValue="tab5" className="flex flex-col items-center">
          <TabsNavigation items={faqItems} />
          {faqItems.map((item) => (
            <TabsContent value={item.value} key={item.value}>
              {item.content}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <div className="flex flex-col items-center py-12">
        <CalloutItem
          title="Non trovi ciò che stai cercando?"
          href="/guides"
          buttonText="Esplora le Guide"
          className="max-w-4xl"
        />
      </div>
    </main>
  )
}
