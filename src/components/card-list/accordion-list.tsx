import { useState } from "react"
import { FiChevronRight } from "react-icons/fi"
import { cn } from "@/lib/utils"
import type { CardListAccordionItem } from "./types"

export function CardListAccordionList({ items }: { items: readonly CardListAccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-8 pl-5">
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <div key={item.label} className="flex flex-col gap-4">
            <button
              type="button"
              onClick={() => setOpenIndex((current) => (current === index ? null : index))}
              className="typo-title-medium inline-flex items-center gap-6 text-left"
            >
              <FiChevronRight
                className={cn("h-4 w-4 shrink-0 text-blue-secondary transition-transform", isOpen ? "rotate-90" : "")}
              />
              <span
                className={cn(
                  isOpen
                    ? "text-blue-secondary"
                    : "bg-linear-to-t from-blue-primary to-blue-secondary bg-clip-text text-transparent"
                )}
              >
                {item.label}
              </span>
            </button>

            {isOpen ? (
              <div className="flex flex-col gap-4 pl-8">
                {item.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="typo-body-large text-text-primary">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
