import Image, { type StaticImageData } from "next/image"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { SectionTitle, sectionContainerClass, sectionTextClass } from "./section"

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
  className?: string
}

/**
 * Heading + copy next to a photo. Stacked (copy, then photo) up to `xl`; from `xl` the two columns keep the
 * 719:611 ratio of the 1728px Figma frame, bottom-aligned.
 */
export function PhotoSection({
  title,
  children,
  image,
  imageClassName,
  frameClassName,
  decorations,
  photoFirst = false,
  className,
}: PhotoSectionProps) {
  return (
    <section className={cn(sectionContainerClass, className)}>
      <div
        className={cn(
          "flex flex-col items-center gap-6 md:items-start md:gap-12 xl:grid xl:items-end xl:gap-x-27",
          photoFirst ? "xl:grid-cols-[611fr_719fr]" : "xl:grid-cols-[719fr_611fr]"
        )}
      >
        <div className={cn("flex w-full flex-col gap-6 md:max-w-179.75 md:gap-3", photoFirst && "xl:order-last")}>
          <SectionTitle>{title}</SectionTitle>
          <div className={cn(sectionTextClass, "flex flex-col gap-5 pb-2 md:gap-3 md:pb-0")}>{children}</div>
        </div>

        <div className={cn("relative w-full md:max-w-152.75 xl:max-w-none", frameClassName)}>
          <div className="absolute inset-0 overflow-hidden rounded-rectangles">
            <Image
              src={image}
              alt=""
              sizes="(min-width: 768px) 611px, 100vw"
              className={cn("absolute max-w-none", imageClassName)}
            />
          </div>
          <div aria-hidden className="@container pointer-events-none absolute inset-0 z-10">
            {decorations}
          </div>
        </div>
      </div>
    </section>
  )
}
