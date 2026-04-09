"use client"

import { Glass } from "@/components/glass"
import { cn } from "@/lib/utils"
import { CardListAccordionList } from "./accordion-list"
import { CardListSectionContent } from "./section-content"
import type { CardListProps } from "./types"

export function CardList({ sections, items, className }: CardListProps) {
  return (
    <Glass
      className={cn(
        "w-full overflow-hidden rounded-rectangles border-white/50 bg-background-blur p-0 text-card-foreground",
        className
      )}
    >
      <div className="flex flex-col gap-12 p-10">
        {sections.map((section) => (
          <CardListSectionContent key={`${section.title ?? "section"}-${section.paragraphs[0]}`} {...section} />
        ))}

        {items?.length ? <CardListAccordionList items={items} /> : null}
      </div>
    </Glass>
  )
}
