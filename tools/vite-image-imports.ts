import { readdirSync, readFileSync } from "node:fs"
import { basename, dirname, extname, join } from "node:path"
import { imageSize } from "image-size"
import type { Plugin } from "vite"

const QUERY = "?img"
const VARIANT = /\.(\d+)w\.webp$/

/**
 * `import photo from "./photo.jpg?img"` gives `{ src, width, height, srcSet }` (see `StaticImage` in
 * `src/components/image.tsx`) instead of a bare URL, so `<Image>` can reserve the image's space and offer the browser
 * the resized copies that `scripts/optimize-images.mjs` wrote next to it (`photo.640w.webp`, `photo.1080w.webp`…).
 * An image with such copies is never shipped itself: it is only the master they are made from.
 */
export function imageImports(): Plugin {
  return {
    name: "polinetwork:image-imports",
    enforce: "pre",
    async resolveId(source, importer) {
      if (!source.endsWith(QUERY)) return null
      const resolved = await this.resolve(source.slice(0, -QUERY.length), importer, { skipSelf: true })
      return resolved ? `${resolved.id}${QUERY}` : null
    },
    load(id) {
      if (!id.endsWith(QUERY)) return null
      const file = id.slice(0, -QUERY.length)
      this.addWatchFile(file)
      const { width, height } = imageSize(readFileSync(file))
      const stem = basename(file, extname(file))
      const variants = readdirSync(dirname(file))
        .filter((name) => name.startsWith(`${stem}.`) && VARIANT.test(name))
        .map((name) => ({ name, width: Number(VARIANT.exec(name)?.[1]) }))
        .sort((a, b) => a.width - b.width)
      if (variants.length === 0) {
        return `import src from ${JSON.stringify(`${file}?url`)}\nexport default { src, width: ${width}, height: ${height} }\n`
      }
      const imports = variants.map(
        (variant, index) => `import v${index} from ${JSON.stringify(`${join(dirname(file), variant.name)}?url`)}`
      )
      const srcSet = variants.map((variant, index) => `{ src: v${index}, width: ${variant.width} }`)
      const last = variants.length - 1
      return `${imports.join("\n")}\nexport default { src: v${last}, width: ${width}, height: ${height}, srcSet: [${srcSet.join(", ")}] }\n`
    },
  }
}
