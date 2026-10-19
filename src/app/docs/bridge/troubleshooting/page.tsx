import type { Metadata } from "next";
import { bridgeTroubleshooting } from "@/content/reference";

export const metadata: Metadata = { title: "Troubleshooting · expo-mcp-bridge" };

export default function Page() {
  return (
    <>
      <h1>Troubleshooting</h1>
      {bridgeTroubleshooting.map((t) => (
        <section key={t.q}>
          <h2>{t.q}</h2>
          <p>{t.a}</p>
        </section>
      ))}
      <h2>Limits</h2>
      <p>An in-app library controls your own app only; the OS blocks system dialogs and other apps. <code>device_key</code> covers hardware keys through adb on Android. Gestures that exist only in native code (a pan handler without <code>onPress</code>) can&apos;t be triggered from JS.</p>
    </>
  );
}
