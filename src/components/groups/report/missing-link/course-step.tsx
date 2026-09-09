import { CardCourse } from "@/components/card-course"
import { Spinner } from "@/components/spinner"
import { Button } from "@/components/ui/button"
import { DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { humanizeSlug } from "@/utils/labels"

export function CourseStep({
  path,
  courses,
  onBack,
  onSelectCourse,
  onSpecifyMissing,
}: {
  path: string
  courses: string[] | null
  onBack: () => void
  onSelectCourse: (course: string) => void
  onSpecifyMissing: () => void
}) {
  return (
    <>
      <DialogHeader title="Segnala link mancante" onBack={onBack}>
        <DialogDescription>{path}</DialogDescription>
      </DialogHeader>
      <div className="flex max-h-68 flex-col gap-3 overflow-y-auto pr-1">
        {courses ? (
          courses.length > 0 ? (
            courses.map((course) => (
              <button
                key={course}
                type="button"
                className="rounded-rectangles text-left focus-visible:ring-2 focus-visible:ring-blue-primary"
                onClick={() => onSelectCourse(course)}
              >
                <CardCourse courseName={humanizeSlug(course)} />
              </button>
            ))
          ) : (
            <p className="typo-body-medium text-text-secondary">Nessun corso disponibile al momento.</p>
          )
        ) : (
          <div className="flex justify-center py-8">
            <Spinner className="fill-blue-primary text-blue-primary/20" />
          </div>
        )}
      </div>
      <DialogFooter>
        <Button variant="primary" onClick={onSpecifyMissing}>
          Specifica il gruppo mancante
        </Button>
      </DialogFooter>
    </>
  )
}
