"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { flatNav } from "@/content/site";

export function PrevNext() {
  const pathname = usePathname();
  const i = flatNav.findIndex((n) => n.href === pathname);
  if (i < 0) return null;
  const prev = flatNav[i - 1];
  const next = flatNav[i + 1];
  return (
    <nav className="mt-16 grid gap-3 border-t border-line pt-6 sm:grid-cols-2" aria-label="Previous and next page">
      {prev ? (
        <Link href={prev.href} className="rounded-xl border border-line p-4 hover:border-accent">
          <span className="text-xs text-muted">← Previous</span><span className="block font-semibold">{prev.title}</span>
        </Link>
      ) : <span />}
      {next && (
        <Link href={next.href} className="rounded-xl border border-line p-4 text-right hover:border-accent">
          <span className="text-xs text-muted">Next →</span><span className="block font-semibold">{next.title}</span>
        </Link>
      )}
    </nav>
  );
}
