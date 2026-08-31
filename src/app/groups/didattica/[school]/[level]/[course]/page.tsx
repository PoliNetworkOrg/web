import type { Metadata } from "next"
import { getLevel, getSchool } from "@/components/groups/constants"
import { GroupsResult } from "@/components/groups/groups-result"
import { humanizeSlug } from "@/utils/labels"

export const dynamic = "force-dynamic"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ school: string; level: string; course: string }>
}): Promise<Metadata> {
  const { school: schoolSlug, level: levelSlug, course } = await params
  const school = getSchool(schoolSlug)
  const level = getLevel(schoolSlug, levelSlug)
  if (!school || !level) return {}

  const courseName = humanizeSlug(course)

  return {
    title: `${courseName} - Gruppi`,
    description: `Gruppi Telegram e WhatsApp per ${courseName}, ${level.name} alla ${school.name}.`,
  }
}

export const dynamic = "force-dynamic"

export default async function DidatticaGroupsResultPage({
  params,
}: {
  params: Promise<{ school: string; level: string; course: string }>
}) {
  const { school, level, course } = await params
  return <GroupsResult school={school} level={level} course={course} />
}
