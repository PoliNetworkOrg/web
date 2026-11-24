import { createFileRoute, notFound } from "@tanstack/react-router"
import { getSchool } from "@/components/wizard/constants"
import { LevelStep } from "@/components/wizard/level-step"
import { DYNAMIC_PAGE_HEADERS, pageMeta } from "@/lib/seo"
import { createStepHref } from "@/utils/step-href"

const stepHref = createStepHref("/gruppi/didattica")

export const Route = createFileRoute("/gruppi/didattica/$school/")({
  loader: ({ params }) => {
    if (!getSchool(params.school)) throw notFound()
  },
  head: ({ params }) => {
    const school = getSchool(params.school)
    if (!school) return {}
    return {
      meta: pageMeta({ title: school.name, description: `Trova i gruppi Telegram e WhatsApp della ${school.name}.` }),
    }
  },
  headers: () => DYNAMIC_PAGE_HEADERS,
  component: LevelPage,
})

function LevelPage() {
  const { school } = Route.useParams()
  return <LevelStep school={school} landingHref="/gruppi" stepHref={stepHref} />
}
