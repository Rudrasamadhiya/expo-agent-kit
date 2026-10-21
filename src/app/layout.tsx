import type { Metadata } from "next";
import { JetBrains_Mono, Mona_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollProgress } from "@/components/ScrollProgress";
import { absoluteUrl, ogImage, site } from "@/content/site";

// Mona Sans (variable weight + width) carries both the expanded display headings and body text.
const mona = Mona_Sans({ subsets: ["latin"], variable: "--font-mona", display: "swap", axes: ["wdth"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-face", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — give your AI agent your phone app`, template: `%s · ${site.name}` },
  description: site.description,
  keywords: ["expo", "react native", "mcp", "ai agent", "claude code", "antigravity", "cursor", "launch video", "app testing"],
  openGraph: { title: site.name, description: site.description, type: "website", url: site.url, siteName: site.name, images: [ogImage] },
  twitter: { card: "summary_large_image", title: site.name, description: site.description, images: [ogImage.url] },
  alternates: { canonical: site.url },
  authors: [{ name: "Rudra Samadhiya", url: site.github }],
  creator: "Rudra Samadhiya",
  // Bing Webmaster Tools ownership (Google is verified with public/google2cc9cc06e5c32bf9.html).
  verification: { other: { "msvalidate.01": "8BC95C599217655D89A98622E38BE1F3" } },
};

// Structured data so search engines understand the two libraries and how they relate.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": `${site.url}#website`, url: site.url, name: site.name, description: site.description, inLanguage: "en", publisher: { "@id": `${site.url}#publisher` } },
    { "@type": "Organization", "@id": `${site.url}#publisher`, name: site.name, url: site.url, logo: absoluteUrl("/icon-512.png"), sameAs: [site.repos.bridge, site.repos.video, site.npm.bridge, site.npm.video] },
    {
      "@type": "SoftwareSourceCode", "@id": `${site.url}#expo-mcp-bridge`, name: "expo-mcp-bridge",
      description: "MCP server that lets AI agents (Claude Code, Antigravity, Cursor) see, tap, type, scroll, screenshot and debug an Expo / React Native app on a real phone.",
      codeRepository: site.repos.bridge, url: `${site.url}docs/bridge/`, programmingLanguage: "JavaScript", runtimePlatform: "Node.js",
      license: "https://opensource.org/licenses/MIT", version: site.versions.bridge, author: { "@type": "Person", name: "Rudra Samadhiya", url: site.github },
      keywords: "expo, react native, mcp, model context protocol, ai agent, claude code, cursor, antigravity, mobile testing",
    },
    {
      "@type": "SoftwareSourceCode", "@id": `${site.url}#expo-launch-video`, name: "expo-launch-video",
      description: "MCP server that lets AI agents record an Expo app on a real phone and edit a 1080p launch video with motion graphics, pop-outs and sound.",
      codeRepository: site.repos.video, url: `${site.url}docs/video/`, programmingLanguage: "JavaScript", runtimePlatform: "Node.js",
      license: "https://opensource.org/licenses/MIT", version: site.versions.video, author: { "@type": "Person", name: "Rudra Samadhiya", url: site.github },
      softwareRequirements: "expo-mcp-bridge", isBasedOn: { "@id": `${site.url}#expo-mcp-bridge` },
      keywords: "expo, react native, launch video, app trailer, promo video, mcp, ai agent, motion graphics",
    },
  ],
};

// Set the theme before paint (no flash): the saved choice (Midnight or Ivory), otherwise
// the system preference (light shows Ivory), otherwise Midnight.
const themeScript = `try{var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='ivory')t=matchMedia('(prefers-color-scheme: light)').matches?'ivory':'dark';document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mona.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
