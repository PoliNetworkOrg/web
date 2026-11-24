import { CardCourseGroup } from "@/components/card-course-group"
import { FLOW_MAIN, FlowHeader } from "@/components/layout/flow-header"
import { EMPTY_STATE } from "@/components/layout/page"
import type { MergedGroup } from "@/utils/merge-groups"

/** `groups`: the extra groups, already merged by title and sorted (see `fetchExtraGroups`) */
export function ExtraGroups({ groups: extraGroups }: { groups: MergedGroup[] }) {
  return (
    <main className={FLOW_MAIN}>
      <FlowHeader title="Gruppi Extra" backHref="/gruppi" />

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
