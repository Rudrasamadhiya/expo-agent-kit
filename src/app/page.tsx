import Link from "next/link";
import { AgentDemo } from "@/components/home/AgentDemo";
import { VideoShowcase } from "@/components/home/VideoShowcase";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Reveal } from "@/components/Reveal";
import { Tabs } from "@/components/Tabs";
import { CodeBlock } from "@/components/CodeBlock";
import { CopyButton } from "@/components/CopyButton";
import { site } from "@/content/site";

const bridgeFeatures = [
  { icon: "📱", title: "Real phones, zero native setup", body: "Expo Go or a dev build, iPhone or Android, over Wi-Fi. Mount one component and you're done." },
  { icon: "🪶", title: "Token-cheap by design", body: "The agent reads a compact outline of the visible screen; every action returns only what changed." },
  { icon: "⚡", title: "Fast flows", body: "Actions finish the moment the UI settles. app_batch fills a whole form in one call." },
  { icon: "🔎", title: "Sees what broke", body: "New JS errors and failed requests are attached to the action that caused them." },
  { icon: "🎛️", title: "Full control", body: "Tap, type, scroll, toggle, navigate, wait, screenshots, logs, network, eval — and volume / back / home keys." },
  { icon: "🔒", title: "Dev only", body: "In production builds <AgentBridge /> renders its children and nothing else." },
];

const videoFeatures = [
  { title: "Live footage from the phone", body: "Page loads, scrolls, taps and panels recorded in-app at ~10–15 fps." },
  { title: "Auto-directed", body: "Timing, zooms on stats and buttons, scroll speed-ups, captions and pop-up chips from your real numbers." },
  { title: "Motion graphics & pop-outs", body: "Kinetic type, glass callouts, light sweeps, wipes — tapped cards lift off the phone, panels open side-by-side." },
  { title: "Sound design", body: "Pops, clicks, whooshes and chimes, timed to every animation, mixed into the MP4." },
  { title: "Prompt the studio", body: "“speed up analytics 2x”, “text on the right” — simple edits apply instantly, the rest go to your agent." },
  { title: "1080p MP4 in the browser", body: "16:9, 9:16 or 1:1. No After Effects, no ffmpeg, no screen recorder." },
];

const faqs = [
  { q: "Does it work with Expo Go?", a: "Yes. Both libraries are pure JavaScript in your app; screenshots use react-native-view-shot, which ships with Expo Go. In a custom dev build, rebuild once after installing it." },
  { q: "Which agents are supported?", a: "Any MCP client: Claude Code, Antigravity, Cursor, Windsurf, Cline and more. `init` writes the config for Claude Code and an AGENTS.md guide that other agents read." },
  { q: "Is anything shipped to production?", a: "No. <AgentBridge /> only runs in development (__DEV__) and only connects to your own computer." },
  { q: "Does it type my passwords?", a: "No. The skills tell agents never to enter real passwords, payment or ID details — you type real credentials on the phone yourself." },
  { q: "What does it cost?", a: "Nothing. Both libraries are MIT-licensed and free. Studio edits by Claude are optional and use your own Anthropic credentials if you set them." },
];

export default function Home() {
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-12 px-4 pb-16 pt-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:pt-24">
          <div>
            <a href={site.npm.bridge} className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-3 py-1 text-xs text-muted hover:text-text">
              <span className="size-1.5 rounded-full bg-[#28c840]" /> expo-mcp-bridge {site.versions.bridge} · expo-launch-video {site.versions.video} on npm
            </a>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Give your AI agent <span className="gradient-text">your phone app.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              Claude Code, Antigravity and Cursor can see, tap, type and debug your Expo app live on a real phone — then shoot a polished launch video of it. Open source, MIT.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/docs/bridge/" className="rounded-xl bg-accent px-5 py-3 font-semibold text-white shadow-lg shadow-accent/30 transition-transform hover:-translate-y-0.5">Get started</Link>
              <Link href="/docs/video/" className="rounded-xl border border-line bg-panel px-5 py-3 font-semibold transition-colors hover:border-accent">Make a launch video</Link>
            </div>
            <div className="mt-6 flex max-w-md items-center gap-3 rounded-xl border border-line bg-panel px-4 py-2.5 font-mono text-sm">
              <span className="text-muted">$</span>
              <span className="flex-1 truncate">npx expo install expo-mcp-bridge</span>
              <CopyButton text="npx expo install expo-mcp-bridge react-native-view-shot && npx expo-mcp-bridge init" />
            </div>
          </div>
          <AgentDemo />
        </div>
        <p className="pb-10 text-center text-xs uppercase tracking-[0.2em] text-muted">Works with Claude Code · Antigravity · Cursor · Windsurf · any MCP agent</p>
      </section>

      {/* bridge features */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6" aria-labelledby="bridge-h">
        <Reveal>
          <p className="text-sm font-semibold text-accent">expo-mcp-bridge</p>
          <h2 id="bridge-h" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Your agent uses your app the way it uses a browser.</h2>
          <p className="mt-3 max-w-2xl text-muted">No more pasting screenshots into the chat. 17 tools that read, act, debug and press hardware keys — on the device in your hand.</p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bridgeFeatures.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-line bg-panel p-6 transition-transform hover:-translate-y-1">
                <div className="text-2xl" aria-hidden>{f.icon}</div>
                <h3 className="mt-3 font-bold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* how it works */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6" aria-labelledby="hiw-h">
        <Reveal>
          <h2 id="hiw-h" className="mb-6 text-2xl font-extrabold tracking-tight sm:text-3xl">How it works</h2>
          <HowItWorks />
          <p className="mt-4 max-w-3xl text-sm text-muted">The in-app component reads React&apos;s live component tree — your testIDs, labels, inputs and lists — and calls your real handlers, so app logic runs exactly as if a user did it.</p>
        </Reveal>
      </section>

      {/* launch video */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2" aria-labelledby="video-h">
        <Reveal>
          <p className="text-sm font-semibold text-accent-2">expo-launch-video</p>
          <h2 id="video-h" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Ask for a launch video. Get a launch video.</h2>
          <p className="mt-3 text-muted">“Make a 30 second launch video of my app.” Your agent records the real app on your phone, picks the best takes, writes the copy and cuts it — then you polish it in a studio by typing.</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {videoFeatures.map((f) => (
              <li key={f.title} className="rounded-xl border border-line bg-panel p-4">
                <h3 className="text-sm font-bold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted">{f.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}><VideoShowcase /></Reveal>
      </section>

      {/* install */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6" aria-labelledby="install-h">
        <Reveal>
          <h2 id="install-h" className="text-center text-3xl font-extrabold tracking-tight">Up and running in two minutes</h2>
          <div className="mt-8">
            <Tabs tabs={[
              { label: "App control", content: (
                <div className="mt-4">
                  <CodeBlock code={`npx expo install expo-mcp-bridge react-native-view-shot\nnpx expo-mcp-bridge init`} />
                  <CodeBlock lang="tsx" title="app/_layout.tsx" code={`import { Stack, router } from 'expo-router';\nimport { AgentBridge } from 'expo-mcp-bridge';\n\nexport default function RootLayout() {\n  return (\n    <>\n      <Stack />\n      <AgentBridge router={router} />\n    </>\n  );\n}`} />
                </div>
              ) },
              { label: "+ Launch videos", content: (
                <div className="mt-4">
                  <CodeBlock code={`npx expo install expo-mcp-bridge react-native-view-shot\nnpm install --save-dev expo-launch-video\nnpx expo-launch-video init`} />
                  <p className="text-sm text-muted">Mount <code className="font-mono">&lt;AgentBridge /&gt;</code> the same way, run <code className="font-mono">npx expo start</code>, open the app on your phone and ask your agent for a video.</p>
                </div>
              ) },
            ]} />
          </div>
          <div className="mt-8 rounded-2xl border border-accent/40 bg-accent/10 p-6">
            <h3 className="font-bold">Or let your AI install it</h3>
            <p className="mt-1 text-sm text-muted">Paste this into Claude Code, Antigravity or Cursor inside your Expo project:</p>
            <div className="mt-3 flex items-start gap-3 rounded-xl border border-line bg-panel p-3 font-mono text-sm">
              <span className="flex-1 break-all">Read {site.aiSetup.video} and set it up in this project.</span>
              <CopyButton text={`Read ${site.aiSetup.video} and set it up in this project.`} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* faq */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6" aria-labelledby="faq-h">
        <h2 id="faq-h" className="text-center text-3xl font-extrabold tracking-tight">FAQ</h2>
        <div className="mt-8 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-xl border border-line bg-panel px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                {f.q}<span className="text-muted transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="mt-2 text-sm text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* cta */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-accent/20 via-accent-2/10 to-accent-3/10 p-10 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">Free. Open source. Yours to ship.</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">Both libraries are MIT-licensed. Star them on GitHub, file issues, send PRs.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={site.repos.bridge} className="rounded-xl bg-accent px-5 py-3 font-semibold text-white">expo-mcp-bridge on GitHub</a>
            <a href={site.repos.video} className="rounded-xl border border-line bg-panel px-5 py-3 font-semibold">expo-launch-video on GitHub</a>
          </div>
        </div>
      </section>
    </>
  );
}
