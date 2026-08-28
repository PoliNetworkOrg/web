import { LevelStep } from "@/components/groups/level-step"

export default async function DidatticaLevelPage({ params }: { params: Promise<{ school: string }> }) {
  const { school } = await params
  return <LevelStep school={school} />
}
