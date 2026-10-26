import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const root = path.resolve(__dirname, "../..");

export const strict =
  process.env.HARNESS_STRICT === "1" || process.argv.includes("--strict");

export function rel(p) {
  return path.join(root, p);
}

export function exists(p) {
  return fs.existsSync(rel(p));
}

export function readJson(p) {
  return JSON.parse(fs.readFileSync(rel(p), "utf8"));
}

export function ok(msg) {
  console.log(`  ✓ ${msg}`);
}

export function warn(msg) {
  // Use stdout so suite lines stay ordered with ok/fail (stderr interleaves on Windows).
  console.log(`  ⚠ ${msg}`);
}

export function fail(msg) {
  console.log(`  ✗ ${msg}`);
}

export function issue(msg, { soft = false } = {}) {
  if (soft && !strict) {
    warn(`${msg} (bootstrap — set HARNESS_STRICT=1 or --strict to fail)`);
    return "warn";
  }
  fail(msg);
  return "fail";
}

/** Flatten nested object keys as dot paths. */
export function flattenKeys(obj, prefix = "") {
  const keys = [];
  if (obj === null || typeof obj !== "object" || Array.isArray(obj)) {
    return prefix ? [prefix] : [];
  }
  for (const [k, v] of Object.entries(obj)) {
    const next = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === "object" && !Array.isArray(v)) {
      keys.push(...flattenKeys(v, next));
    } else {
      keys.push(next);
    }
  }
  return keys;
}
