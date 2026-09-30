import type { ReactNode } from "react"
import { ReportFab } from "@/components/groups/report/fab"
import { GroupsShapes } from "./shapes"

export default function GroupsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative w-full">
        <GroupsShapes />
        {children}
      </div>
      <ReportFab />
    </>
  )
}
