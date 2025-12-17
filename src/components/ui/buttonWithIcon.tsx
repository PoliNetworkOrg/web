import type { LucideIcon } from "lucide-react"
import React from "react"
import { Button } from "./button"

export function ButtonWithIcon({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <Button variant="default" size="lg">
      <Icon />
      {text}
    </Button>
  )
}
