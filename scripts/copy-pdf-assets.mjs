import { cp, mkdir } from "node:fs/promises"
import { createRequire } from "node:module"
import { dirname, join } from "node:path"

// Resolve PDF.js from React-PDF so the renderer and worker always use the same version.
const require = createRequire(import.meta.url)
const reactPdfRequire = createRequire(require.resolve("react-pdf"))
const source = dirname(reactPdfRequire.resolve("pdfjs-dist/package.json"))
const destination = new URL("../public/pdfjs/", import.meta.url)
await mkdir(destination, { recursive: true })
for (const name of ["cmaps", "standard_fonts", "wasm"]) {
  await cp(join(source, name), new URL(name, destination), { recursive: true })
}
await cp(join(source, "build/pdf.worker.min.mjs"), new URL("pdf.worker.min.mjs", destination))
