import Link from "next/link";
import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { site, pageMeta } from "@/content/site";

export const metadata: Metadata = pageMeta("Introduction", "Expo Agent Kit: two open-source MCP libraries that let AI agents like Claude Code, Antigravity and Cursor control your Expo app on a real phone and make launch videos of it.", "/docs/");

export default function Page() {
  return (
    <>
      <h1>Introduction</h1>
      <p><strong>{site.name}</strong> is two open-source libraries for Expo and React Native apps that plug into any AI agent speaking the <a href="https://modelcontextprotocol.io">Model Context Protocol</a> — Claude Code, Antigravity, Cursor, Windsurf, Cline and others.</p>
      <table>
        <thead><tr><th>Package</th><th>What it gives your agent</th><th>Docs</th></tr></thead>
        <tbody>
          <tr><td><code>expo-mcp-bridge</code></td><td>Eyes and hands in your running app on a real phone: read the screen, tap, type, scroll, screenshots, logs, network, hardware keys.</td><td><Link href="/docs/bridge/">Bridge docs</Link></td></tr>
          <tr><td><code>expo-launch-video</code></td><td>A video crew: live screen recordings, auto-directed edits with motion graphics, pop-outs and sound, a promptable studio and MP4 export.</td><td><Link href="/docs/video/">Launch Video docs</Link></td></tr>
        </tbody>
      </table>
      <h2>The fastest start</h2>
      <p>Let your agent set everything up. In your Expo project, paste:</p>
      <CodeBlock lang="text" code={`Read ${site.aiSetup.video} and set it up in this project.`} />
      <p>Prefer doing it yourself? Follow <Link href="/docs/bridge/installation/">Installation</Link> — it takes two minutes.</p>
      <h2>Requirements</h2>
      <ul>
        <li>An Expo / React Native app (Expo Go or a dev build; tested on SDK 54 and 58).</li>
        <li>Node.js 20 or newer on your computer.</li>
        <li>Phone and computer on the same Wi-Fi (or USB with <code>adb reverse</code> on Android).</li>
        <li>For video export: Chrome or Edge (WebCodecs H.264 + AAC).</li>
      </ul>
    </>
  );
}
