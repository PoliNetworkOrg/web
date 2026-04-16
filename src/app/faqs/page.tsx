import { FiBookOpen, FiDollarSign, FiEdit, FiFileText, FiSend } from "react-icons/fi"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FAQsPage() {
  return (
    <main className="w-full">
      <div className="mx-auto w-fit py-12">
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">
              <FiBookOpen className="size-4 shrink-0" />
              Lezioni
            </TabsTrigger>
            <TabsTrigger value="tab2">
              <FiDollarSign className="size-4 shrink-0" />
              Tasse
            </TabsTrigger>
            <TabsTrigger value="tab3">
              <FiEdit className="size-4 shrink-0" />
              Esami
            </TabsTrigger>
            <TabsTrigger value="tab4">
              <FiFileText className="size-4 shrink-0" />
              Piano di Studi
            </TabsTrigger>
            <TabsTrigger value="tab5">
              <FiSend className="size-4 shrink-0" />
              Mobilitá Internazionale
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content for Tab 1</TabsContent>
          <TabsContent value="tab2">Content for Tab 2</TabsContent>
          <TabsContent value="tab3">Content for Tab 3</TabsContent>
          <TabsContent value="tab4">Content for Tab 4</TabsContent>
          <TabsContent value="tab5">Content for Tab 5</TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
