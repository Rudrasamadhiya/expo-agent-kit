import Link from "next/link";
import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { bridgeTools } from "@/content/reference";

export const metadata: Metadata = { title: "expo-mcp-bridge" };

export default function Page() {
  return (
    <>
      <h1>expo-mcp-bridge</h1>
      <p>Let your AI agent use your phone app the way it uses a browser. It reads the screen, taps, types and fills forms, scrolls, takes screenshots, reads console errors and network requests, and presses volume / back / home — in your Expo app, running live on your phone.</p>
      <h2>What the agent sees</h2>
      <p>Instead of a screenshot (~1,000 tokens), the agent reads a compact outline of the <em>visible</em> screen (~70 tokens), with stable refs it can act on:</p>
      <CodeBlock lang="text" code={`scroll [e1]\n  button "icon:chevron-back" [e2]\n  text "Welcome back"\n  input "you@example.com" value="" [e3]\n  input "••••••••" value="" (secure) [e4]\n  button "icon:eye" [e5]\n  button "Log In" [e7]`} />
      <p>Every action returns only what changed:</p>
      <CodeBlock lang="text" code={`Tapped.\nChanges (+ added, - removed):\n~ input "••••••••" value="" [e4]\n+ button "icon:eye-off" [e9]\n- button "icon:eye" [e5]`} />
      <h2>Highlights</h2>
      <ul>
        <li><strong>Real devices, zero native setup</strong> — Expo Go or a dev build, iPhone or Android, over Wi-Fi.</li>
        <li><strong>{bridgeTools.length} tools</strong> — read, act, debug and device keys. See the <Link href="/docs/bridge/tools/">tools reference</Link>.</li>
        <li><strong>Errors attached to actions</strong> — new JS errors and failed requests come back with the action that caused them.</li>
        <li><strong>Skills included</strong> — <code>init</code> installs an agent skill and an <code>AGENTS.md</code> guide.</li>
        <li><strong>Dev only</strong> — nothing runs in production builds.</li>
      </ul>
      <h2>Next</h2>
      <p><Link href="/docs/bridge/installation/">Install it</Link>, then <Link href="/docs/bridge/agents/">connect your agent</Link>.</p>
    </>
  );
}
