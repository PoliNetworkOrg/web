# Web

This wants to be a rewrite in NextJS (stack below) of all the websites that PoliNetwork currently has.
First, it will be a rewrite of our homepage.

## Stack info

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com) (eventually with shadcn)
- TRPC to connect to backend

## Backend authentication

Backend calls are server-only (`src/lib/backend.ts`). When the PoliNetwork IdP is configured, they carry a
service token for the `website` client (scope `backend:public:read`); without it they are anonymous, which the
backend accepts only while it allows legacy anonymous calls. Set all of these or none (see `.env.example`):

- `IDP_PUBLIC_URL`, and optionally `IDP_INTERNAL_URL` for in-cluster token requests
- `OAUTH_BACKEND_RESOURCE_URI`: the backend's resource identifier, the token's audience
- `OAUTH_WEBSITE_CLIENT_ID` and `OAUTH_WEBSITE_PRIVATE_JWK` (secret): the client and its private signing key as a JWK

`groups.search.*` stays anonymous until the backend accepts the website's token there.

## Contributing
If you are contributing, you may check [GUIDES.md](./GUIDES.md)
