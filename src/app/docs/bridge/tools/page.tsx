import type { Metadata } from "next";
import { ToolReference } from "@/components/docs/ToolReference";
import { bridgeTools } from "@/content/reference";

export const metadata: Metadata = { title: "Tools reference · expo-mcp-bridge" };

export default function Page() {
  return (
    <>
      <h1>Tools reference</h1>
      <p>{bridgeTools.length} MCP tools. Target elements by <code>ref</code> (from a snapshot), <code>testID</code>, or visible <code>text</code>. Action tools return only what changed (<code>+</code> added, <code>-</code> removed, <code>~</code> changed) plus new JS errors and failed requests.</p>
      <ToolReference tools={bridgeTools} />
    </>
  );
}
