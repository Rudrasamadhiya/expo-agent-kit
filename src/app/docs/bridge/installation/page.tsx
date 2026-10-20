import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/content/site";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/docs/ToolReference";

export const metadata: Metadata = pageMeta("Installation · expo-mcp-bridge", "Install expo-mcp-bridge in an Expo app: npx expo install, run init, mount <AgentBridge /> in your root layout and connect from your phone over Wi-Fi.", "/docs/bridge/installation/");

export default function Page() {
  return (
    <>
      <h1>Installation</h1>
      <h2>1. Install</h2>
      <CodeBlock code={`npx expo install expo-mcp-bridge react-native-view-shot`} />
      <p><code>react-native-view-shot</code> powers screenshots and ships with Expo Go. In a custom dev build it&apos;s a native module — rebuild the dev client once.</p>
      <h2>2. Mount the bridge</h2>
      <p>Add it once, as the last child of your root layout:</p>
      <CodeBlock lang="tsx" title="app/_layout.tsx (expo-router)" code={`import { Stack, router } from 'expo-router';\nimport { AgentBridge } from 'expo-mcp-bridge';\n\nexport default function RootLayout() {\n  return (\n    <>\n      <Stack />\n      <AgentBridge router={router} />\n    </>\n  );\n}`} />
      <p>If your root returns a single provider tree, put it inside the innermost provider:</p>
      <CodeBlock lang="tsx" code={`<ThemeProvider value={theme}>\n  <AppTabs />\n  <AgentBridge router={router} />\n</ThemeProvider>`} />
      <p>Without expo-router (plain React Navigation), use <code>&lt;AgentBridge /&gt;</code> in <code>App.tsx</code>; <code>app_navigate</code> then uses deep links.</p>
      <h2>3. Configure your agent</h2>
      <CodeBlock code={`npx expo-mcp-bridge init`} />
      <p>Writes <code>.mcp.json</code>, the <code>expo-app-control</code> skill and an <code>AGENTS.md</code> section. See <Link href="/docs/bridge/agents/">Connect your agent</Link> for other agents.</p>
      <h2>4. Run</h2>
      <CodeBlock code={`npx expo start`} />
      <p>Open the app on your phone (same Wi-Fi), restart your agent, and ask: <em>“Open the app, try the sign-up form with bad input, and tell me what breaks.”</em></p>
      <Callout tone="warn">Use LAN mode (not <code>--tunnel</code>), and allow Node.js through the Windows firewall when prompted — the phone connects to your computer on port 8347.</Callout>
    </>
  );
}
