---
name: bds-deploy
description: >-
  Deploys the BDS Next.js site to Vercel for preview/dev and fly.io for
  production. Use when adding Dockerfile, fly.toml, CI, env secrets, or
  release steps.
---

# BDS deploy

## Targets

| Env | Host | Purpose |
|-----|------|---------|
| Preview / collaborative dev | Vercel | PR previews, fast iteration |
| Production | fly.io | Stable public site |

## Vercel

- Import Git repo; framework Next.js.
- Set public Sanity + site URL env; Resend keys if testing forms on preview.
- Do not treat Vercel as the only production source of truth.

## fly.io outline

1. `Dockerfile` — multi-stage: deps → `next build` → runner with `node server` or standalone.
2. Prefer Next **`output: "standalone"`** in `next.config` for smaller Fly images.
3. `fly.toml` — app name, internal port (`3000`), HTTP service, health check `/` or `/api/health`.
4. Secrets: `fly secrets set RESEND_API_KEY=... CONTACT_TO_EMAIL=...` (+ Sanity if private).
5. `fly deploy`

### Dockerfile sketch

```dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

Adjust if standalone paths differ; verify after first build.

## Checklist before prod

- [ ] `npm run harness`
- [ ] `npm run build` locally
- [ ] Sanity CORS / domains include Fly + Vercel hosts
- [ ] Resend domain verified
- [ ] Phone / Zalo verified on mobile Safari + Android
