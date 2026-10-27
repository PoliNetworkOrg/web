import Image, { type StaticImageData } from "next/image"
import type { ReactNode } from "react"
import { CONTAINER } from "@/components/layout/page"
import { cn } from "@/lib/utils"
import { SectionTitle, sectionTextClass } from "./section"

type PhotoSectionProps = {
  title: ReactNode
  children: ReactNode
  image: StaticImageData
  /** Figma crop of the photo inside its frame (mobile and desktop), as absolute size/offset classes. */
  imageClassName: string
  /** Frame aspect ratio (mobile and desktop) of the photo. */
  frameClassName: string
  /** Decorative shapes Figma draws over the photo. */
  decorations: ReactNode
  /** Photo on the left on desktop. */
  photoFirst?: boolean
}

/**
 * Heading + copy next to a photo. Stacked (copy, then a photo as wide as the copy) on phones and portrait tablets;
 * from `lg` the two columns keep the 719:611 ratio of the 1728px Figma frame, centred on each other so a taller
 * text column doesn't leave the photo hanging at one edge.
 */
export function PhotoSection({
  title,
  children,
  image,
  imageClassName,
  frameClassName,
  decorations,
  photoFirst = false,
}: PhotoSectionProps) {
  return (
    <section className={CONTAINER}>
      <div
        className={cn(
          "flex flex-col items-start gap-8 md:gap-12 lg:grid lg:items-center lg:gap-x-12 xl:gap-x-27",
          photoFirst ? "lg:grid-cols-[611fr_719fr]" : "lg:grid-cols-[719fr_611fr]"
        )}
      >
        <div className={cn("flex w-full flex-col gap-6 md:max-w-179.75 md:gap-3", photoFirst && "lg:order-last")}>
          <SectionTitle>{title}</SectionTitle>
          <div className={cn(sectionTextClass, "flex flex-col gap-5 pb-2 md:gap-3 md:pb-0")}>{children}</div>
        </div>

        <div className={cn("relative w-full md:max-w-179.75 lg:max-w-none", frameClassName)}>
          <div className="absolute inset-0 overflow-hidden rounded-rectangles">
            <Image
              src={image}
              alt=""
              sizes="(min-width: 1024px) 611px, (min-width: 768px) 720px, 100vw"
              className={cn("absolute max-w-none", imageClassName)}
            />
          </div>
          {decorations}
        </div>
      </div>
    </section>
  )
}
