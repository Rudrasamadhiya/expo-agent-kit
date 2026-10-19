import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { KeyValueTable } from "@/components/docs/ToolReference";
import { bridgeProps } from "@/content/reference";

export const metadata: Metadata = { title: "<AgentBridge /> API · expo-mcp-bridge" };

export default function Page() {
  return (
    <>
      <h1>&lt;AgentBridge /&gt; API</h1>
      <p>The in-app component. Mount it once near the root. In development it dials the MCP server on your computer; in production it renders its children and nothing else.</p>
      <CodeBlock lang="tsx" code={`import { AgentBridge } from 'expo-mcp-bridge';\n\n<AgentBridge\n  router={router}      // expo-router's router, for exact app_navigate\n  host="192.168.1.20"  // computer IP (auto-detected from Metro)\n  port={8347}          // must match EXPO_MCP_PORT\n  allowEval={false}    // disable app_eval\n  enabled={false}      // turn the bridge off\n/>`} />
      <h2>Props</h2>
      <KeyValueTable head={["Prop", "Type", "Default", "Description"]} rows={bridgeProps.map((p) => [<code key="n">{p.name}</code>, <code key="t">{p.type}</code>, p.def, p.desc])} />
      <h2>How it works</h2>
      <p>The component reads React&apos;s live fiber tree, so it sees exactly what you rendered: <code>testID</code>s, accessibility labels, inputs, lists and switches. It calls your real <code>onPress</code> / <code>onChangeText</code> handlers, so app logic runs exactly as if a user did it.</p>
      <ul>
        <li>Screens kept mounted under a native stack are skipped — snapshots show only what&apos;s visible.</li>
        <li>React Native <code>&lt;Modal&gt;</code>s render in their own window; the recorder captures them as transparent overlays.</li>
        <li>Screenshots capture the visible screen&apos;s own view (whole-window capture can return stale frames on Android).</li>
        <li>Console output, JS errors and fetch/XHR traffic are kept in small ring buffers, with auth headers redacted.</li>
      </ul>
      <h2>TypeScript</h2>
      <p>Types ship with the package (<code>client/index.d.ts</code>).</p>
    </>
  );
}
