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
    <main className="page-layout flex min-h-svh min-w-0 flex-col items-center">
      <div className="flex w-full min-w-0 max-w-7xl flex-col gap-block">
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
          <div className="flex flex-col gap-3">
            {extraGroups.map((g) => (
              <CardCourseGroup
                key={g.key}
                groupName={g.title}
                waLink={g.waLink}
                waGroupId={g.waGroupId}
                tgLink={g.tgLink}
                tgGroupId={g.tgGroupId}
              />
            ))}
          </div>
        ) : (
          <p className="typo-body-medium text-center text-text-secondary">
            Nessun gruppo extra disponibile al momento.
          </p>
        )}
      </div>
    </main>
  )
}
