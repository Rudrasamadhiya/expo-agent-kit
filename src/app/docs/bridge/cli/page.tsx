import type { Metadata } from "next";
import { pageMeta } from "@/content/site";
import { CodeBlock } from "@/components/CodeBlock";
import { KeyValueTable } from "@/components/docs/ToolReference";
import { bridgeCli, bridgeEnv } from "@/content/reference";

export const metadata: Metadata = pageMeta("CLI & environment · expo-mcp-bridge", "expo-mcp-bridge command line: init, --cursor, running the MCP server, and the EXPO_MCP_PORT environment variable.", "/docs/bridge/cli/");

export default function Page() {
  return (
    <>
      <h1>CLI &amp; environment</h1>
      <CodeBlock code={bridgeCli.map((c) => c.cmd).join("\n")} />
      <KeyValueTable head={["Command", "What it does"]} rows={bridgeCli.map((c) => [<code key="c">{c.cmd}</code>, c.desc])} />
      <h2>Environment variables</h2>
      <KeyValueTable head={["Variable", "Default", "What"]} rows={bridgeEnv.map((e) => [<code key="n">{e.name}</code>, <code key="d">{e.def}</code>, e.desc])} />
      <h2>Trying the server by hand</h2>
      <p>Your agent normally launches the server itself. To poke at it manually, any MCP client works:</p>
      <CodeBlock code={`npx @modelcontextprotocol/inspector npx expo-mcp-bridge`} />
    </>
  );
}
