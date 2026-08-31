import { CourseStep } from "@/components/groups/course-step"
import type { CourseSearchParams } from "@/components/groups/types"

export const dynamic = "force-dynamic"

export default async function DidatticaCoursePage({
  params,
  searchParams,
}: {
  params: Promise<{ school: string; level: string }>
  searchParams: Promise<CourseSearchParams>
}) {
  const { school, level } = await params
  const { campus, lang } = await searchParams
  return <CourseStep school={school} level={level} campus={campus} lang={lang} />
}
