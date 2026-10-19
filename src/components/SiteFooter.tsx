import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/content/site";

const columns = [
  { title: "Bridge", links: [
    { label: "Overview", href: "/docs/bridge/" },
    { label: "Installation", href: "/docs/bridge/installation/" },
    { label: "Connect your agent", href: "/docs/bridge/agents/" },
    { label: "Tools reference", href: "/docs/bridge/tools/" },
  ] },
  { title: "Launch video", links: [
    { label: "Overview", href: "/docs/video/" },
    { label: "Making a video", href: "/docs/video/workflow/" },
    { label: "The studio", href: "/docs/video/studio/" },
    { label: "Tools reference", href: "/docs/video/tools/" },
  ] },
  { title: "Project", links: [
    { label: "One-shot AI setup", href: "/docs/ai-setup/" },
    { label: "Changelog", href: "/docs/changelog/" },
    { label: "License & credits", href: "/docs/license/" },
  ] },
  { title: "Elsewhere", links: [
    { label: "GitHub · bridge", href: site.repos.bridge },
    { label: "GitHub · launch-video", href: site.repos.video },
    { label: "npm · expo-mcp-bridge", href: site.npm.bridge },
    { label: "npm · expo-launch-video", href: site.npm.video },
  ] },
];

export function SiteFooter() {
  return (
    <footer className="mt-28 overflow-hidden border-t border-line bg-bg-2">
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <div>
            <p className="text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl">Give your agent<br />your phone app.</p>
            <p className="mt-4 max-w-sm text-sm text-muted">{site.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((c) => (
              <div key={c.title}>
                <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted">{c.title}</h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      {l.href.startsWith("http")
                        ? <a className="transition-colors hover:text-accent-ink" href={l.href}>{l.label}</a>
                        : <Link className="transition-colors hover:text-accent-ink" href={l.href}>{l.label}</Link>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-line py-5 font-mono text-[11px] uppercase tracking-wider text-muted">
          <span className="flex items-center gap-2"><Logo size={18} /> © {new Date().getFullYear()} Rudra Samadhiya</span>
          <span>MIT License · Free and open source</span>
        </div>
      </div>
      <p className="footer-wordmark select-none whitespace-nowrap text-center font-extrabold leading-[0.8] tracking-[-0.05em]" aria-hidden>
        expo agent kit
      </p>
    </footer>
  );
}
