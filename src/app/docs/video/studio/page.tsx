import type { Metadata } from "next";
import { pageMeta } from "@/content/site";
import { CodeBlock } from "@/components/CodeBlock";
import { studioPrompts } from "@/content/reference";

export const metadata: Metadata = pageMeta("The studio · expo-launch-video", "The expo-launch-video studio: live preview, timeline, scene inspector, sound and a prompt box that edits your launch video when you type.", "/docs/video/studio/");

export default function Page() {
  return (
    <>
      <h1>The studio</h1>
      <p>A browser editor at <code>http://localhost:8790</code>, opened by your agent with <code>video_studio</code> (or by you with <code>npx expo-launch-video studio</code>). Everything updates live in both directions: edits by your agent appear instantly, and your edits reach the agent.</p>
      <h2>What&apos;s in it</h2>
      <ul>
        <li><strong>Live preview</strong> with sound — exactly what the export renders.</li>
        <li><strong>Timeline</strong> — drag scenes to reorder, drag the right edge to change length; scenes not in the video wait in a strip below.</li>
        <li><strong>Scene inspector</strong> — captions, duration, speed, transition, draw a zoom area on the screenshot, zoom amount, scroll amount.</li>
        <li><strong>Video settings</strong> — 16:9 / 9:16 / 1:1, caption side, colors (auto-detected from your app), sound effects and volume, frame rate.</li>
        <li><strong>Prompt box</strong> — type what you want.</li>
        <li><strong>Export MP4</strong> — rendered in your browser (Chrome / Edge).</li>
      </ul>
      <h2>Prompts the studio understands by itself</h2>
      <CodeBlock lang="text" code={studioPrompts.join("\n")} />
      <p>Anything else (<em>“make the intro feel more premium”</em>) goes to Claude when Anthropic credentials are set, otherwise to your agent through <code>video_wait_for_prompt</code>. Prompts carry the scene you have selected, so <em>“fix this”</em> means that scene.</p>
    </>
  );
}
