import type { Metadata } from "next";
import { site, pageMeta } from "@/content/site";

export const metadata: Metadata = pageMeta("Changelog", "Release notes for expo-mcp-bridge and expo-launch-video.", "/docs/changelog/");

export default function Page() {
  return (
    <>
      <h1>Changelog</h1>
      <h2>expo-mcp-bridge {site.versions.bridge}</h2>
      <ul>
        <li>In-app screen recorder (timed frames, smooth scrolling, taps mid-take, page loads recorded live); modals captured as transparent overlays.</li>
        <li><code>app_layout</code> (positions and font sizes) and <code>app_screenshot fullScroll</code>; captures up to the device&apos;s pixel density.</li>
        <li><code>expo-app-control</code> skill covering every tool, written to <code>AGENTS.md</code> too; <code>AI_SETUP.md</code> one-shot setup.</li>
        <li><code>registerAppTools(server, hub)</code> exported for other MCP servers.</li>
      </ul>
      <h2>expo-mcp-bridge 0.2.0</h2>
      <ul>
        <li>Visible-screen-only snapshots, stable refs, diff responses, adaptive settle, <code>app_batch</code>, screenshot <code>saveTo</code>, honest <code>app_reload</code>.</li>
      </ul>
      <h2>expo-launch-video {site.versions.video}</h2>
      <ul>
        <li>First release: recordings, director, motion graphics, pop-outs, sound design, promptable studio, MP4 export, directing skill and <code>AI_SETUP.md</code>.</li>
      </ul>
      <p>Full notes: <a href={`${site.repos.bridge}/releases`}>bridge releases</a> · <a href={`${site.repos.video}/releases`}>launch-video releases</a>.</p>
    </>
  );
}
