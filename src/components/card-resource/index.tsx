"use client"

import Link from "next/link"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Pill } from "@/components/ui/pill"
import { cn } from "@/lib/utils"
import type { CardResourceProps } from "./types"

export function CardResource({
  tag,
  title,
  description,
  author,
  date,
  href,
  className,
}: CardResourceProps) {

  return (
    <Card className={cn("h-fit w-full p-6", className)}>
      <Link href={href} className="flex h-full flex-col">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {(Array.isArray(tag) ? tag : [tag]).map((t) => (
              <Pill key={t.text} variant={t.variant}>
                {t.text}
              </Pill>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-1 flex-col gap-2">
          <CardTitle className="typo-title-large">{title}</CardTitle>
          <CardContent className="typo-body-large line-clamp-3 px-0 text-text-primary">{description}</CardContent>
        </div>

        <div className="typo-body-large mt-12 flex items-center justify-between text-text-secondary">
          <span>{author}</span>
          <span>{date}</span>
        </div>
      </Link>
    </Card>
  )
}
