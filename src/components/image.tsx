import type { ComponentProps, CSSProperties } from "react"

/** What `import image from "./file.png?img"` gives (see `tools/vite-image-imports.ts`). */
export type StaticImage = {
  /** The file to load without `srcset`: the largest resized copy, or the file itself when it has none */
  src: string
  /** Intrinsic size of the source file, which reserves the image's space before it loads */
  width: number
  height: number
  /** The resized copies written by `scripts/optimize-images.mjs`, smallest first */
  srcSet?: { src: string; width: number }[]
}

/** An imported image (`?img`), or the URL of a file that is served as it is (`public/`, the backend's uploads) */
export type ImageSource = StaticImage | string

type ImageProps = Omit<ComponentProps<"img">, "src" | "srcSet" | "width" | "height" | "alt" | "loading"> & {
  src: ImageSource
  alt: string
  width?: number
  height?: number
  /** Covers the nearest positioned ancestor instead of taking `width` and `height` */
  fill?: boolean
  /** Loads right away and is preloaded, for an image that is visible when the page opens */
  priority?: boolean
  loading?: "eager" | "lazy"
  /** Always loads the file itself, never a resized copy */
  unoptimized?: boolean
}

const FILL_STYLE: CSSProperties = { position: "absolute", height: "100%", width: "100%", inset: 0 }

/**
 * The copies to offer the browser. With `sizes` it picks by the width the image is laid out at; without, by the
 * screen's pixel density (1x and 2x of `width`: beyond 2x the eye can't tell on phone screens).
 */
function sources(image: StaticImage, width: number | undefined, sizes: string | undefined) {
  const copies = image.srcSet
  const largest = copies?.at(-1)
  if (!copies || !largest) return { src: image.src }
  if (sizes || width === undefined) {
    return {
      src: largest.src,
      srcSet: copies.map((copy) => `${copy.src} ${copy.width}w`).join(", "),
      sizes: sizes ?? "100vw",
    }
  }
  const densities = [...new Set([width, width * 2].map((w) => copies.find((copy) => copy.width >= w) ?? largest))]
  return {
    src: densities.at(-1)?.src ?? largest.src,
    srcSet: densities.map((copy, index) => `${copy.src} ${index + 1}x`).join(", "),
  }
}

/**
 * An `<img>` that never shifts the page while it loads (it always knows its size or fills its box), loads lazily unless
 * told otherwise, and picks among the pre-resized copies of an imported image.
 */
export function Image({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  loading,
  unoptimized = false,
  sizes,
  style,
  decoding = "async",
  ...rest
}: ImageProps) {
  const image = typeof src === "string" ? { src, width: width ?? 0, height: height ?? 0 } : src
  let w = fill ? undefined : width
  let h = fill ? undefined : height
  if (!fill && typeof src !== "string") {
    // Like the intrinsic size, or scaled to the one side that was given
    if (w === undefined && h === undefined) {
      w = image.width
      h = image.height
    } else if (w !== undefined && h === undefined) h = Math.round(image.height * (w / image.width))
    else if (w === undefined && h !== undefined) w = Math.round(image.width * (h / image.height))
  }
  const picked = unoptimized || typeof src === "string" ? { src: image.src } : sources(image, w, sizes)
  const lazy = !priority && loading !== "eager"

  return (
    <>
      {priority && (
        <link
          rel="preload"
          as="image"
          href={picked.srcSet ? undefined : picked.src}
          imageSrcSet={picked.srcSet}
          imageSizes={picked.sizes}
        />
      )}
      <img
        {...rest}
        alt={alt}
        loading={lazy ? "lazy" : loading}
        width={w}
        height={h}
        decoding={decoding}
        style={{ ...(fill ? FILL_STYLE : undefined), color: "transparent", ...style }}
        sizes={picked.sizes}
        srcSet={picked.srcSet}
        src={picked.src}
      />
    </>
  )
}
