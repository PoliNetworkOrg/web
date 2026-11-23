import type { ReactNode } from "react"

export function Highlight({ children }: { children: ReactNode }) {
  return <span className="text-blue-secondary">{children}</span>
}
