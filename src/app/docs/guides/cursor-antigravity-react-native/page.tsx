import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/content/site";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/docs/ToolReference";

export const metadata: Metadata = pageMeta(
  "Let Cursor, Antigravity or Windsurf drive your React Native app",
  "Connect Cursor, Google Antigravity, Windsurf or Cline to a running Expo / React Native app over MCP so the agent can tap, type, scroll and debug it on your phone.",
  "/docs/guides/cursor-antigravity-react-native/",
);

const config = `{
  "mcpServers": {
    "expo-app": { "command": "npx", "args": ["expo-mcp-bridge"] }
  }
}`;

export default function Page() {
  return (
    <>
      <h1>Let Cursor, Antigravity or Windsurf drive your React Native app</h1>
      <p><code>expo-mcp-bridge</code> speaks the Model Context Protocol, so any MCP-capable editor agent can use it. Once connected, the agent can see the screen of your running Expo app, press buttons, fill forms, scroll lists, and read console errors and network requests — on a real phone.</p>

      <h2>1. Install and mount</h2>
      <CodeBlock code={`npx expo install expo-mcp-bridge react-native-view-shot`} />
      <p>Add <code>&lt;AgentBridge router=&#123;router&#125; /&gt;</code> as the last child of <code>app/_layout.tsx</code> — see <Link href="/docs/bridge/installation/">Installation</Link>.</p>

      <h2>2. Add the MCP server to your editor</h2>
      <h3>Cursor</h3>
      <CodeBlock code={`npx expo-mcp-bridge init --cursor`} />
      <p>This writes <code>.cursor/mcp.json</code>. Reload Cursor and enable the <code>expo-app</code> server in its MCP settings.</p>
      <h3>Antigravity, Windsurf, Cline and other MCP clients</h3>
      <p>Add this to the client&apos;s MCP settings:</p>
      <CodeBlock lang="json" code={config} />
      <Callout>On Windows use <code>&quot;command&quot;: &quot;cmd&quot;, &quot;args&quot;: [&quot;/c&quot;, &quot;npx&quot;, &quot;expo-mcp-bridge&quot;]</code>.</Callout>
      <p><code>npx expo-mcp-bridge init</code> also adds an <code>expo-app-control</code> section to <code>AGENTS.md</code>, which Antigravity, Cursor and Codex read for project instructions — it explains how to use the tools efficiently.</p>

      <h2>3. Run the app and ask</h2>
      <CodeBlock code={`npx expo start`} />
      <p>Open the app on your phone on the same Wi-Fi, then ask the agent something like <em>“Check the checkout flow with an expired card and tell me what the user sees.”</em></p>

      <h2>What the agent can do</h2>
      <ul>
        <li>Read the visible screen as a compact outline with stable refs (<code>app_snapshot</code>)</li>
        <li>Tap, type, scroll, toggle, navigate and wait (<code>app_tap</code>, <code>app_type</code>, <code>app_batch</code> and more)</li>
        <li>Take screenshots, including whole scrollable pages (<code>app_screenshot</code>)</li>
        <li>Read logs, JS errors and network requests (<code>app_logs</code>, <code>app_network</code>)</li>
        <li>Press volume, back and home on Android (<code>device_key</code>)</li>
      </ul>
      <p>Full list: <Link href="/docs/bridge/tools/">tools reference</Link>.</p>
    </>
  );
}
