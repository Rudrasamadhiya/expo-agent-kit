import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/docs/ToolReference";
import { site, pageMeta } from "@/content/site";

export const metadata: Metadata = pageMeta("One-shot AI setup", "Paste one line into Claude Code, Antigravity or Cursor and your agent installs, mounts and verifies expo-mcp-bridge and expo-launch-video in your Expo project.", "/docs/ai-setup/");

export default function Page() {
  return (
    <>
      <h1>One-shot AI setup</h1>
      <p>Each repository ships <code>AI_SETUP.md</code>: a single file written <em>for AI agents</em>. Point your agent at it and it installs the packages, mounts the bridge in your root layout, configures itself, and verifies the connection — then tells you what it did.</p>
      <h2>App control only</h2>
      <CodeBlock lang="text" code={`Read ${site.aiSetup.bridge} and set it up in this project.`} />
      <h2>App control + launch videos</h2>
      <CodeBlock lang="text" code={`Read ${site.aiSetup.video} and set up app control and launch videos in this project.`} />
      <h2>What the agent does</h2>
      <ol>
        <li>Checks the project is an Expo app and Node is 20+.</li>
        <li>Installs <code>expo-mcp-bridge</code> + <code>react-native-view-shot</code> (and <code>expo-launch-video</code> for videos).</li>
        <li>Adds <code>&lt;AgentBridge router=&#123;router&#125; /&gt;</code> as the last child of your root layout.</li>
        <li>Runs <code>init</code>: <code>.mcp.json</code>, skills in <code>.claude/skills/</code>, and the same guides in <code>AGENTS.md</code>.</li>
        <li>Asks you to start Metro and open the app on your phone, then verifies with <code>app_status</code>.</li>
      </ol>
      <Callout>The setup file also teaches the agent the rules: never type real passwords or payment details, leave native dialogs to you, and ask before actions that change real data.</Callout>
    </>
  );
}
