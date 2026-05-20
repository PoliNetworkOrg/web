import CardText from "@/components/card-text"
import type { GuideGeneralProps } from "./types"

export default function GuideContent({ title, description, guides }: GuideGeneralProps) {
    return (
        <section className="mx-auto flex w-full max-w-350 flex-col gap-14">
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
