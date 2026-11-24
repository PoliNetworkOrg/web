import { Image, type ImageSource } from "@/components/image"

type CardMediaImageProps = { src: ImageSource; className: string } & (
  | { fill: true; sizes: string; width?: never; height?: never }
  | { fill?: false; sizes?: never; width: number; height: number }
)

/** Renders a card-media icon that's an image (imported, or its URL), as opposed to a `GradientIconType` component. */
export function CardMediaImage(props: CardMediaImageProps) {
  const { src, className } = props
  if (props.fill) {
    return <Image src={src} alt="" fill sizes={props.sizes} className={className} />
  }
  return <Image src={src} alt="" width={props.width} height={props.height} className={className} />
}
