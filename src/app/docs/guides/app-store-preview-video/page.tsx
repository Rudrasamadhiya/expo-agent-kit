import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/content/site";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/docs/ToolReference";

export const metadata: Metadata = pageMeta(
  "Make an App Store preview video of your Expo app with AI",
  "Use an AI agent and expo-launch-video to record your React Native app on a real phone and export a 1080p App Store preview, Play Store promo or social reel — with motion graphics and sound.",
  "/docs/guides/app-store-preview-video/",
);

export default function Page() {
  return (
    <>
      <h1>Make an App Store preview video of your Expo app with AI</h1>
      <p>Store previews, promo videos and launch reels usually mean a screen recorder, a video editor and an afternoon. With <code>expo-launch-video</code> your AI agent records the real app on your phone, plans and edits the video, and you polish it in a studio by typing what you want. The result is an MP4 rendered in your browser.</p>

      <h2>1. Install</h2>
      <CodeBlock code={`npx expo install expo-mcp-bridge react-native-view-shot\nnpm install --save-dev expo-launch-video\nnpx expo-launch-video init`} />
      <p>Mount <code>&lt;AgentBridge /&gt;</code> in your root layout (see <Link href="/docs/video/installation/">Installation</Link>), run <code>npx expo start</code> and open the app on your phone. <code>init</code> sets up one <code>launch-video</code> MCP server that includes every app-control tool, plus a directing skill for your agent.</p>

      <h2>2. Ask for the video</h2>
      <p>Be specific about length, screens and the message:</p>
      <ul>
        <li><em>“Make a 30 second App Store preview, portrait: onboarding, the dashboard, adding a task, the weekly report.”</em></li>
        <li><em>“Make a 45 second launch video for Product Hunt. Captions should sell the benefits.”</em></li>
        <li><em>“Make a 15 second square reel showing just the analytics screen.”</em></li>
      </ul>
      <p>The agent records each screen live (page loads, scrolls and taps on camera), plans the timeline, writes captions from the real numbers on screen, adds zooms, pop-outs and sound, then opens the studio.</p>

      <h2>3. Polish in the studio</h2>
      <p>Drag scenes, trim them, or type edits like <em>“speed up analytics 2x”</em>, <em>“text on the right”</em> or <em>“zoom into the Start button”</em>. Simple edits apply instantly; anything else goes back to your agent. See <Link href="/docs/video/studio/">The studio</Link>.</p>

      <h2>4. Export</h2>
      <p>Export renders a 1080p MP4 with an AAC sound track in Chrome or Edge, in the format you picked:</p>
      <table>
        <thead><tr><th>Format</th><th>Use it for</th></tr></thead>
        <tbody>
          <tr><td>9:16 portrait</td><td>App Store and Play Store previews, Reels, Shorts, TikTok</td></tr>
          <tr><td>16:9 landscape</td><td>YouTube, Product Hunt, your website</td></tr>
          <tr><td>1:1 square</td><td>Feeds on X, LinkedIn and Instagram</td></tr>
        </tbody>
      </table>
      <Callout>Check the current App Store and Play Store preview rules (length, resolution, what may appear) before uploading, and trim in the studio if needed.</Callout>
    </>
  );
}
