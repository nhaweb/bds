#!/usr/bin/env node
/**
 * Ensures vi/en message files exist and share the same key tree.
 */
import { exists, flattenKeys, issue, ok, readJson, strict } from "./lib.mjs";

let failures = 0;
let warnings = 0;

console.log(`\n[harness:i18n] strict=${strict}\n`);

const viPath = "messages/vi.json";
const enPath = "messages/en.json";

if (!exists(viPath) || !exists(enPath)) {
  if (!exists(viPath)) {
    const r = issue(`missing ${viPath}`, { soft: true });
    if (r === "fail") failures++;
    else warnings++;
  }
  if (!exists(enPath)) {
    const r = issue(`missing ${enPath}`, { soft: true });
    if (r === "fail") failures++;
    else warnings++;
  }
  if (failures) {
    console.error(`\ni18n: ${failures} failure(s)\n`);
    process.exit(1);
  }
  console.log(
    `\ni18n: skipped parity (bootstrap — create messages first)${warnings ? "" : ""}\n`,
  );
  process.exit(0);
}

const vi = readJson(viPath);
const en = readJson(enPath);
const viKeys = new Set(flattenKeys(vi));
const enKeys = new Set(flattenKeys(en));

ok(`${viPath} (${viKeys.size} keys)`);
ok(`${enPath} (${enKeys.size} keys)`);

const onlyVi = [...viKeys].filter((k) => !enKeys.has(k)).sort();
const onlyEn = [...enKeys].filter((k) => !viKeys.has(k)).sort();

if (onlyVi.length === 0 && onlyEn.length === 0) {
  ok("vi/en key trees match");
} else {
  for (const k of onlyVi) {
    const r = issue(`key in vi missing in en: ${k}`, { soft: false });
    if (r === "fail") failures++;
  }
  for (const k of onlyEn) {
    const r = issue(`key in en missing in vi: ${k}`, { soft: false });
    if (r === "fail") failures++;
  }
}

if (failures) {
  console.error(`\ni18n: ${failures} failure(s)\n`);
  process.exit(1);
}

console.log("\ni18n: ok\n");
