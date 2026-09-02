import { CardResource } from "../card-resource"
import type { GuideContentMobileProps } from "./types"

export default function GuideContent({ title, guides }: GuideContentMobileProps) {
  return (
    <section className="mx-auto flex min-h-screen max-w-400 flex-col items-center justify-center gap-48 px-4 py-49">
      <div className="mx-auto flex w-full flex-col gap-14 sm:w-fit">

        {/* Desktop Grid */}
        <div className="hidden sm:flex w-full flex-col gap-5">
          <div className="flex flex-col items-center gap-2 ">
            <h3 className="text-start sm:typo-display-medium typo-headline-medium w-full">{title}</h3>
          </div>
          <div className="lg:grid-cols-3 justify-items-center gap-5 grid grid-cols-2">
            {guides.map((guide) => (
              <CardResource key={guide.title} {...guide} />
            ))}
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="sm:hidden">
          <div className="flex w-full flex-col gap-5 text-start">
            <p className="typo-title-large">{title}</p>
            {guides.map((guide) => (
              <CardResource key={guide.title} {...guide} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
