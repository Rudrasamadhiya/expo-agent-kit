// Checks every internal link, asset and #anchor in the static export.
// Usage: node scripts/check-links.mjs [outDir]   (BASE_PATH is honoured)
import fs from "node:fs";
import path from "node:path";

const out = path.resolve(process.argv[2] || "out");
const base = process.env.BASE_PATH || "";
const pages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) walk(f);
    else if (e.name.endsWith(".html")) pages.push(f);
  }
})(out);

const ids = new Map();
const idsOf = (file) => {
  if (!ids.has(file)) {
    const html = fs.readFileSync(file, "utf8");
    ids.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return ids.get(file);
};

function resolve(urlPath) {
  if (base && !urlPath.startsWith(base + "/") && urlPath !== base) return null;
  const rel = decodeURIComponent(urlPath.slice(base.length)).replace(/^\//, "");
  const target = path.join(out, rel);
  if (rel === "" || rel.endsWith("/")) return path.join(target, "index.html");
  if (fs.existsSync(target) && fs.statSync(target).isFile()) return target;
  if (fs.existsSync(target + ".html")) return target + ".html";
  return target;
}

const errors = [];
let checked = 0;
for (const page of pages) {
  const html = fs.readFileSync(page, "utf8");
  const where = path.relative(out, page);
  for (const [, attr, raw] of html.matchAll(/\s(href|src)="([^"]+)"/g)) {
    const url = raw.replace(/&amp;/g, "&");
    if (/^(https?:|mailto:|data:|javascript:|\/\/)/.test(url)) continue;
    checked++;
    const [p, hash] = url.split("#");
    let file = page;
    if (p) {
      if (!p.startsWith("/")) { errors.push(`${where}: relative ${attr} "${url}"`); continue; }
      file = resolve(p.split("?")[0]);
      if (!file) { errors.push(`${where}: "${url}" is missing base path "${base}"`); continue; }
      if (!fs.existsSync(file)) { errors.push(`${where}: broken ${attr} "${url}"`); continue; }
    }
    if (hash && file.endsWith(".html") && !idsOf(file).has(decodeURIComponent(hash))) errors.push(`${where}: missing anchor "${url}"`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  console.error(`\n${errors.length} problem(s) in ${checked} links across ${pages.length} pages`);
  process.exit(1);
}
console.log(`check-links: ${checked} links across ${pages.length} pages OK`);
