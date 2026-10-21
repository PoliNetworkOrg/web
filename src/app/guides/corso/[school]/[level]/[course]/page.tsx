import type { Metadata } from "next"
import { GuidesResult } from "@/components/guides/guides-result"
import { getLevel, getSchool } from "@/components/wizard/constants"
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
    title: `${courseName} - Guide`,
    description: `Guide per ${courseName}, ${level.name} alla ${school.name}.`,
  }
}

export default async function GuidesResultPage({
  params,
}: {
  params: Promise<{ school: string; level: string; course: string }>
}) {
  const { school, level, course } = await params
  return <GuidesResult school={school} level={level} course={course} />
}
