import { getLevel, getSchool } from "@/components/groups/constants"
import type { MissingLinkTarget } from "@/components/groups/report/missing-link/types"
import { courseLabel, humanizeSlug, levelLabel, schoolLabel } from "@/utils/labels"

export function missingLinkTargetFromPath(pathname: string): MissingLinkTarget | undefined {
  if (pathname === "/groups/extra") {
    return { category: "extra", label: "Gruppi Extra", path: "Gruppi Extra" }
  }

  const [, groups, category, schoolSlug, levelSlug, course] = pathname.split("/")
  if (groups !== "groups" || category !== "didattica" || !schoolSlug) return undefined

  const school = getSchool(schoolSlug)
  if (!school) return undefined
  if (!levelSlug) {
    return { category: "didattica", label: schoolLabel(schoolSlug), path: school.name }
  }

  const level = getLevel(schoolSlug, levelSlug)
  if (!level) return undefined
  if (!course) {
    return {
      category: "didattica",
      label: levelLabel(schoolSlug, levelSlug),
      path: `${school.name} · ${level.name}`,
    }
  }

  return {
    category: "didattica",
    label: courseLabel(schoolSlug, levelSlug, course),
    path: `${school.name} · ${level.name} · ${humanizeSlug(course)}`,
  }
}
