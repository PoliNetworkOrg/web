// Writes the resized copies the site serves for each photo and logo in src/assets (`photo.640w.webp`, …), which
// `import photo from "./photo.jpg?img"` picks up (see tools/vite-image-imports.ts). Run it after adding or replacing an
// image listed below, then commit the copies: `node scripts/optimize-images.mjs`.
//
// The files in src/assets are the masters the copies are made from, never served themselves. A master wider than it
// can ever be shown is shrunk in place first, so the repository doesn't carry camera originals.
import { readdir, rename, rm, stat } from "node:fs/promises"
import { basename, dirname, extname, join } from "node:path"
import sharp from "sharp"

const ASSETS = new URL("../src/assets/", import.meta.url).pathname

/** The widths a browser can ask for, in CSS pixels times the screen's density */
const LADDER = [32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048]
const QUALITY = 75

/**
 * For each image, the narrowest and widest copy worth having: from the smallest box it is shown in on a 1x screen to
 * the largest one on a dense screen (3x on phones, 2x elsewhere). `widths` lists them instead when they aren't a range.
 */
const IMAGES = [
  // Portraits in 224px cards, up to 45vw on phones
  { files: "images/storia/*.jpg", min: 256, max: 1080 },
  // Photos up to the full width of a phone or tablet, a third of a large desktop
  { files: "images/collabora_*.jpg", min: 256, max: 2048 },
  { files: "images/join/members.webp", min: 384, max: 2048 },
  { files: "images/ringraziamenti.webp", min: 384, max: 2048 },
  { files: "images/storia/site-desktop.webp", min: 256, max: 2048 },
  { files: "images/storia/site-mobile.webp", min: 64, max: 828 },
  { files: "images/contact/group.png", min: 384, max: 2048 },
  // Always 224px wide
  { files: "images/join/network-logo.png", min: 256, max: 828 },
  // 180px in the wizard's cards, 24px inline
  { files: "icons/schools/*.png", widths: [32, 48, 256, 384, 640] },
  // 24px in the header
  { files: "images/logo.png", widths: [32, 48] },
]

async function expand(pattern) {
  const dir = join(ASSETS, dirname(pattern))
  const [prefix, suffix] = basename(pattern).split("*")
  if (suffix === undefined) return [join(dir, prefix)]
  const names = await readdir(dir)
  // A copy (`name.640w.webp`) is not a master
  return names
    .filter((name) => name.startsWith(prefix) && name.endsWith(suffix) && !/\.\d+w\.webp$/.test(name))
    .map((name) => join(dir, name))
}

/** Shrinks a master that is wider than its widest copy, keeping its format */
async function shrink(file, width) {
  const format = extname(file).slice(1).replace("jpg", "jpeg")
  const temporary = `${file}.tmp`
  await sharp(file)
    .rotate()
    .resize({ width })
    .toFormat(format, format === "jpeg" ? { quality: 92, mozjpeg: true } : { quality: 92 })
    .toFile(temporary)
  await rename(temporary, file)
}

let total = 0
for (const { files, min, max, widths } of IMAGES) {
  for (const file of await expand(files)) {
    const widest = widths ? Math.max(...widths) : max
    let { width } = await sharp(file).metadata()
    if (width > widest) {
      await shrink(file, widest)
      width = widest
    }

    const stem = join(dirname(file), basename(file, extname(file)))
    for (const name of await readdir(dirname(file))) {
      if (name.startsWith(`${basename(stem)}.`) && /\.\d+w\.webp$/.test(name)) await rm(join(dirname(file), name))
    }

    // Never enlarged: a master narrower than the range ends it with a copy at its own width
    const wanted = (widths ?? LADDER.filter((w) => w >= min && w <= max)).filter((w) => w < width)
    for (const w of [...wanted, width]) {
      const copy = `${stem}.${w}w.webp`
      await sharp(file).rotate().resize({ width: w }).webp({ quality: QUALITY }).toFile(copy)
      total += (await stat(copy)).size
    }
    console.log(`${file.slice(ASSETS.length)}: ${[...wanted, width].join(", ")}`)
  }
}
console.log(`${(total / 1024).toFixed(0)} kB of copies`)
