# Harness learning notes

Generated while walking through the BDS harness learning plan.

## What it is

Node scripts under `scripts/harness/` that validate the project **contract** (folders, deps, i18n keys, env docs). Not Jest/Playwright.

| Mode | Command | Missing scaffold |
|------|---------|------------------|
| Bootstrap | `npm run harness` | ⚠ warn, exit 0 |
| Strict | `npm run harness:strict` | ✗ fail, exit 1 |

## Bootstrap run — warnings logged

### structure (6)

- `messages/vi.json`
- `messages/en.json`
- `i18n/routing.ts`
- `lib/sanity/client.ts`
- `sanity/schemaTypes`
- `components`

### stack (10)

- `next-intl`, `next-sanity`, `@sanity/client`, `@sanity/image-url`
- `gsap`, `lenis`, `motion`, `embla-carousel-react`
- `resend`, `zod`

### i18n

- Skipped parity until message files exist

### env

- All green (`.env.example` keys present, `.env` not tracked)

## Strict backlog (from `npm run harness:strict`)

Exit code **1**; 3 suites failed (structure, stack, i18n). Env stayed green.

Treat every `✗` as a scaffold todo until strict is green:

| Suite | Failures |
|-------|----------|
| structure | messages vi/en, `i18n/routing.ts`, `lib/sanity/client.ts`, `sanity/schemaTypes`, `components` |
| stack | next-intl, Sanity pkgs, gsap, lenis, motion, embla, resend, zod |
| i18n | missing message files (parity not run yet) |

Insight: bootstrap **pass + warnings** = “repo usable while empty”; strict **fail** = “contract not met for CI / done definition”.

## Commands

```bash
npm run harness
npm run harness:strict
npm run harness:structure
npm run harness:stack
npm run harness:i18n
npm run harness:env
npm run harness:skills
```

## Experiments run

| Experiment | Result |
|------------|--------|
| Matching `messages/vi.json` + `en.json` | `harness:i18n` → ✓ 7 keys, trees match |
| Removed `cta.viewApartment` from en | ✗ `key in vi missing in en: cta.viewApartment`, exit 1 |
| Restored key | pass again |
| Stripped `RESEND_API_KEY` from `.env.example` | bootstrap ⚠ missing key; restored → ok |
| `npm i zod` | stack line `✓ zod` (9 remaining product-dep warnings) |

## Script map (read order)

1. **`lib.mjs`** — `strict` from env/`--strict`; `issue({ soft })` → warn vs fail; `flattenKeys` for i18n parity.
2. **`check-structure.mjs`** — `requiredSoft` always hard-fail if missing; `scaffoldTargets` soft until strict.
3. **`check-stack.mjs`** — CORE hard; `EXPECTED` soft; `HARD_FORBIDDEN` always fail if present.
4. **`check-all.mjs`** — `spawnSync(node, each check)` with inherited stdio; aggregates exit codes.
5. **`check-skills.mjs`** — all project skill `SKILL.md` files must exist (added while learning).

## Feedback loop

1. Change code / scaffold
2. Run harness
3. Fix ✗ (and clear ⚠ when aiming for strict)
4. Re-run until pass
