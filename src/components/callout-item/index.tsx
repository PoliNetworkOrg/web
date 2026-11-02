"use client"

import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Item, ItemActions, ItemContent, ItemInner, ItemTitle } from "@/components/ui/item"
import { cn } from "@/lib/utils"
import type { CalloutItemProps } from "./types"

export default function CalloutItem({ title, href, buttonText, className }: CalloutItemProps) {
  return (
    <Item className={cn("flex w-full flex-col", className)}>
      <ItemInner>
        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button variant="primary" size="lg" asChild className="gap-8 pr-6 pl-10 has-[>svg]:pr-6 has-[>svg]:pl-10">
            <Link href={href}>
              {buttonText}
              <FiArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </ItemActions>
      </ItemInner>
    </Item>
  )
}
