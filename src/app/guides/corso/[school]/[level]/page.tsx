import type { Metadata } from "next"
import { getLevel, getSchool } from "@/components/wizard/constants"
import { CourseStep } from "@/components/wizard/course-step"
import type { CourseSearchParams } from "@/components/wizard/types"
import { createStepHref } from "@/utils/step-href"

export const dynamic = "force-dynamic"

const stepHref = createStepHref("/guides/corso")

export async function generateMetadata({
  params,
}: {
  params: Promise<{ school: string; level: string }>
}): Promise<Metadata> {
  const { school: schoolSlug, level: levelSlug } = await params
  const school = getSchool(schoolSlug)
  const level = getLevel(schoolSlug, levelSlug)
  if (!school || !level) return {}

  return {
    title: `${level.name} - ${school.name}`,
    description: `Trova le guide del tuo corso di ${level.name.toLowerCase()} alla ${school.name}.`,
  }
}

export default async function GuidesCoursePage({
  params,
  searchParams,
}: {
  params: Promise<{ school: string; level: string }>
  searchParams: Promise<CourseSearchParams>
}) {
  const { school, level } = await params
  const { campus, lang } = await searchParams
  return (
    <CourseStep school={school} level={level} campus={campus} lang={lang} landingHref="/guides" stepHref={stepHref} />
  )
}
