import type { CardResourceProps } from "../card-resource/types"

export type GuideContentProps = {
  title: string
  description: string
  guides: { text: string }[]
  className?: string
}

export type GuideContentMobileProps = {
  title: string
  guides: CardResourceProps[]
  className?: string
}
