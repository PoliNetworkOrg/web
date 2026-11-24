# Published association registry

The association listing accepts the optional `extraLinks` field from the reviewed backend registry. It validates the additive payload and keeps the existing `links` fallback for older backend deployments. Visible labels are shown only for repeated platforms and for Twitch/other links (single links keep the icon-only look); an invalid `extraLinks` payload falls back to the legacy `links` for that association instead of emptying the list. Multiple entries for the same platform have their own visible labels, including unsupported platforms with a generic web icon. Public email remains a mail link.

## Programmes, campuses and contacts

The backend may add `programmes` and `campuses` (each `{ slug, nameIt, nameEn }`), `crossProgramme` and approved public `contacts` (`function`, `label`, `email`, optional `name` and `phone`). `src/lib/association-registry.ts` validates each field on its own: an absent field (current backend, or the published SDK types) or a malformed one is dropped, never the association. The page offers "Tutti i corsi" and "Tutte le sedi" filters only when some association lists them; options come from the published associations. Filters live in the URL (`?corso=…&sede=…`) and are applied on the server; an unknown value is ignored. A cross-programme association matches every programme; an association that lists nothing for a filtered dimension does not match it. Programmes, campuses and public contacts appear under the description.

`pnpm test` runs the Node tests in `tests/` (parsing and filters included).

The public page links representatives to `/dashboard/associations` on `ADMIN_URL` (default `https://admin.polinetwork.org`). Registration, representative approvals, private evidence and draft content belong to the backend/admin portal; this website receives only the approved public version.

Reviewed external logo URLs are loaded by the browser as they are: the site has no server-side image optimizer, so it never fetches arbitrary remote images. Bundled static images keep their pre-resized copies.

This PR can deploy before the coordinated backend/admin release. Run `pnpm check`, `pnpm build`, `pnpm typecheck` and `pnpm test`. The backend tests cover publication gating, preservation of existing associations and numeric IDs. In staging, confirm existing associations, repeated platform links and labels, and logo display after content approval.
