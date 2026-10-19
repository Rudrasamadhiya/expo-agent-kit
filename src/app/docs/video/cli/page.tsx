import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { KeyValueTable } from "@/components/docs/ToolReference";
import { videoCli, videoEnv } from "@/content/reference";

export const metadata: Metadata = { title: "CLI & environment · expo-launch-video" };

export default function Page() {
  return (
    <>
      <h1>CLI &amp; environment</h1>
      <CodeBlock code={videoCli.map((c) => c.cmd).join("\n")} />
      <KeyValueTable head={["Command", "What it does"]} rows={videoCli.map((c) => [<code key="c">{c.cmd}</code>, c.desc])} />
      <h2>Environment variables</h2>
      <KeyValueTable head={["Variable", "Default", "What"]} rows={videoEnv.map((e) => [<code key="n">{e.name}</code>, <code key="d">{e.def}</code>, e.desc])} />
      <h2>Project files</h2>
      <p>Each app keeps its video project in <code>launch-video/</code>: captured images and frames in <code>assets/</code>, the timeline in <code>project.json</code>, renders in <code>out/</code>.</p>
    </>
  );
}
