import CardText from "@/components/card-text"
import { cn } from "@/lib/utils"
import type { GuideContentProps } from "./types"

export default function GuideContent({ title, description, guides, className }: GuideContentProps) {
  return (
    <section className={cn("mx-auto flex w-full max-w-350 flex-col gap-14", className)}>
      <div className="flex flex-col gap-2 text-start">
        <h3 className="typo-headline-small sm:typo-display-medium w-fit">{title}</h3>
        <p className="typo-body-large text-text-primary">{description}</p>
      </div>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        {guides.map((guide) => (
          <CardText key={guide.text} text={guide.text} />
        ))}
      </div>
    </section>
  )
}
