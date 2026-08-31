import { GroupsResult } from "@/components/groups/groups-result"

export const dynamic = "force-dynamic"

export default async function DidatticaGroupsResultPage({
  params,
}: {
  params: Promise<{ school: string; level: string; course: string }>
}) {
  const { school, level, course } = await params
  return <GroupsResult school={school} level={level} course={course} />
}
