#!/usr/bin/env node
/**
 * Verifies intended project folders/files for BDS.
 * Bootstrap: missing paths warn. Strict: fail.
 */
import { exists, issue, ok, strict } from "./lib.mjs";

const requiredSoft = [
  "docs/PRODUCT.md",
  "docs/DESIGN.md",
  "AGENTS.md",
  ".cursor/rules/bds-core.mdc",
  ".cursor/skills/bds-architecture/SKILL.md",
  ".cursor/skills/bds-harness/SKILL.md",
  "scripts/harness/check-all.mjs",
];

const scaffoldTargets = [
  "app",
  "messages/vi.json",
  "messages/en.json",
  "i18n/routing.ts",
  "lib/sanity/client.ts",
  "sanity/schemaTypes",
  "components",
  ".env.example",
];

let failures = 0;
let warnings = 0;

console.log(`\n[harness:structure] strict=${strict}\n`);

for (const p of requiredSoft) {
  if (exists(p)) ok(p);
  else {
    const r = issue(`missing ${p}`, { soft: false });
    if (r === "fail") failures++;
  }
}

console.log("\n  Scaffold targets:");
for (const p of scaffoldTargets) {
  if (exists(p)) ok(p);
  else {
    const r = issue(`missing ${p}`, { soft: true });
    if (r === "fail") failures++;
    if (r === "warn") warnings++;
  }
}

if (failures) {
  console.error(`\nstructure: ${failures} failure(s)\n`);
  process.exit(1);
}

console.log(
  `\nstructure: ok${warnings ? ` (${warnings} bootstrap warning(s))` : ""}\n`,
);
