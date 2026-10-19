import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/docs/ToolReference";

export const metadata: Metadata = { title: "Making a video · expo-launch-video" };

export default function Page() {
  return (
    <>
      <h1>Making a video</h1>
      <p>Usually you just ask your agent — the installed skill knows the playbook. This is what happens under the hood.</p>
      <h2>1. Shoot</h2>
      <p>Recording starts <em>before</em> the page opens, so loaders and entrance animations are on camera; it holds while the page loads, then scrolls.</p>
      <CodeBlock lang="js" code={`video_record({ route: "/dashboard", seconds: 8, scroll: true })\nvideo_record({ route: "/analytics", seconds: 8, scroll: true })\nvideo_record({ tap: "My Analytics", tapAt: 1, seconds: 6 })   // tap → hero / side pop-out`} />
      <Callout>Logged-out screens (landing, login)? Shoot them first, then log in yourself on the phone — the agent never types real passwords.</Callout>
      <h2>2. Plan</h2>
      <CodeBlock lang="js" code={`video_plan({ targetSeconds: 45, format: "landscape", appName: "MyApp", cta: "Get it on Google Play" })`} />
      <p>The director builds: intro → one scene per take (timing, zooms on stat rows / buttons, scroll speed-ups, captions, pop-up chips, pop-outs) → outro.</p>
      <h2>3. Direct</h2>
      <p>Write benefit-led captions and tune pacing in one call:</p>
      <CodeBlock lang="js" code={`video_edit({ ops: [\n  { op: "update", scene: "dashboard", title: "Your prep at a glance",\n    callouts: [{ value: "1 tap", label: "to resume your last paper" }] },\n  { op: "update", scene: "start an exam", popouts: [], focus: "Start", zoom: 2.2, zoomTimes: [0.3, 1.3, 2.1, 3.2] },\n  { op: "settings", captionSide: "right", sound: { volume: 0.7 } },\n]})`} />
      <h2>4. Collaborate in the studio</h2>
      <CodeBlock lang="js" code={`video_studio()\n// loop:\nvideo_wait_for_prompt()  // → "User asked: …  They were looking at scene #4 …"\nvideo_edit({ ops: [...] })\nvideo_reply({ text: "Done — zoom is slower now." })`} />
      <h2>5. Render</h2>
      <CodeBlock lang="js" code={`video_render()   // → launch-video/out/launch-landscape.mp4 (H.264 + AAC)`} />
      <p>Want a vertical cut too? <code>{`video_edit({ ops: [{ op: "settings", format: "portrait" }] })`}</code>, then render again.</p>
    </>
  );
}
