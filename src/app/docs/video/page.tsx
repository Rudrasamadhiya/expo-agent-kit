import Link from "next/link";
import type { Metadata } from "next";
import { VideoShowcase } from "@/components/home/VideoShowcase";

export const metadata: Metadata = { title: "expo-launch-video" };

export default function Page() {
  return (
    <>
      <h1>expo-launch-video</h1>
      <p>Your AI agent shoots and edits a launch video of your Expo app — live from your phone. Ask for <em>“a 30 second launch video of my app”</em>: it records the real app (page loads, scrolling, taps, panels opening), picks the best takes, writes the captions, and cuts a polished 1080p MP4 with motion graphics, break-out pop-outs and sound. Then you tweak it in a studio by dragging or typing.</p>
      <div className="not-prose my-8"><VideoShowcase /></div>
      <h2>Highlights</h2>
      <ul>
        <li><strong>Real footage</strong> — in-app screen recordings at ~10–15 fps, full-page scroll captures, modals captured as overlays.</li>
        <li><strong>Auto-directed</strong> — timing, zooms on stat rows and buttons, scroll speed-ups, captions and pop-up chips from the numbers on screen.</li>
        <li><strong>Motion graphics</strong> — kinetic typography, glass callouts, light sweeps, accent wipes, animated intro/outro.</li>
        <li><strong>Break-out pop-outs</strong> — a tapped card lifts off the phone to center stage; a panel that opens springs out side-by-side.</li>
        <li><strong>Sound design</strong> — synthesized pops, clicks, whooshes and chimes, timed to the animations (AAC).</li>
        <li><strong>Prompt the studio</strong> — simple edits apply instantly; anything else goes to your agent, which edits live.</li>
        <li><strong>Formats</strong> — 16:9 (stores, YouTube), 9:16 (Reels, Shorts), 1:1 (feeds).</li>
      </ul>
      <p>It includes every <Link href="/docs/bridge/tools/">expo-mcp-bridge tool</Link>, so the same session can also test and debug your app.</p>
      <p>Next: <Link href="/docs/video/installation/">Installation</Link> → <Link href="/docs/video/workflow/">Making a video</Link>.</p>
    </>
  );
}
