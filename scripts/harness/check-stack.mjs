#!/usr/bin/env node
/**
 * Validates package.json against locked stack once deps are added.
 * Bootstrap: core next/react/tailwind required; others soft until installed.
 */
import { exists, issue, ok, readJson, strict } from "./lib.mjs";

const CORE = ["next", "react", "react-dom"];
const EXPECTED = [
  "next-intl",
  "next-sanity",
  "@sanity/client",
  "@sanity/image-url",
  "gsap",
  "lenis",
  "motion",
  "embla-carousel-react",
  "resend",
  "zod",
];

const FORBIDDEN = [
  "shopify",
  "@shopify/hydrogen",
  "stripe",
  "woocommerce",
  "meilisearch", // not forbidden forever — flag only if user didn't ask; skip hard forbid
];

// Hard-forbid commerce / booking that contradict product
const HARD_FORBIDDEN = ["stripe", "@stripe/stripe-js", "shopify-buy"];

let failures = 0;
let warnings = 0;

console.log(`\n[harness:stack] strict=${strict}\n`);

if (!exists("package.json")) {
  issue("package.json missing", { soft: false });
  process.exit(1);
}

const pkg = readJson("package.json");
const deps = { ...pkg.dependencies, ...pkg.devDependencies };

for (const name of CORE) {
  if (deps[name]) ok(`core ${name}@${deps[name]}`);
  else {
    const r = issue(`missing core dependency: ${name}`, { soft: false });
    if (r === "fail") failures++;
  }
}

if (deps.tailwindcss) ok(`tailwindcss@${deps.tailwindcss}`);
else {
  const r = issue("missing tailwindcss", { soft: false });
  if (r === "fail") failures++;
}

console.log("\n  Expected product stack:");
for (const name of EXPECTED) {
  if (deps[name]) ok(name);
  else {
    const r = issue(`not installed yet: ${name}`, { soft: true });
    if (r === "fail") failures++;
    if (r === "warn") warnings++;
  }
}

console.log("\n  Forbidden commerce:");
for (const name of HARD_FORBIDDEN) {
  if (deps[name]) {
    const r = issue(`forbidden dependency for inquiry-only site: ${name}`, {
      soft: false,
    });
    if (r === "fail") failures++;
  } else {
    ok(`no ${name}`);
  }
}

// silence unused
void FORBIDDEN;

if (failures) {
  console.error(`\nstack: ${failures} failure(s)\n`);
  process.exit(1);
}

console.log(
  `\nstack: ok${warnings ? ` (${warnings} bootstrap warning(s))` : ""}\n`,
);
