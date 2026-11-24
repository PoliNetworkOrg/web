import { createFileRoute, Outlet } from "@tanstack/react-router"
import { ReportFab } from "@/components/groups/report/fab"

export const Route = createFileRoute("/gruppi")({
  component: GroupsLayout,
})

function GroupsLayout() {
  return (
    <>
      <div className="w-full">
        <Outlet />
      </div>
      <ReportFab />
    </>
  )
}
