"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { site } from "@/content/site";

const links = [
  { href: "/docs/bridge/", label: "Bridge docs" },
  { href: "/docs/video/", label: "Launch Video docs" },
  { href: "/docs/ai-setup/", label: "AI setup" },
];

export function SiteHeader() {
  const pathname = usePathname();
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight" aria-label={`${site.name} home`}>
          <Logo />
          <span>{site.name}</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => {
            const active = pathname?.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href} aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${active ? "text-text bg-bg-2" : "text-muted hover:text-text"}`}>
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <a href={site.repos.bridge} className="hidden rounded-lg border border-line px-3 py-1.5 text-sm text-muted hover:text-text hover:border-accent sm:inline-flex items-center gap-2" aria-label="GitHub">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.8 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.3-3.2c-.2-.3-.6-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2a4.7 4.7 0 0 1 1.3 3.2c0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" /></svg>
            GitHub
          </a>
          <ThemeToggle />
          <button type="button" className="grid size-9 place-items-center rounded-lg border border-line md:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpenOn(open ? null : pathname)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>{open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-line bg-bg px-4 py-3 md:hidden" aria-label="Mobile">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="block rounded-lg px-3 py-2.5 text-muted hover:bg-bg-2 hover:text-text">{l.label}</Link>
          ))}
          <a href={site.repos.bridge} className="block rounded-lg px-3 py-2.5 text-muted hover:bg-bg-2 hover:text-text">GitHub</a>
        </nav>
      )}
    </header>
  );
}
