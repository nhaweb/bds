#!/usr/bin/env node
/**
 * Ensures .env.example documents required keys; fails if .env is tracked by git.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import { exists, issue, ok, rel, strict } from "./lib.mjs";

const REQUIRED_KEYS = [
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "NEXT_PUBLIC_SITE_URL",
  "RESEND_API_KEY",
  "CONTACT_TO_EMAIL",
  "CONTACT_FROM_EMAIL",
];

let failures = 0;
let warnings = 0;

console.log(`\n[harness:env] strict=${strict}\n`);

if (!exists(".env.example")) {
  const r = issue("missing .env.example", { soft: true });
  if (r === "fail") failures++;
  else warnings++;
} else {
  const text = fs.readFileSync(rel(".env.example"), "utf8");
  ok(".env.example present");
  for (const key of REQUIRED_KEYS) {
    if (text.includes(key)) ok(`documents ${key}`);
    else {
      const r = issue(`.env.example missing key: ${key}`, { soft: true });
      if (r === "fail") failures++;
      else warnings++;
    }
  }
}

// Fail if .env is tracked
try {
  const tracked = execSync("git ls-files --error-unmatch .env", {
    cwd: rel("."),
    stdio: ["ignore", "pipe", "ignore"],
  })
    .toString()
    .trim();
  if (tracked) {
    const r = issue(".env is tracked by git — untrack and keep secrets local", {
      soft: false,
    });
    if (r === "fail") failures++;
  }
} catch {
  ok(".env not tracked (or absent)");
}

if (exists(".env") && !fs.readFileSync(rel(".gitignore"), "utf8").includes(".env")) {
  const r = issue(".gitignore should include .env", { soft: false });
  if (r === "fail") failures++;
} else if (exists(".gitignore")) {
  ok(".gitignore covers env files (assumed via .env rule)");
}

if (failures) {
  console.error(`\nenv: ${failures} failure(s)\n`);
  process.exit(1);
}

console.log(
  `\nenv: ok${warnings ? ` (${warnings} bootstrap warning(s))` : ""}\n`,
);
