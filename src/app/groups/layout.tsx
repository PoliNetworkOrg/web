import type { ReactNode } from "react"
import { ReportFab } from "@/components/groups/report/fab"

export default function GroupsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ReportFab />
    </>
  )
}
