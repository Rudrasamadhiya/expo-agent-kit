import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/content/site";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/docs/ToolReference";

export const metadata: Metadata = pageMeta(
  "Test an Expo app with Claude Code on a real phone",
  "Step-by-step: connect Claude Code to your Expo / React Native app on a real iPhone or Android phone with expo-mcp-bridge, then let it tap, type, take screenshots and find bugs.",
  "/docs/guides/claude-code-expo/",
);

const layout = `import { Stack, router } from 'expo-router';
import { AgentBridge } from 'expo-mcp-bridge';

export default function RootLayout() {
  return (
    <>
      <Stack />
      <AgentBridge router={router} />
    </>
  );
}`;

export default function Page() {
  return (
    <>
      <h1>Test an Expo app with Claude Code on a real phone</h1>
      <p>Claude Code can read files and run commands, but on its own it can&apos;t see your app. <code>expo-mcp-bridge</code> is an MCP server that gives it eyes and hands inside your running Expo app — on the phone in your hand, through Expo Go or a dev build — so it can test flows end to end the way it tests a web page.</p>

      <h2>1. Install the bridge</h2>
      <CodeBlock code={`npx expo install expo-mcp-bridge react-native-view-shot\nnpx expo-mcp-bridge init`} />
      <p><code>init</code> writes <code>.mcp.json</code> with an <code>expo-app</code> server and installs the <code>expo-app-control</code> skill in <code>.claude/skills/</code>, which teaches Claude Code the snapshot, act, read-the-diff loop.</p>

      <h2>2. Mount it in your app</h2>
      <CodeBlock lang="tsx" title="app/_layout.tsx" code={layout} />
      <p>It only runs in development. In production builds it renders its children and nothing else.</p>

      <h2>3. Open the app on your phone</h2>
      <CodeBlock code={`npx expo start`} />
      <p>Scan the QR code with Expo Go (or open your dev build) on the same Wi-Fi as your computer. Then restart Claude Code in the project so it loads <code>.mcp.json</code>. If you skipped <code>init</code>, add the server by hand:</p>
      <CodeBlock code={`claude mcp add expo-app -- npx expo-mcp-bridge`} />

      <h2>4. Ask for a test</h2>
      <p>Try prompts like these:</p>
      <ul>
        <li><em>“Open the app, try the sign-up form with bad input, and tell me what breaks.”</em></li>
        <li><em>“Open Settings and check that every toggle saves after a reload.”</em></li>
        <li><em>“Scroll the feed to the bottom and report any JS errors or failed requests.”</em></li>
        <li><em>“Take a screenshot of each tab and compare the spacing to the design.”</em></li>
      </ul>
      <p>Claude Code calls <code>app_snapshot</code> to read the visible screen as a compact outline, acts with <code>app_tap</code>, <code>app_type</code> or <code>app_batch</code>, and gets back only what changed — plus any new JS errors and failed network requests caused by that action. Every tool is in the <Link href="/docs/bridge/tools/">tools reference</Link>.</p>
      <Callout>Claude Code won&apos;t type your real passwords. Sign in on the phone yourself when a real account is needed; the skill tells the agent to wait for you.</Callout>

      <h2>Why not just screenshots?</h2>
      <p>A screenshot costs about 1,000 tokens and the model has to guess where to tap. A snapshot is about 70 tokens, names every button and input with a stable ref, and each action returns a small diff — so a full sign-up flow takes a handful of calls instead of dozens.</p>

      <h2>Next</h2>
      <ul>
        <li><Link href="/docs/bridge/troubleshooting/">Troubleshooting</Link> if the app doesn&apos;t connect</li>
        <li><Link href="/docs/guides/app-store-preview-video/">Make an App Store preview video</Link> of the same app</li>
      </ul>
    </>
  );
}
