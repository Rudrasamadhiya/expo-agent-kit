import Link from "next/link";
import type { Metadata } from "next";
import { ToolReference, KeyValueTable } from "@/components/docs/ToolReference";
import { videoTools, editOps } from "@/content/reference";

export const metadata: Metadata = { title: "Tools reference · expo-launch-video" };

export default function Page() {
  return (
    <>
      <h1>Tools reference</h1>
      <p>{videoTools.length} video tools, in addition to every <Link href="/docs/bridge/tools/">app_* tool</Link> from expo-mcp-bridge.</p>
      <ToolReference tools={videoTools} />
      <h2 id="ops">Edit operations</h2>
      <p>Scenes are referenced by id (<code>&quot;s3&quot;</code>), 1-based position, or a screen name / route (<code>&quot;dashboard&quot;</code>).</p>
      <KeyValueTable head={["op", "Fields", "Example"]} rows={editOps.map((o) => [<code key="o">{o.op}</code>, o.fields, <code key="e">{o.example}</code>])} />
    </>
  );
}
