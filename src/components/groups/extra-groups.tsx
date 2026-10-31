import { CardCourseGroup } from "@/components/card-course-group"
import { FLOW_MAIN, FlowHeader } from "@/components/layout/flow-header"
import { EMPTY_STATE } from "@/components/layout/page"
import { getVisibleGroups } from "@/queries/groups"
import { EXTRA_LABEL, matchesLabelBranch } from "@/utils/labels"
import { mergeGroupsByTitle } from "@/utils/merge-groups"

export async function ExtraGroups() {
  const groups = await getVisibleGroups()
  const extraGroups = mergeGroupsByTitle(groups.filter((g) => matchesLabelBranch(g.labels, EXTRA_LABEL))).sort((a, b) =>
    a.title.localeCompare(b.title)
  )

  return (
    <main className={FLOW_MAIN}>
      <FlowHeader title="Gruppi Extra" backHref="/groups" />

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
        <p className={EMPTY_STATE}>Nessun gruppo extra disponibile al momento.</p>
      )}
    </main>
  )
}
