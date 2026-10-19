import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 font-bold"><Logo size={24} />{site.name}</div>
          <p className="mt-3 max-w-md text-sm text-muted">{site.description}</p>
          <p className="mt-4 text-xs text-muted">Released under the MIT License. Free and open source.</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Docs</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link className="hover:text-text" href="/docs/bridge/">expo-mcp-bridge</Link></li>
            <li><Link className="hover:text-text" href="/docs/video/">expo-launch-video</Link></li>
            <li><Link className="hover:text-text" href="/docs/ai-setup/">One-shot AI setup</Link></li>
            <li><Link className="hover:text-text" href="/docs/changelog/">Changelog</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Project</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><a className="hover:text-text" href={site.repos.bridge}>GitHub · bridge</a></li>
            <li><a className="hover:text-text" href={site.repos.video}>GitHub · launch-video</a></li>
            <li><a className="hover:text-text" href={site.npm.bridge}>npm · expo-mcp-bridge</a></li>
            <li><a className="hover:text-text" href={site.npm.video}>npm · expo-launch-video</a></li>
            <li><Link className="hover:text-text" href="/docs/license/">License &amp; credits</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-muted">© {new Date().getFullYear()} Rudra Samadhiya · MIT License</div>
    </footer>
  );
}
