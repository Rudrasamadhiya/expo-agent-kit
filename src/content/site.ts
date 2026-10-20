export const site = {
  name: "Expo Agent Kit",
  tagline: "Give your AI agent your phone app.",
  description:
    "Two open-source MCP libraries for Expo & React Native: let Claude Code, Antigravity or Cursor see and drive your app on a real phone, and shoot polished launch videos of it.",
  url: "https://rudrasamadhiya.github.io/expo-agent-kit/",
  github: "https://github.com/Rudrasamadhiya",
  repos: {
    bridge: "https://github.com/Rudrasamadhiya/expo-mcp-bridge",
    video: "https://github.com/Rudrasamadhiya/expo-launch-video",
    site: "https://github.com/Rudrasamadhiya/expo-agent-kit",
  },
  npm: {
    bridge: "https://www.npmjs.com/package/expo-mcp-bridge",
    video: "https://www.npmjs.com/package/expo-launch-video",
  },
  versions: { bridge: "0.3.0", video: "0.1.0" },
  aiSetup: {
    bridge: "https://raw.githubusercontent.com/Rudrasamadhiya/expo-mcp-bridge/main/AI_SETUP.md",
    video: "https://raw.githubusercontent.com/Rudrasamadhiya/expo-launch-video/main/AI_SETUP.md",
  },
};

export type NavItem = { title: string; href: string };
export type NavGroup = { title: string; items: NavItem[] };

export const docsNav: NavGroup[] = [
  {
    title: "Start here",
    items: [
      { title: "Introduction", href: "/docs/" },
      { title: "One-shot AI setup", href: "/docs/ai-setup/" },
    ],
  },
  {
    title: "expo-mcp-bridge",
    items: [
      { title: "Overview", href: "/docs/bridge/" },
      { title: "Installation", href: "/docs/bridge/installation/" },
      { title: "Connect your agent", href: "/docs/bridge/agents/" },
      { title: "Tools reference", href: "/docs/bridge/tools/" },
      { title: "<AgentBridge /> API", href: "/docs/bridge/api/" },
      { title: "CLI & environment", href: "/docs/bridge/cli/" },
      { title: "Troubleshooting", href: "/docs/bridge/troubleshooting/" },
    ],
  },
  {
    title: "expo-launch-video",
    items: [
      { title: "Overview", href: "/docs/video/" },
      { title: "Installation", href: "/docs/video/installation/" },
      { title: "Making a video", href: "/docs/video/workflow/" },
      { title: "Tools reference", href: "/docs/video/tools/" },
      { title: "The studio", href: "/docs/video/studio/" },
      { title: "CLI & environment", href: "/docs/video/cli/" },
      { title: "Troubleshooting", href: "/docs/video/troubleshooting/" },
    ],
  },
  {
    title: "Project",
    items: [
      { title: "Changelog", href: "/docs/changelog/" },
      { title: "License & credits", href: "/docs/license/" },
    ],
  },
];

export const flatNav = docsNav.flatMap((g) => g.items);

/** Path to a file in public/, prefixed with the base path the site is served under. */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

/** Absolute URL of a site path on the deployed site (keeps the GitHub Pages base path). */
export const absoluteUrl = (path: string) => new URL(path.replace(/^\//, ""), site.url).toString();

/** The social card shown when a page is shared (public/og.png). */
export const ogImage = { url: absoluteUrl("/og.png"), width: 1200, height: 630, alt: "Expo Agent Kit — give your AI agent your phone app" };

/** Title, description, canonical URL and social tags for one page. */
export function pageMeta(title: string, description: string, path: string) {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" as const, siteName: site.name, images: [ogImage] },
    twitter: { card: "summary_large_image" as const, title, description, images: [ogImage.url] },
  };
}
