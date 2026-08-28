import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type HeroProps = {
  title: string
  description: ReactNode
  titleAs?: "h1" | "h2"
  gradientDescription?: boolean
  className?: string
  titleClassName?: string
  descriptionClassName?: string
}

export function Hero({
  title,
  description,
  titleAs = "h2",
  gradientDescription = false,
  className,
  titleClassName,
  descriptionClassName,
}: HeroProps) {
  const Title = titleAs

  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      <Title
        className={cn(
          "typo-display-large sm:typo-display-extralarge w-fit bg-linear-to-b from-text-primary to-text-secondary bg-clip-text py-4 text-transparent sm:py-14",
          titleClassName
        )}
      >
        {title}
      </Title>
      <p
        className={cn(
          "typo-title-large sm:typo-headline-small max-w-2xl text-center text-text-primary",
          gradientDescription &&
            "sm:bg-linear-to-r sm:from-blue-secondary sm:via-text-primary sm:to-blue-secondary sm:bg-clip-text sm:text-transparent",
          descriptionClassName
        )}
      >
        {description}
      </p>
    </div>
  )
}
