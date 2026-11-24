# Agent instructions

## Git commits

Use Conventional Commits for every commit message:

```text
<type>[optional scope][!]: <description>
```

Choose an accurate type such as `feat`, `fix`, `docs`, `refactor`, `test`,
`build`, `ci`, or `chore`. Add a body when the change needs context. Mark
breaking changes with `!` or a `BREAKING CHANGE:` footer.

## Framework

The site runs on [TanStack Start](https://tanstack.com/start) (React, file routes in `src/routes`) built with Vite+.
Its APIs change often: read the guides shipped with the installed version before writing code, under
`node_modules/@tanstack/*/skills/` (start with `react-start` and `router-core`).

- Every component runs on the server and in the browser. Code that must stay on the server (the backend client, the
  environment, secrets) lives in `*.server.ts` files, which the build refuses to put in the browser bundle, and is
  reached through the server functions in `src/queries/functions.ts`.
- A route loads its data in `loader` by calling a server function, sets its `<head>` with `pageMeta` from
  `src/lib/seo.ts`, and answers 404 by throwing `notFound()` from the loader.
- Import images with `?img` and render them with `Image` from `src/components/image.tsx`; link inside the site with
  `Link` from `src/components/link.tsx`.
- After adding or replacing a photo in `src/assets`, list it in `scripts/optimize-images.mjs` and run `pnpm images`.

