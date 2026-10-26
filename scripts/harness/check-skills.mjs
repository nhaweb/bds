#!/usr/bin/env node
/**
 * Verifies every BDS project skill has a SKILL.md.
 * Always hard-fail if missing (skills are part of the agent contract).
 */
import { exists, fail, ok, strict } from "./lib.mjs";

const SKILLS = [
  "bds-architecture",
  "bds-design",
  "bds-sanity",
  "bds-motion",
  "bds-i18n",
  "bds-contact",
  "bds-deploy",
  "bds-harness",
];

let failures = 0;

console.log(`\n[harness:skills] strict=${strict}\n`);

for (const name of SKILLS) {
  const p = `.cursor/skills/${name}/SKILL.md`;
  if (exists(p)) ok(p);
  else {
    fail(`missing skill: ${p}`);
    failures++;
  }
}

if (!exists(".cursor/skills/README.md")) {
  fail("missing .cursor/skills/README.md");
  failures++;
} else {
  ok(".cursor/skills/README.md");
}

if (failures) {
  console.error(`\nskills: ${failures} failure(s)\n`);
  process.exit(1);
}

console.log("\nskills: ok\n");
