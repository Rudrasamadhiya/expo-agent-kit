import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollProgress } from "@/components/ScrollProgress";
import { site } from "@/content/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-face", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — give your AI agent your phone app`, template: `%s · ${site.name}` },
  description: site.description,
  keywords: ["expo", "react native", "mcp", "ai agent", "claude code", "antigravity", "cursor", "launch video", "app testing"],
  openGraph: { title: site.name, description: site.description, type: "website", url: site.url },
};

// Set the theme before paint (no flash): the saved choice (light = Lavender, dark = Midnight,
// ivory), otherwise the system preference, otherwise Midnight.
const themeScript = `try{var t=localStorage.getItem('theme');if(['light','dark','ivory'].indexOf(t)<0)t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-panel focus:px-3 focus:py-2 focus:rounded-lg">Skip to content</a>
        <ScrollProgress />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
