import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { bridgeTools, videoTools } from "@/content/reference";
import { docsNav, flatNav, site } from "@/content/site";

const unique = (xs: string[]) => new Set(xs).size === xs.length;

describe("tool reference", () => {
  it("lists every bridge and video tool once", () => {
    expect(bridgeTools).toHaveLength(17);
    expect(videoTools).toHaveLength(10);
    expect(unique([...bridgeTools, ...videoTools].map((t) => t.name))).toBe(true);
  });

  it("documents every tool and parameter", () => {
    for (const t of [...bridgeTools, ...videoTools]) {
      expect(t.summary, t.name).toBeTruthy();
      expect(unique(t.params.map((p) => p.name)), t.name).toBe(true);
      for (const p of t.params) expect(p.type && p.desc, `${t.name}.${p.name}`).toBeTruthy();
    }
  });
});

describe("docs navigation", () => {
  it("has unique, trailing-slash routes", () => {
    expect(unique(flatNav.map((i) => i.href))).toBe(true);
    for (const i of flatNav) expect(i.href).toMatch(/^\/docs\/([a-z-]+\/)*$/);
  });

  it("points only at pages that exist", () => {
    for (const i of flatNav) {
      const file = path.join("src/app", i.href, "page.tsx");
      expect(fs.existsSync(file), file).toBe(true);
    }
  });

  it("groups both libraries", () => {
    expect(docsNav.map((g) => g.title)).toEqual(expect.arrayContaining(["expo-mcp-bridge", "expo-launch-video"]));
  });
});

describe("site metadata", () => {
  it("uses semver versions and GitHub/npm links", () => {
    expect(site.versions.bridge).toMatch(/^\d+\.\d+\.\d+$/);
    expect(site.versions.video).toMatch(/^\d+\.\d+\.\d+$/);
    for (const url of Object.values(site.repos)) expect(url).toMatch(/^https:\/\/github\.com\/Rudrasamadhiya\//);
  });
});
