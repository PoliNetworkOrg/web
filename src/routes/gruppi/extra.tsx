import { createFileRoute } from "@tanstack/react-router"
import { ExtraGroups } from "@/components/groups/extra-groups"
import { pageMeta } from "@/lib/seo"
import { fetchExtraGroups } from "@/queries/functions"

export const Route = createFileRoute("/gruppi/extra")({
  loader: () => fetchExtraGroups(),
  head: () => ({
    meta: pageMeta({
      title: "Gruppi Extra",
      description: "Affitti, mercatino, eventi, hobby e tutto ciò che riguarda la vita studentesca.",
    }),
  }),
  component: ExtraGroupsPage,
})

function ExtraGroupsPage() {
  return <ExtraGroups groups={Route.useLoaderData()} />
}
