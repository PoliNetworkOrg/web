"use client"

import { useState } from "react"
import { FiBookmark } from "react-icons/fi"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { CardResourceProps } from "./types"

export function CardResource({
  tag,
  title,
  description,
  author,
  date,
  bookmarked: initialBookmarked = false,
  href,
  className,
}: CardResourceProps) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked)

  return (
    <Card className={cn("h-fit w-full p-6", className)}>
      <a href={href} className="flex h-full flex-col">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {(Array.isArray(tag) ? tag : [tag]).map((t, i) => (
              <span
                key={t}
                className={cn(
                  "typo-body-small rounded-buttonsM px-3 py-1",
                  i === 0 ? "bg-blue-tertiary text-text-accent-lightbg" : "bg-blue-secondary text-text-accent-darkbg"
                )}
              >
                {t}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              setBookmarked((b) => !b)
            }}
            className={cn(bookmarked ? "text-text-secondary" : "text-text-secondary hover:text-text-primary")}
          >
            <FiBookmark className={cn("h-5 w-5", bookmarked && "fill-current")} />
          </button>
        </div>

        <div className="mt-5 flex flex-1 flex-col gap-2">
          <CardTitle className="typo-title-large">{title}</CardTitle>
          <CardContent className="typo-body-large line-clamp-3 px-0 text-text-primary">{description}</CardContent>
        </div>

        <div className="typo-body-large mt-12 flex items-center justify-between text-text-secondary">
          <span>{author}</span>
          <span>{date}</span>
        </div>
      </a>
    </Card>
  )
}
