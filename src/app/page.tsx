import Link from "next/link";
import { HeroArt } from "@/components/home/HeroArt";
import { HeroStage } from "@/components/home/HeroStage";
import { HowItWorks } from "@/components/home/HowItWorks";
import { InstallSwitcher } from "@/components/home/InstallSwitcher";
import { RotatingWord } from "@/components/home/RotatingWord";
import { SpotlightCard } from "@/components/home/SpotlightCard";
import { CountUp } from "@/components/home/CountUp";
import { Storyboard } from "@/components/home/Storyboard";
import { Icon, type IconName } from "@/components/home/Icons";
import { Reveal } from "@/components/Reveal";
import { Tabs } from "@/components/Tabs";
import { CodeBlock } from "@/components/CodeBlock";
import { CopyButton } from "@/components/CopyButton";
import { asset, site } from "@/content/site";

const worksWith = ["Claude Code", "Antigravity", "Cursor", "Windsurf", "Cline", "VS Code", "Any MCP client", "Expo Go", "Dev builds", "iOS", "Android", "expo-router", "React Native"];

const stats = [
  { to: 17, suffix: "", label: "app-control tools" },
  { to: 10, suffix: "", label: "video tools" },
  { to: 0, suffix: "", label: "native modules to link" },
  { to: 100, suffix: "%", label: "free & MIT-licensed" },
];

const bridgeFeatures: { icon: IconName; title: string; body: string }[] = [
  { icon: "phone", title: "Real phones, zero native setup", body: "Expo Go or a dev build, iPhone or Android, over Wi-Fi. Mount one component and you're done." },
  { icon: "feather", title: "Token-cheap by design", body: "The agent reads a compact outline of the visible screen; every action returns only what changed." },
  { icon: "bolt", title: "Fast flows", body: "Actions finish the moment the UI settles. app_batch fills a whole form in one call." },
  { icon: "bug", title: "Sees what broke", body: "New JS errors and failed requests are attached to the action that caused them." },
  { icon: "sliders", title: "Full control", body: "Tap, type, scroll, toggle, navigate, wait, screenshots, logs, network, eval — and volume / back / home keys." },
  { icon: "shield", title: "Dev only", body: "In production builds <AgentBridge /> renders its children and nothing else." },
];

const videoFeatures: { icon: IconName; title: string; body: string }[] = [
  { icon: "film", title: "Live footage", body: "Page loads, scrolls, taps and panels recorded in-app on your phone." },
  { icon: "wand", title: "Auto-directed", body: "Zooms, pop-outs, captions and chips written from your real numbers." },
  { icon: "sound", title: "Sound design", body: "Pops, clicks, whooshes and chimes timed to every animation." },
  { icon: "chat", title: "Prompt the studio", body: "“speed up analytics 2x” — simple edits apply instantly, the rest go to your agent." },
];

const steps = [
  { n: "01", title: "Install", body: "Add the package and run init — it writes your agent's MCP config and skill." },
  { n: "02", title: "Mount", body: "Drop <AgentBridge /> into your root layout and open the app on your phone." },
  { n: "03", title: "Ask", body: "“Test the signup form.” “Make a launch video.” Your agent takes it from there." },
];

const faqs = [
  { q: "Does it work with Expo Go?", a: "Yes. Both libraries are pure JavaScript in your app; screenshots use react-native-view-shot, which ships with Expo Go. In a custom dev build, rebuild once after installing it." },
  { q: "Which agents are supported?", a: "Any MCP client: Claude Code, Antigravity, Cursor, Windsurf, Cline and more. `init` writes the config for Claude Code and an AGENTS.md guide that other agents read." },
  { q: "Is anything shipped to production?", a: "No. <AgentBridge /> only runs in development (__DEV__) and only connects to your own computer." },
  { q: "Does it type my passwords?", a: "No. The skills tell agents never to enter real passwords, payment or ID details — you type real credentials on the phone yourself." },
  { q: "What does it cost?", a: "Nothing. Both libraries are MIT-licensed and free. Studio edits by Claude are optional and use your own Anthropic credentials if you set them." },
];

const conversation = `you › test the login form with an empty password

agent › app_snapshot
        input "Email" [e3] · input "Password" [e4] · button "Log In" [e7]
agent › app_batch  type e3 "sam@demo.dev" → tap e7
        + text "Please enter your password."

agent › Login blocks an empty password with a clear message ✓
        No network call was made, no JS errors.

you › now make a 30 second launch video of the app

agent › video_record × 6 takes · video_plan → 5 scenes · video_studio
        Studio open at http://localhost:8790 — export is 1080p MP4.`;

export default function Home() {
  return (
    <>
      {/* ───────── hero ───────── */}
      <section className="relative overflow-hidden">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_65%)]" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-6 px-4 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:pt-16">
          <div className="order-2 lg:order-1">
            <Reveal>
              <Link href="/docs/changelog/" className="group inline-flex items-center gap-2 border border-line bg-panel/70 py-1 pl-1 pr-3 font-mono text-[11px] uppercase tracking-wider text-muted backdrop-blur hover:text-text">
                <span className="bg-hi px-2 py-0.5 font-bold text-[#111]">New</span>
                Screen recorder + launch videos
                <Icon name="arrow" className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 text-[2.5rem] font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-7xl lg:text-[5.4rem]">
                Let your AI agent <RotatingWord words={["test", "drive", "debug", "film"]} /><br />
                your Expo app.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
                Claude Code, Antigravity and Cursor see, tap, type and debug your app <strong className="highlight font-semibold text-text">live on a real phone</strong> — then shoot a polished launch video of it.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="order-1 mx-auto w-[78%] max-w-[560px] lg:order-2 lg:w-full"><HeroArt /></Reveal>
        </div>

        {/* install + CTA row, motion.dev style */}
        <div className="relative mx-auto mt-10 grid max-w-7xl items-end gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <Reveal delay={0.15}><InstallSwitcher /></Reveal>
          <Reveal delay={0.2}>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-muted lg:text-right">Free and open source · MIT · v{site.versions.bridge} / v{site.versions.video}</p>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/docs/bridge/" className="shine group inline-flex items-center gap-2 bg-accent px-6 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-on-accent transition-transform hover:-translate-y-0.5">
                Get started <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/docs/video/" className="inline-flex items-center gap-2 border border-text/80 px-6 py-3.5 font-mono text-sm font-bold uppercase tracking-wider transition-colors hover:bg-text hover:text-bg">
                Launch video ›
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── works with: tilted tape ───────── */}
      <section aria-label="Works with" className="relative z-10 -my-4 overflow-x-clip py-8">
        <div className="marquee -mx-4 -rotate-2 overflow-hidden border-y-2 border-[#0b0b0b] bg-[var(--shape-2)] py-3.5 text-[#0b0b0b] shadow-xl">
          <div className="marquee-track">
            {[...worksWith, ...worksWith].map((w, i) => (
              <span key={i} aria-hidden={i >= worksWith.length} className="flex items-center whitespace-nowrap px-5 font-mono text-sm font-bold uppercase tracking-wider">
                {w}<span className="ml-10 text-lg" aria-hidden>✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── live demo ───────── */}
      <section className="border-b border-line bg-bg-2 pb-24 pt-20" aria-labelledby="demo-h">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
            <h2 id="demo-h" className="text-4xl font-extrabold tracking-tight sm:text-5xl">Watch it work.</h2>
            <p className="max-w-md text-muted">An agent tests a login form on a real phone — snapshot, type, tap, read the diff.</p>
          </Reveal>
          <HeroStage />
        </div>
      </section>

      {/* ───────── stats: solid color block ───────── */}
      <section className="bg-[var(--shape-1)] text-[var(--on-shape-1)]" aria-label="At a glance">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className={`px-4 py-14 ${i > 0 ? "lg:border-l" : ""} ${i % 2 ? "border-l" : ""} border-black/15`}>
              <div className="text-6xl font-extrabold tracking-[-0.04em] sm:text-7xl"><CountUp to={s.to} suffix={s.suffix} /></div>
              <div className="mt-2 font-mono text-xs font-bold uppercase tracking-wider opacity-80">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────── two libraries ───────── */}
      <section className="mx-auto max-w-7xl px-4 pt-28 sm:px-6" aria-labelledby="kit-h">
        <Reveal className="text-center">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-ink">The kit</p>
          <h2 id="kit-h" className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Two libraries. One superpower.</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {[
            { name: "expo-mcp-bridge", tag: "App control", color: "text-accent-ink", icon: "terminal" as IconName, href: "/docs/bridge/", body: "Your agent uses your app the way it uses a browser — reads the screen, taps, types, scrolls, takes screenshots and reads logs and network, on the phone in your hand.", code: "<AgentBridge router={router} />", npm: site.npm.bridge, version: site.versions.bridge },
            { name: "expo-launch-video", tag: "Launch videos", color: "text-accent-2-ink", icon: "film" as IconName, href: "/docs/video/", body: "Ask for a launch video, get a launch video. Real footage, motion graphics, pop-outs and sound — tweaked in a studio by typing, exported as 1080p MP4.", code: "“make a 30s launch video”", npm: site.npm.video, version: site.versions.video },
          ].map((lib, i) => (
            <Reveal key={lib.name} delay={i * 0.08}>
              <SpotlightCard className="glow-border group h-full overflow-hidden rounded-3xl border border-line bg-panel p-8 sm:p-10">
                <div className="flex items-center justify-between">
                  <span className={`grid size-12 place-items-center rounded-2xl bg-bg-2 ${lib.color}`}><Icon name={lib.icon} className="size-6" /></span>
                  <a href={lib.npm} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted hover:text-text">v{lib.version}</a>
                </div>
                <p className={`mt-6 text-sm font-semibold ${lib.color}`}>{lib.tag}</p>
                <h3 className="mt-1 font-mono text-2xl font-bold tracking-tight sm:text-3xl">{lib.name}</h3>
                <p className="mt-3 text-muted">{lib.body}</p>
                <div className="mt-6 rounded-xl border border-line bg-code px-4 py-3 font-mono text-sm">{lib.code}</div>
                <Link href={lib.href} className="mt-6 inline-flex items-center gap-1.5 font-mono text-sm font-bold uppercase tracking-wider transition-colors hover:text-accent-ink">
                  Read the docs ›
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────── just ask (code showcase) ───────── */}
      <section className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-12 px-4 py-28 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]" aria-labelledby="ask-h">
        <Reveal>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-ink">Just ask</p>
          <h2 id="ask-h" className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">No more pasting screenshots into the chat.</h2>
          <p className="mt-5 text-lg text-muted">Your agent snapshots the visible screen, acts by reference, and reads back only what changed — new text, errors and failed requests included. It checks its own work.</p>
          <ul className="mt-7 space-y-3">
            {["Fills forms in one batched call", "Catches the JS error a tap caused", "Waits for the UI instead of polling", "Never types your real passwords"].map((t) => (
              <li key={t} className="flex items-center gap-3"><span className="grid size-6 place-items-center rounded-full bg-accent/15 text-accent-ink"><Icon name="check" className="size-3.5" /></span>{t}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl shadow-black/10">
            <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
              <span className="size-3 rounded-full bg-[#ff5f57]" /><span className="size-3 rounded-full bg-[#febc2e]" /><span className="size-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="p-4 sm:p-5">
              <Tabs tabs={[
                { label: "Conversation", content: <div className="mt-2 [&_figure]:my-2"><CodeBlock lang="text" code={conversation} /></div> },
                { label: "app/_layout.tsx", content: <div className="mt-2 [&_figure]:my-2"><CodeBlock lang="tsx" code={`import { Stack, router } from 'expo-router';\nimport { AgentBridge } from 'expo-mcp-bridge';\n\nexport default function RootLayout() {\n  return (\n    <>\n      <Stack />\n      <AgentBridge router={router} />\n    </>\n  );\n}`} /></div> },
                { label: ".mcp.json", content: <div className="mt-2 [&_figure]:my-2"><CodeBlock lang="json" code={`{\n  "mcpServers": {\n    "expo-app": { "command": "npx", "args": ["expo-mcp-bridge"] }\n  }\n}`} /></div> },
              ]} label="Example" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ───────── bridge features ───────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6" aria-labelledby="bridge-h">
        <Reveal className="max-w-3xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-ink">expo-mcp-bridge</p>
          <h2 id="bridge-h" className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Built for agents. Kind to your token budget.</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bridgeFeatures.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <SpotlightCard className="group h-full rounded-2xl border border-line bg-panel p-7 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent/50">
                <span className="grid size-11 place-items-center rounded-xl bg-accent/12 text-accent-ink transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]">
                  <Icon name={f.icon} />
                </span>
                <h3 className="mt-5 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────── how it works ───────── */}
      <section className="mx-auto max-w-7xl px-4 py-28 sm:px-6" aria-labelledby="hiw-h">
        <Reveal className="text-center">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-ink">How it works</p>
          <h2 id="hiw-h" className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Up and running in two minutes.</h2>
        </Reveal>
        <div className="relative mt-14 grid gap-6 md:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-7 hidden h-px bg-accent opacity-40 md:block" aria-hidden />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1} className="relative text-center">
              <div className="mx-auto grid size-14 place-items-center rounded-2xl border border-line bg-panel font-mono text-lg font-bold shadow-lg shadow-black/5"><span className="gradient-text">{s.n}</span></div>
              <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-muted">{s.body}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14"><HowItWorks /></Reveal>
      </section>

      {/* ───────── launch video ───────── */}
      <section className="relative overflow-hidden border-y border-line bg-bg-2/60 py-28" aria-labelledby="video-h">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-2-ink">expo-launch-video</p>
            <h2 id="video-h" className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Ask for a launch video. <span className="gradient-text">Get a launch video.</span></h2>
            <p className="mt-5 text-lg text-muted">Your agent records the real app on your phone, picks the best takes, writes the copy and cuts it — intro, pop-outs, side-by-side panels, outro.</p>
          </Reveal>
          <Reveal className="mx-auto mt-12 max-w-5xl" delay={0.1}><Storyboard /></Reveal>
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {videoFeatures.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-panel p-5">
                  <span className="text-accent-2-ink"><Icon name={f.icon} /></span>
                  <h3 className="mt-3 font-bold">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── studio ───────── */}
      <section className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] overflow-x-clip items-center gap-12 px-4 py-28 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]" aria-labelledby="studio-h">
        <Reveal>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-2-ink">The studio</p>
          <h2 id="studio-h" className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Edit by typing what you want.</h2>
          <p className="mt-5 text-lg text-muted">A browser editor with live preview, a timeline and a scene inspector. Simple edits apply instantly; anything else goes to your agent, which edits the video live.</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["speed up analytics 2x", "text on the right", "zoom into the Start button", "remove pricing", "make it 9:16"].map((p) => (
              <span key={p} className="rounded-full border border-line bg-panel px-3.5 py-1.5 font-mono text-xs text-muted">“{p}”</span>
            ))}
          </div>
          <Link href="/docs/video/studio/" className="mt-8 inline-flex items-center gap-1.5 font-semibold text-accent-2-ink transition-all hover:gap-2.5">Tour the studio ›</Link>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="group relative [perspective:1600px]">
            <div className="absolute -inset-6 rounded-[2rem] bg-accent/20 blur-2xl" aria-hidden />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/images/studio.svg")} alt="The launch video studio: scene list, live preview with a popped-out card, scene inspector, timeline with sound markers, and a prompt box reading “make the intro feel more premium”." loading="lazy"
              className="relative w-full rounded-2xl border border-line shadow-2xl shadow-black/30 transition-transform duration-700 [transform:rotateY(-8deg)_rotateX(4deg)] group-hover:[transform:rotateY(0)_rotateX(0)]" />
          </div>
        </Reveal>
      </section>

      {/* ───────── faq ───────── */}
      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6" aria-labelledby="faq-h">
        <Reveal><h2 id="faq-h" className="text-center text-4xl font-extrabold tracking-tight">Questions, answered</h2></Reveal>
        <div className="mt-10 divide-y divide-line rounded-2xl border border-line bg-panel">
          {faqs.map((f) => (
            <details key={f.q} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {f.q}<span className="grid size-7 shrink-0 place-items-center rounded-full border border-line text-muted transition-transform duration-300 group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="mt-3 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ───────── cta ───────── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#0b0b12] px-6 py-16 text-center text-white sm:px-12 sm:py-20">
          <svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 1000 520" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <path fill="var(--shape-1)" d="M-60 -40C80-60 230 10 240 120S130 300 10 300-120 200-60-40z" />
            <path fill="var(--shape-2)" d="M1060 560C920 600 760 540 760 430s120-170 230-170 140 120 70 300z" />
            <circle cx="880" cy="90" r="22" fill="var(--shape-1)" />
            <circle cx="140" cy="440" r="12" fill="var(--shape-2)" />
          </svg>
          <div className="relative">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl">Free. Open source.<br />Yours to ship.</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">Both libraries are MIT-licensed. Star them on GitHub, file issues, send PRs.</p>
            <div className="mx-auto mt-8 flex max-w-lg items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-left font-mono text-sm backdrop-blur">
              <span className="text-white/50">$</span>
              <span className="min-w-0 flex-1 truncate">npx expo install expo-mcp-bridge</span>
              <CopyButton text="npx expo install expo-mcp-bridge react-native-view-shot && npx expo-mcp-bridge init" className="!border-white/20 !bg-white/10 !text-white" />
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/docs/bridge/" className="shine rounded-xl bg-white px-6 py-3.5 font-semibold text-[#0b0b12] transition-transform hover:-translate-y-0.5">Get started</Link>
              <a href={site.repos.bridge} className="rounded-xl border border-white/20 px-6 py-3.5 font-semibold transition-colors hover:bg-white/10">GitHub · bridge</a>
              <a href={site.repos.video} className="rounded-xl border border-white/20 px-6 py-3.5 font-semibold transition-colors hover:bg-white/10">GitHub · launch-video</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
