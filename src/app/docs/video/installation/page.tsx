import Link from "next/link";
import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/docs/ToolReference";

export const metadata: Metadata = { title: "Installation · expo-launch-video" };

export default function Page() {
  return (
    <>
      <h1>Installation</h1>
      <CodeBlock code={`npx expo install expo-mcp-bridge react-native-view-shot\nnpm install --save-dev expo-launch-video\nnpx expo-launch-video init`} />
      <p>Then mount <code>&lt;AgentBridge router=&#123;router&#125; /&gt;</code> in your root layout exactly as in the <Link href="/docs/bridge/installation/">bridge installation</Link>.</p>
      <h2>What <code>init</code> does</h2>
      <ul>
        <li>Writes <code>.mcp.json</code> with a <code>launch-video</code> server (it replaces <code>expo-app</code> — this server includes every <code>app_*</code> tool on the same phone connection).</li>
        <li>Installs two skills: <code>launch-video</code> (the directing playbook) and <code>expo-app-control</code>.</li>
        <li>Writes both guides into <code>AGENTS.md</code> for Antigravity, Cursor and other agents.</li>
        <li>Adds <code>launch-video/</code> (captures and renders) to <code>.gitignore</code>.</li>
      </ul>
      <Callout>Only run one of the two servers at a time — both listen on port 8347 for the phone.</Callout>
      <h2>Optional: direct Claude edits in the studio</h2>
      <p>With <code>ANTHROPIC_API_KEY</code> set (or an <code>ant auth login</code> profile), free-form studio prompts go straight to Claude. Without credentials they go to your agent — no key needed.</p>
    </>
  );
}
