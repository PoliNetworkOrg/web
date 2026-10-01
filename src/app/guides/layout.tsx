import type { ReactNode } from "react"
import { ConditionalGlobalShapes } from "@/components/conditional-global-shapes"

export default function GuidesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ConditionalGlobalShapes />
      {children}
    </>
  )
}
