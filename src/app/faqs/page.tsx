import { FiBookOpen, FiDollarSign, FiEdit, FiFileText, FiSend } from "react-icons/fi"
import TabsNavigation from "@/components/tabs-navigation"
import { Tabs, TabsContent } from "@/components/ui/tabs"

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

export default function FAQsPage() {
  return (
    <main className="w-full py-12">
      <Tabs defaultValue="tab5" className="flex flex-col items-center">
        <TabsNavigation items={faqItems} />
        {faqItems.map((item) => (
          <TabsContent value={item.value} key={item.value}>
            {item.content}
          </TabsContent>
        ))}
      </Tabs>
    </main>
  )
}
