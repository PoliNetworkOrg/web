import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { nitro } from "nitro/vite"
import { defineConfig, lazyPlugins, loadEnv } from "vite-plus"
import { imageImports } from "./tools/vite-image-imports"

/**
 * The files of `public/`, whose names don't change when their content does: browsers must ask whether their copy is
 * still current. The built files in `/assets` have their content's hash in the name and are cached for good.
 */
const PUBLIC_FILES = [
  "/favicon.ico",
  "/logo.png",
  "/logo.svg",
  "/polinetwork_meta.png",
  "/guida-della-matricola.pdf",
  "/icons/**",
  "/pdfjs/**",
]

export default defineConfig(({ mode }) => {
  // Vite gives `.env` files to the code only as `import.meta.env.VITE_*`. The server reads `process.env`, so the
  // variables are copied there; the ones already set in the environment win.
  for (const [name, value] of Object.entries(loadEnv(mode, process.cwd(), ""))) process.env[name] ??= value

  return {
    resolve: { tsconfigPaths: true },
    // Every image and font is a file with its own URL, cached for good: none is inlined into the pages or the styles
    build: { assetsInlineLimit: 0 },
    plugins: lazyPlugins(() => [
      imageImports(),
      tailwindcss(),
      tanstackStart(),
      nitro({
        plugins: ["./src/server/request-guard.ts"],
        // The built files are also written gzip- and brotli-compressed, and served so to browsers that accept it
        compressPublicAssets: { gzip: true, brotli: true },
        routeRules: Object.fromEntries(
          PUBLIC_FILES.map((path) => [path, { headers: { "Cache-Control": "public, max-age=0" } }])
        ),
      }),
      viteReact({ compiler: true }),
    ]),
    server: { port: Number(process.env.PORT) || 3002 },
  }
})
