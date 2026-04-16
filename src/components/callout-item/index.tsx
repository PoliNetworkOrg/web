"use client"

import { useRouter } from "next/navigation"
import { FiArrowUpRight } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Item, ItemActions, ItemContent, ItemInner, ItemTitle } from "@/components/ui/item"
import { cn } from "@/lib/utils"
import type { CalloutItemProps } from "./types"

export default function CalloutItem({ title, href, buttonText, className }: CalloutItemProps) {
    const router = useRouter()

    return (
        <Item className={cn("flex w-full flex-col", className)}>
            <ItemInner>
                <ItemContent>
                    <ItemTitle>{title}</ItemTitle>
                </ItemContent>
                <ItemActions>
                    <Button
                        variant="primary"
                        size="lg"
                        className="gap-8 pr-6 pl-10 has-[>svg]:pr-6 has-[>svg]:pl-10"
                        onClick={() => router.push(href)}
                    >
                        {buttonText}
                        <FiArrowUpRight aria-hidden="true" />
                    </Button>
                </ItemActions>
            </ItemInner>
        </Item>
    )
}
