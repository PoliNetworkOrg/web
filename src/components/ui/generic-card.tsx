import type * as React from "react"
import { cn } from "@/lib/utils"

export function GenericCard({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("rounded-3xl bg-white p-6 shadow-2xl", className)} {...props} />
}
