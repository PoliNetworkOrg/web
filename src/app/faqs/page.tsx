import { FiArrowUpRight } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Item, ItemActions, ItemContent, ItemInner, ItemTitle } from "@/components/ui/item"

export default function FAQsPage() {
  return (
    <main className="w-full">
      <div className="flex flex-col items-center py-12">
        <Item className="flex w-full max-w-4xl flex-col">
          <ItemInner>
            <ItemContent>
              <ItemTitle>Non trovi ciò che stai cercando?</ItemTitle>
            </ItemContent>
            <ItemActions>
              <Button variant="primary" size="lg" className="gap-8 pr-6 pl-10 has-[>svg]:pr-6 has-[>svg]:pl-10">
                Esplora le Guide
                <FiArrowUpRight />
              </Button>
            </ItemActions>
          </ItemInner>
        </Item>
      </div>
    </main>
  )
}
