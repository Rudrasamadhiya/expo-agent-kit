import Link from "next/link";
import type { Metadata } from "next";
import { videoTroubleshooting } from "@/content/reference";

export const metadata: Metadata = { title: "Troubleshooting · expo-launch-video" };

export default function Page() {
  return (
    <>
      <h1>Troubleshooting</h1>
      {videoTroubleshooting.map((t) => (
        <section key={t.q}>
          <h2>{t.q}</h2>
          <p>{t.a}</p>
        </section>
      ))}
      <p>Connection problems (phone not connecting, ports, Metro) are covered in <Link href="/docs/bridge/troubleshooting/">bridge troubleshooting</Link>.</p>
    </>
  );
}
