"use client";
import { useSyncExternalStore } from "react";

export const themes = [
  { id: "dark", name: "Midnight", swatch: ["#0B0B0B", "#FF2DA8", "#D4FF3F"] },
  { id: "ivory", name: "Ivory", swatch: ["#FBF8EE", "#0B8A5C", "#E34234"] },
] as const;

// The theme lives on <html data-theme> (set before paint by the layout script).
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
const getTheme = () => document.documentElement.dataset.theme || "dark";

/** Switches between Midnight and Ivory and remembers the choice. */
export function ThemeToggle() {
  const id = useSyncExternalStore(subscribe, getTheme, () => null);
  const index = Math.max(0, themes.findIndex((t) => t.id === id));
  const current = themes[index];
  const next = themes[(index + 1) % themes.length];
  const choose = () => {
    document.documentElement.dataset.theme = next.id;
    try { localStorage.setItem("theme", next.id); } catch {}
  };
  return (
    <button
      type="button"
      onClick={choose}
      aria-label={id ? `Theme: ${current.name}. Switch to ${next.name}` : "Switch theme"}
      title={id ? `${current.name} theme — click for ${next.name}` : undefined}
      className="flex h-9 items-center gap-2 rounded-lg border border-line px-2.5 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-text"
    >
      <span className="relative flex" aria-hidden>
        {(id ? current.swatch : ["transparent", "transparent", "transparent"]).map((c, i) => (
          <span key={i} className="-ml-1 size-3.5 rounded-full border border-line first:ml-0" style={{ background: c }} />
        ))}
      </span>
      <span className="hidden lg:inline">{id ? current.name : ""}</span>
    </button>
  );
}
