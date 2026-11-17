# Published association registry

The association listing accepts the optional `extraLinks` field from the reviewed backend registry. It validates the additive payload and keeps the existing `links` fallback for older backend deployments. Visible labels are shown only for repeated platforms and for Twitch/other links (single links keep the icon-only look); an invalid `extraLinks` payload falls back to the legacy `links` for that association instead of emptying the list. Multiple entries for the same platform have their own visible labels, including unsupported platforms with a generic web icon. Public email remains a mail link.

The public page links representatives to `/dashboard/associations` on `ADMIN_URL` (default `https://admin.polinetwork.org`). Registration, representative approvals, private evidence and draft content belong to the backend/admin portal; this website receives only the approved public version.

Reviewed external logo URLs are rendered without Next's server-side image optimization, avoiding arbitrary remote fetches through the image optimizer. Bundled static images retain optimization.

This PR can deploy before the coordinated backend/admin release. Run `pnpm check`, `pnpm build`, and `pnpm typecheck`. The backend tests cover publication gating, preservation of existing associations and numeric IDs. In staging, confirm existing associations, repeated platform links and labels, and logo display after content approval.
