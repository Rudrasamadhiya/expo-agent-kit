import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/docs/ToolReference";

export const metadata: Metadata = { title: "Connect your agent · expo-mcp-bridge" };

export default function Page() {
  return (
    <>
      <h1>Connect your agent</h1>
      <p>The bridge is a standard MCP server launched over stdio. Any MCP-capable agent can use it.</p>
      <h2>Claude Code</h2>
      <p><code>npx expo-mcp-bridge init</code> writes <code>.mcp.json</code>; restart Claude Code in the project and approve the server. Or add it globally:</p>
      <CodeBlock code={`claude mcp add expo-app -- npx expo-mcp-bridge`} />
      <h2>Cursor</h2>
      <CodeBlock code={`npx expo-mcp-bridge init --cursor   # writes .cursor/mcp.json`} />
      <h2>Antigravity, Windsurf, Cline and others</h2>
      <p>Add this to the agent&apos;s MCP settings:</p>
      <CodeBlock lang="json" code={`{\n  "mcpServers": {\n    "expo-app": { "command": "npx", "args": ["expo-mcp-bridge"] }\n  }\n}`} />
      <Callout>On <strong>Windows</strong>, use <code>&quot;command&quot;: &quot;cmd&quot;, &quot;args&quot;: [&quot;/c&quot;, &quot;npx&quot;, &quot;expo-mcp-bridge&quot;]</code>.</Callout>
      <h2>The skill</h2>
      <p><code>init</code> installs <code>.claude/skills/expo-app-control/SKILL.md</code> and the same guide in <code>AGENTS.md</code> (between <code>&lt;!-- expo-app-control:start --&gt;</code> markers, so re-running <code>init</code> updates it in place). It teaches the agent the loop — snapshot, act by ref, read the diff, batch forms, wait instead of polling — and the safety rules.</p>
    </>
  );
}
