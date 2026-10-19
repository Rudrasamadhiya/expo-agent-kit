"use client";
import { useId, useState } from "react";

/** Accessible tabs; panels are pre-rendered (e.g. server-highlighted code) and passed in. */
export function Tabs({ tabs }: { tabs: { label: string; content: React.ReactNode }[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setActive((a) => (a + 1) % tabs.length);
    if (e.key === "ArrowLeft") setActive((a) => (a - 1 + tabs.length) % tabs.length);
  };
  return (
    <div>
      <div role="tablist" aria-label="Install options" className="inline-flex rounded-xl border border-line bg-bg-2 p-1" onKeyDown={onKey}>
        {tabs.map((t, i) => (
          <button key={t.label} role="tab" id={`${id}-tab-${i}`} aria-selected={i === active} aria-controls={`${id}-panel-${i}`} tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`rounded-lg px-4 py-1.5 text-sm transition-colors ${i === active ? "bg-panel text-text shadow" : "text-muted hover:text-text"}`}>
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.label} role="tabpanel" id={`${id}-panel-${i}`} aria-labelledby={`${id}-tab-${i}`} hidden={i !== active}>
          {t.content}
        </div>
      ))}
    </div>
  );
}
