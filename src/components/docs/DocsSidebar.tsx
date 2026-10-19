"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { docsNav } from "@/content/site";

export function DocsSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = docsNav.flatMap((g) => g.items).find((i) => i.href === pathname);
  const nav = (
    <nav aria-label="Documentation">
      {docsNav.map((g) => (
        <div key={g.title} className="mb-6">
          <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted">{g.title}</h2>
          <ul className="space-y-0.5">
            {g.items.map((i) => {
              const active = pathname === i.href;
              return (
                <li key={i.href}>
                  <Link href={i.href} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-1.5 text-sm transition-colors ${active ? "bg-accent/12 font-semibold text-accent-ink" : "text-muted hover:bg-bg-2 hover:text-text"}`}>
                    {i.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
  return (
    <>
      <div className="mb-6 lg:hidden">
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open}
          className="flex w-full items-center justify-between rounded-xl border border-line bg-panel px-4 py-2.5 text-sm">
          <span>{current?.title || "Documentation"}</span><span aria-hidden>{open ? "▴" : "▾"}</span>
        </button>
        {open && <div className="mt-2 rounded-xl border border-line bg-panel p-3">{nav}</div>}
      </div>
      <aside className="sticky top-20 hidden max-h-[calc(100vh-6rem)] overflow-y-auto pb-8 lg:block">{nav}</aside>
    </>
  );
}
