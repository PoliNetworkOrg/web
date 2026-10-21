import type { Metadata } from "next"
import { getSchool } from "@/components/wizard/constants"
import { LevelStep } from "@/components/wizard/level-step"
import { createStepHref } from "@/utils/step-href"

const stepHref = createStepHref("/guides/corso")

export async function generateMetadata({ params }: { params: Promise<{ school: string }> }): Promise<Metadata> {
  const { school: schoolSlug } = await params
  const school = getSchool(schoolSlug)
  if (!school) return {}

  return {
    title: school.name,
    description: `Trova le guide della ${school.name}.`,
  }
}

export default async function GuidesLevelPage({ params }: { params: Promise<{ school: string }> }) {
  const { school } = await params
  return <LevelStep school={school} landingHref="/guides" stepHref={stepHref} />
}
