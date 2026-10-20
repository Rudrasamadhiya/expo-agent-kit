import type { Metadata } from "next";
import { pageMeta } from "@/content/site";
import { ToolReference } from "@/components/docs/ToolReference";
import { bridgeTools } from "@/content/reference";

export const metadata: Metadata = pageMeta("Tools reference · expo-mcp-bridge", "Every expo-mcp-bridge MCP tool with parameters: app_snapshot, app_tap, app_type, app_batch, app_screenshot, app_logs, app_network, device_key and more.", "/docs/bridge/tools/");

export default function Page() {
  return (
    <>
      <h1>Tools reference</h1>
      <p>{bridgeTools.length} MCP tools. Target elements by <code>ref</code> (from a snapshot), <code>testID</code>, or visible <code>text</code>. Action tools return only what changed (<code>+</code> added, <code>-</code> removed, <code>~</code> changed) plus new JS errors and failed requests.</p>
      <ToolReference tools={bridgeTools} />
    </>
  );
}
