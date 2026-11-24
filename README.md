# Web

PoliNetwork's public website, [polinetwork.org](https://polinetwork.org).

## Stack info

- [TanStack Start](https://tanstack.com/start) (React, server-rendered) on [Vite+](https://viteplus.dev), served by Nitro
- [Tailwind CSS](https://tailwindcss.com) with shadcn components
- TRPC to connect to backend

## Development

```sh
pnpm install
cp .env.example .env   # then fill in the IdP variables
pnpm dev               # http://localhost:3002
```

`pnpm build` writes the production server to `.output`; `pnpm start` runs it. `pnpm check`, `pnpm typecheck` and
`pnpm test` are what CI runs.

## Images

Photos and logos in `src/assets` are imported with `?img` and rendered with `Image` (`src/components/image.tsx`). The
site serves resized WebP copies that sit next to each file (`photo.640w.webp`…), not the file itself. They are written
by `pnpm images` and committed: list a new image in `scripts/optimize-images.mjs`, run the script, commit the copies.
Images uploaded from the admin dashboard (project and association logos) are shown as uploaded.

## Backend authentication

Backend calls are server-only (`src/lib/backend.server.ts`) and carry a service token for the `website` client (scope
`backend:public:read`): the backend refuses calls without one. These variables are required (see `.env.example`):

- `IDP_PUBLIC_URL`, and optionally `IDP_INTERNAL_URL` for in-cluster token requests
- `OAUTH_BACKEND_RESOURCE_URI`: the backend's resource identifier, the token's audience
- `OAUTH_WEBSITE_CLIENT_ID` and `OAUTH_WEBSITE_PRIVATE_JWK` (secret): the client and its private signing key as a JWK

## Contributing
If you are contributing, you may check [GUIDES.md](./GUIDES.md)

## Freshman content

`/matricole` reads resources, Telegram links and the five selected FAQs from `web.freshman.getContent`
through the existing server-only website client. The route renders at request time so admin changes are
visible on subsequent page loads. Titles, introductory text, group headings and responsive layout remain fixed.
Cards resolve their icons from the backend's allowlist; empty destinations remain non-clickable placeholders.
FAQ answers are rendered as text in the existing accordion. If content cannot be loaded, the page keeps its
intro and displays an unavailable message instead of static fallback data.

This integration requires a running backend with the Freshman router and migration. The pinned
`@polinetwork/backend@1.4.0` does not yet include the Freshman type contract: once the updated package is
published, update the dependency and lockfile, then run `pnpm check`, `pnpm typecheck` and `pnpm build`.
Until then, typecheck reports the missing contract. No temporary declaration patches are included.
