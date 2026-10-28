import { CardCourseGroup } from "@/components/card-course-group"
import { GROUPS_COLUMN, GroupsPageHeader } from "@/components/groups/page-header"
import { getVisibleGroups } from "@/queries/groups"
import { EXTRA_LABEL, matchesLabelBranch } from "@/utils/labels"
import { mergeGroupsByTitle } from "@/utils/merge-groups"

export async function ExtraGroups() {
  const groups = await getVisibleGroups()
  const extraGroups = mergeGroupsByTitle(groups.filter((g) => matchesLabelBranch(g.labels, EXTRA_LABEL))).sort((a, b) =>
    a.title.localeCompare(b.title)
  )

  return (
    <main className={`${GROUPS_COLUMN} flex min-h-svh flex-col gap-12 pt-36 pb-32 md:gap-16 md:pt-52`}>
      <GroupsPageHeader title="Gruppi Extra" backHref="/groups" />

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
        <p className="typo-body-medium text-center text-text-secondary">Nessun gruppo extra disponibile al momento.</p>
      )}
    </main>
  )
}
