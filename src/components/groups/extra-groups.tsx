import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import { CardCourseGroup } from "@/components/card-course-group"
import { getVisibleGroups } from "@/queries/groups"
import { EXTRA_LABEL, matchesLabelBranch } from "@/utils/labels"
import { mergeGroupsByTitle } from "@/utils/merge-groups"

export async function ExtraGroups() {
  const groups = await getVisibleGroups()
  const extraGroups = mergeGroupsByTitle(groups.filter((g) => matchesLabelBranch(g.labels, EXTRA_LABEL))).sort((a, b) =>
    a.title.localeCompare(b.title)
  )

  return (
    <main className="mx-auto flex min-h-svh w-full min-w-0 max-w-7xl flex-col gap-16 px-6 py-50 md:gap-0">
      <header className="relative flex flex-col items-center gap-1 md:static md:flex-row md:items-center md:gap-4">
        <Link
          href="/groups"
          aria-label="Indietro"
          className="absolute top-0 left-0 grid size-10 shrink-0 place-items-center rounded-full bg-white/60 md:static"
        >
          <FiArrowLeft className="size-5" />
        </Link>
        <div className="flex min-w-0 flex-col items-center gap-1 text-center md:flex-1">
          <h1 className="typo-title-large md:typo-display-medium text-text-primary">Gruppi Extra</h1>
        </div>
      </header>

      {extraGroups.length > 0 ? (
        <div className="flex flex-col gap-3 md:mt-25.75">
          {extraGroups.map((g) => (
            <CardCourseGroup key={g.key} groupName={g.title} waLink={g.waLink} tgLink={g.tgLink} />
          ))}
        </div>
      ) : (
        <p className="typo-body-medium text-center text-text-secondary md:mt-25.75">
          Nessun gruppo extra disponibile al momento.
        </p>
      )}
    </main>
  )
}
