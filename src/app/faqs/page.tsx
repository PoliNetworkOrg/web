import { FiBookOpen, FiDollarSign, FiEdit, FiFileText, FiSend } from "react-icons/fi"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    content: "Content for Tab 5",
    icon: FiSend,
  },
]

export default function FAQsPage() {
  return (
    <main className="w-full">
      <div className="mx-auto w-fit py-12">
        <Tabs defaultValue="tab1">
          <TabsList>
            {faqItems.map((item) => (
              <TabsTrigger value={item.value} key={item.value}>
                <item.icon className="size-4 shrink-0" />
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {faqItems.map((item) => (
            <TabsContent value={item.value} key={item.value}>
              {item.content}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  )
}
