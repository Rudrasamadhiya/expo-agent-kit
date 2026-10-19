// Static export writes route-segment prefetch files as nested folders
// (docs/video/__next.docs/video/__PAGE__.txt) while the client router requests
// a dot-joined name (docs/video/__next.docs.video.__PAGE__.txt). Next's own
// server maps between them; static hosts like GitHub Pages don't. Add the
// dot-joined copies (only when missing) so prefetch and client navigation work.
import fs from "node:fs";
import path from "node:path";

const out = path.resolve(process.argv[2] || "out");
let added = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith("__next.")) fixSegmentDir(dir, full);
      else walk(full);
    }
  }
}

function fixSegmentDir(pageDir, segDir) {
  const stack = [segDir];
  while (stack.length) {
    const d = stack.pop();
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const f = path.join(d, e.name);
      if (e.isDirectory()) { stack.push(f); continue; }
      const rel = path.relative(pageDir, f).split(path.sep).join(".");
      const target = path.join(pageDir, rel);
      if (!fs.existsSync(target)) { fs.copyFileSync(f, target); added++; }
    }
  }
}

if (!fs.existsSync(out)) { console.error(`no export at ${out}`); process.exit(1); }
walk(out);
console.log(`fix-segment-prefetch: added ${added} file(s)`);
