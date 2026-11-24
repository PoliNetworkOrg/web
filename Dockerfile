FROM node:24-alpine AS base

# Install the dependencies and build the site
FROM base AS builder
WORKDIR /app
RUN corepack enable pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm i --frozen-lockfile
COPY . .
RUN pnpm run build

# Production image: the build output bundles the server and the dependencies it needs at runtime,
# so the image holds neither node_modules nor the sources
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Public origin for absolute URLs in metadata, robots.txt and the sitemap, read when the server starts; empty falls
# back to https://polinetwork.org. Still accepted as a build argument, so existing build commands keep working.
ARG SITE_URL
ENV SITE_URL=${SITE_URL}

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 web

COPY --from=builder --chown=web:nodejs /app/.output ./.output

USER web

EXPOSE 3000
ENV PORT=3000
ENV HOST="0.0.0.0"
CMD ["node", ".output/server/index.mjs"]
