#!/usr/bin/env node
/**
 * Runs all BDS harness checks sequentially.
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { strict } from "./lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const checks = [
  "check-structure.mjs",
  "check-stack.mjs",
  "check-i18n.mjs",
  "check-env.mjs",
  "check-skills.mjs",
];

const extraArgs = process.argv.slice(2);
if (strict && !extraArgs.includes("--strict")) extraArgs.push("--strict");

console.log("══════════════════════════════════════");
console.log(" BDS agent harness");
console.log(` mode: ${strict ? "STRICT" : "bootstrap (warnings allowed)"}`);
console.log("══════════════════════════════════════");

let failed = 0;

for (const file of checks) {
  const result = spawnSync(
    process.execPath,
    [path.join(__dirname, file), ...extraArgs],
    { stdio: "inherit" },
  );
  if (result.status !== 0) failed += 1;
}

if (failed) {
  console.error(`\nHarness finished with ${failed} failed suite(s).\n`);
  process.exit(1);
}

console.log("\nHarness passed.\n");
