---
name: bds-harness
description: >-
  Runs and extends the BDS agent validation harness (structure, stack, i18n,
  env example). Use after scaffolding, before PRs, or when adding checks the
  agent must pass.
---

# BDS harness

## Commands

```bash
npm run harness           # all checks
npm run harness:structure
npm run harness:stack
npm run harness:i18n
npm run harness:env
npm run harness:skills
```

Agent rule: after changing folders, deps, messages, skills, or `.env.example`, run `npm run harness` and fix failures before continuing.

## What each check does

| Script | Pass criteria |
|--------|----------------|
| `check-structure.mjs` | Required paths exist (or soft-warn until scaffolded — see script phases) |
| `check-stack.mjs` | `package.json` lists locked stack deps when present; flags forbidden commerce libs |
| `check-i18n.mjs` | `messages/vi.json` & `en.json` exist with identical key trees |
| `check-env.mjs` | `.env.example` documents required keys; no `.env` committed |
| `check-skills.mjs` | All eight `.cursor/skills/*/SKILL.md` plus skills README exist |

## Phases

Harness supports **bootstrap** vs **strict**:

- If `messages/` or `sanity/` missing → structure check **warns** (exit 0) but prints next steps.
- Set `HARNESS_STRICT=1` (CI / post-scaffold) → missing required paths **fail**.

```bash
HARNESS_STRICT=1 npm run harness
```

## Extending

1. Add `scripts/harness/check-<name>.mjs` exporting nothing — runnable via `node`.
2. Use shared helpers from `scripts/harness/lib.mjs` (`fail`, `warn`, `ok`, `readJson`).
3. Register in `scripts/harness/check-all.mjs` and `package.json`.

## Agent feedback loop

1. Implement change
2. `npm run harness`
3. If fail → read stderr → fix → re-run
4. Only then move to the next feature
