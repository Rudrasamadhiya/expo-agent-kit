import Link from "next/link";
import { HeroArt } from "@/components/home/HeroArt";
import { HeroHeadline } from "@/components/home/HeroHeadline";
import { HeroStage } from "@/components/home/HeroStage";
import { HowItWorks } from "@/components/home/HowItWorks";
import { InstallSwitcher } from "@/components/home/InstallSwitcher";
import { Storyboard } from "@/components/home/Storyboard";
import { VelocityBand } from "@/components/home/VelocityBand";
import { Icon, Sparkle } from "@/components/home/Icons";
import { Reveal } from "@/components/Reveal";
import { Tabs } from "@/components/Tabs";
import { CodeBlock } from "@/components/CodeBlock";
import { CopyButton } from "@/components/CopyButton";
import { asset, site } from "@/content/site";
import { faqs } from "@/content/faq";

const worksWith = ["Claude Code", "Antigravity", "Cursor", "Windsurf", "Cline", "VS Code", "Any MCP client", "Expo Go", "Dev builds", "iOS", "Android", "expo-router", "React Native"];

const bridgeFeatures = [
  { title: "Real phones, zero native setup", body: "Expo Go or a dev build, iPhone or Android, over Wi-Fi. Mount one component and you're done." },
  { title: "Token-cheap by design", body: "The agent reads a compact outline of the visible screen — about 70 tokens instead of 1,000 for a screenshot — and every action returns only what changed." },
  { title: "Fast flows", body: "Actions finish the moment the UI settles. app_batch fills a whole form in one call." },
  { title: "Sees what broke", body: "New JS errors and failed requests are attached to the action that caused them." },
  { title: "Full control", body: "Tap, type, scroll, toggle, navigate, wait, screenshots, logs, network, eval — and volume, back and home keys." },
  { title: "Dev only", body: "In production builds <AgentBridge /> renders its children and nothing else." },
];

const videoFeatures = [
  { title: "Live footage", body: "Page loads, scrolls, taps and panels recorded in-app on your phone." },
  { title: "Auto-directed", body: "Zooms, pop-outs, captions and chips written from your real numbers." },
  { title: "Sound design", body: "Pops, clicks, whooshes and chimes timed to every animation." },
  { title: "Prompt the studio", body: "Simple edits apply instantly; anything else goes to your agent." },
];

const steps = [
  { n: "01", title: "Install", body: "Add the package and run init — it writes your agent's MCP config and skill." },
  { n: "02", title: "Mount", body: "Drop <AgentBridge /> into your root layout and open the app on your phone." },
  { n: "03", title: "Ask", body: "“Test the signup form.” “Make a launch video.” Your agent takes it from there." },
];


const conversation = `you › test the login form with an empty password

agent › app_snapshot
        input "Email" [e3] · input "Password" [e4] · button "Log In" [e7]
agent › app_batch  type e3 "sam@demo.dev" → tap e7
        + text "Please enter your password."

agent › Login blocks an empty password with a clear message.
        No network call was made, no JS errors.

you › now make a 30 second launch video of the app

agent › video_record × 6 takes · video_plan → 5 scenes · video_studio
        Studio open at http://localhost:8790 — export is 1080p MP4.`;

const layoutCode = `import { Stack, router } from 'expo-router';
import { AgentBridge } from 'expo-mcp-bridge';

export default function RootLayout() {
  return (
    <>
      <Stack />
      <AgentBridge router={router} />
    </>
  );
}`;

const mcpConfig = `{
  "mcpServers": {
    "expo-app": { "command": "npx", "args": ["expo-mcp-bridge"] }
  }
}`;

const libraries = [
  { name: "expo-mcp-bridge", tag: "App control", href: "/docs/bridge/", body: "Your agent uses your app the way it uses a browser — it reads the screen, taps, types, scrolls, takes screenshots and reads logs and network, on the phone in your hand.", code: "<AgentBridge router={router} />", npm: site.npm.bridge, version: site.versions.bridge, mark: "bg-accent" },
  { name: "expo-launch-video", tag: "Launch videos", href: "/docs/video/", body: "Ask for a launch video, get a launch video. Real footage, motion graphics, pop-outs and sound — tweaked in a studio by typing, exported as 1080p MP4.", code: "“make a 30 second launch video”", npm: site.npm.video, version: site.versions.video, mark: "bg-[var(--shape-2)]" },
];

const h2 = "display text-4xl sm:text-6xl";

export default function Home() {
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-6 px-4 pt-8 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:pt-14">
          <Reveal animate className="order-2 lg:order-1">
            <HeroHeadline />
            <p className="mt-7 max-w-[36ch] text-lg leading-relaxed text-muted sm:text-xl">
              Claude Code, Antigravity and Cursor see, tap, type and debug your Expo app <strong className="highlight font-semibold text-text">live on a real phone</strong> — then shoot a polished launch video of it.
            </p>
          </Reveal>
          <Reveal animate delay={0.1} className="order-1 mx-auto w-[78%] max-w-[560px] lg:order-2 lg:w-full"><HeroArt /></Reveal>
        </div>

        <div className="relative mx-auto mt-10 grid max-w-7xl grid-cols-[minmax(0,1fr)] items-end gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <InstallSwitcher />
          <div>
            <p className="mb-3 text-sm text-muted lg:text-right">Free and open source under MIT · <Link href="/docs/changelog/" className="underline decoration-line underline-offset-4 hover:text-text">v{site.versions.bridge} and v{site.versions.video}</Link></p>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/docs/bridge/" className="group inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-sm font-semibold text-on-accent transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-12px_var(--accent)]">
                Get started <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/docs/video/" className="inline-flex items-center gap-2 border border-text/70 px-6 py-3.5 text-sm font-semibold transition-colors duration-300 hover:bg-text hover:text-bg">
                Make a launch video <Icon name="chevron" className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* works with: tilted tape */}
      <section aria-label="Works with" className="relative z-10 -my-4 overflow-x-clip py-8">
        <div className="marquee -mx-4 -rotate-2 overflow-hidden border-y-2 border-[#0b0b0b] bg-[var(--shape-2)] py-3.5 text-[#0b0b0b] shadow-[0_18px_30px_-18px_rgba(0,0,0,0.45)]">
          <div className="marquee-track">
            {[...worksWith, ...worksWith].map((w, i) => (
              <span key={i} aria-hidden={i >= worksWith.length} className="flex items-center whitespace-nowrap px-5 font-mono text-sm font-bold uppercase tracking-wider">
                {w}<Sparkle className="ml-10 size-4" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* live demo */}
      <section className="border-b border-line bg-bg-2 pb-24 pt-24" aria-labelledby="demo-h">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
            <h2 id="demo-h" className={h2}>Watch it work.</h2>
            <p className="max-w-[42ch] text-muted">An agent tests a login form on a real phone: it snapshots the screen, types, taps and reads back only what changed.</p>
          </div>
          <HeroStage />
        </div>
      </section>

      <VelocityBand />

      {/* two libraries */}
      <section className="mx-auto max-w-7xl px-4 pt-32 sm:px-6" aria-labelledby="kit-h">
        <h2 id="kit-h" className={`${h2} max-w-[16ch]`}>Two libraries. One superpower.</h2>
        <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line lg:grid-cols-2">
          {libraries.map((lib) => (
            <article key={lib.name} className="group flex flex-col bg-bg p-8 transition-colors duration-300 hover:bg-panel sm:p-12">
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2.5 text-sm font-medium text-muted"><span className={`size-2.5 ${lib.mark}`} />{lib.tag}</span>
                <a href={lib.npm} className="font-mono text-xs text-muted underline decoration-line underline-offset-4 hover:text-text">v{lib.version}</a>
              </div>
              <h3 className="display mt-8 text-3xl sm:text-4xl">{lib.name}</h3>
              <p className="mt-4 max-w-[52ch] leading-relaxed text-muted">{lib.body}</p>
              <code className="mt-8 block border-l-2 border-text py-1 pl-4 font-mono text-sm">{lib.code}</code>
              {lib.name === "expo-launch-video" && (
                <p className="mt-6 text-sm text-muted">Built on <Link href="/docs/bridge/" className="font-medium text-text underline decoration-line underline-offset-4 hover:decoration-text">expo-mcp-bridge</Link> — installed with it as a dependency, so one server does app control and video.</p>
              )}
              <Link href={lib.href} className="mt-auto inline-flex items-center gap-1.5 pt-10 text-sm font-semibold">
                Read the docs <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* just ask */}
      <section className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-14 px-4 py-32 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]" aria-labelledby="ask-h">
        <div>
          <h2 id="ask-h" className={h2}>No more pasting screenshots into the chat.</h2>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted">Your agent snapshots the visible screen, acts by reference and reads back only what changed — new text, errors and failed requests included. It checks its own work.</p>
          <ul className="mt-8 space-y-3.5">
            {["Fills forms in one batched call", "Catches the JS error a tap caused", "Waits for the UI instead of polling", "Never types your real passwords"].map((t) => (
              <li key={t} className="flex items-center gap-3"><Icon name="check" className="size-4 text-accent-ink" />{t}</li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden border border-line bg-panel shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]">
          <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
            <span className="size-3 rounded-full bg-[#ff5f57]" /><span className="size-3 rounded-full bg-[#febc2e]" /><span className="size-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="p-4 sm:p-5">
            <Tabs label="Example" tabs={[
              { label: "Conversation", content: <div className="mt-2 [&_figure]:my-2"><CodeBlock lang="text" code={conversation} /></div> },
              { label: "app/_layout.tsx", content: <div className="mt-2 [&_figure]:my-2"><CodeBlock lang="tsx" code={layoutCode} /></div> },
              { label: ".mcp.json", content: <div className="mt-2 [&_figure]:my-2"><CodeBlock lang="json" code={mcpConfig} /></div> },
            ]} />
          </div>
        </div>
      </section>

      {/* bridge capabilities: editorial rows */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6" aria-labelledby="bridge-h">
        <h2 id="bridge-h" className={`${h2} max-w-[18ch]`}>Built for agents. Kind to your token budget.</h2>
        <dl className="mt-14 border-t border-line">
          {bridgeFeatures.map((f) => (
            <div key={f.title} className="grid gap-2 border-b border-line py-7 transition-colors duration-300 hover:bg-bg-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-10 sm:px-4">
              <dt className="display text-xl sm:text-2xl">{f.title}</dt>
              <dd className="max-w-[56ch] leading-relaxed text-muted">{f.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* how it works */}
      <section className="mx-auto max-w-7xl px-4 py-32 sm:px-6" aria-labelledby="hiw-h">
        <h2 id="hiw-h" className={`${h2} max-w-[14ch]`}>Up and running in two minutes.</h2>
        <ol className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="border-t-2 border-text pt-6">
              <span className="tabular font-mono text-sm text-muted">{s.n}</span>
              <h3 className="display mt-3 text-2xl">{s.title}</h3>
              <p className="mt-2 max-w-[36ch] leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-16"><HowItWorks /></div>
      </section>

      {/* launch video */}
      <section className="border-y border-line bg-bg-2 py-32" aria-labelledby="video-h">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
            <h2 id="video-h" className={h2}>Ask for a launch video. <span className="text-accent-ink">Get one.</span></h2>
            <p className="max-w-[46ch] text-lg leading-relaxed text-muted">Your agent records the real app on your phone, picks the best takes, writes the copy and cuts it — intro, pop-outs, side-by-side panels, outro.</p>
          </div>
          <Reveal animate className="mt-14"><Storyboard /></Reveal>
          <dl className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {videoFeatures.map((f) => (
              <div key={f.title} className="border-t border-text/80 pt-5">
                <dt className="font-semibold">{f.title}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted">{f.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* studio */}
      <section className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-14 overflow-x-clip px-4 py-32 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]" aria-labelledby="studio-h">
        <div>
          <h2 id="studio-h" className={h2}>Edit by typing what you want.</h2>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted">A browser editor with live preview, a timeline and a scene inspector. Simple edits apply instantly; anything else goes to your agent, which edits the video live.</p>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Example prompts">
            {["speed up analytics 2x", "text on the right", "zoom into the Start button", "remove pricing", "make it 9:16"].map((p) => (
              <li key={p} className="border border-line bg-panel px-3.5 py-1.5 font-mono text-xs">{p}</li>
            ))}
          </ul>
          <Link href="/docs/video/studio/" className="group mt-10 inline-flex items-center gap-1.5 text-sm font-semibold">Tour the studio <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-1" /></Link>
        </div>
        <div className="group [perspective:1600px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/images/studio.svg")} alt="The launch video studio: scene list, live preview with a popped-out card, scene inspector, timeline with sound markers, and a prompt box reading “make the intro feel more premium”." loading="lazy"
            className="w-full border border-line shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [transform:rotateY(-8deg)_rotateX(4deg)] group-hover:[transform:rotateY(0)_rotateX(0)]" />
        </div>
      </section>

      {/* faq (also as FAQPage structured data for search engines) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }) }} />
      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6" aria-labelledby="faq-h">
        <h2 id="faq-h" className={h2}>Questions, answered.</h2>
        <div className="mt-12 border-t border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                {f.q}<Icon name="plus" className="size-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="mt-3 max-w-[62ch] leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* cta */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden bg-[#0b0b0b] px-6 py-20 text-[#f7f7f2] sm:px-14 sm:py-24">
          <svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 1000 520" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <path fill="var(--shape-1)" d="M1060 -40C900-60 760 20 760 130s110 170 230 170 140-110 70-340z" />
            <path fill="var(--shape-2)" d="M-60 560C80 600 240 540 240 430S120 260 10 260-130 380-60 560z" />
          </svg>
          <div className="relative max-w-3xl">
            <h2 className="display text-5xl sm:text-7xl">Free. Open source. Yours to ship.</h2>
            <p className="mt-6 max-w-[44ch] text-lg text-[#f7f7f2]/75">Both libraries are MIT-licensed. Star them on GitHub, file issues, send pull requests.</p>
            <div className="mt-8 flex max-w-lg items-center gap-3 border border-white/20 px-4 py-3 font-mono text-sm">
              <span className="text-[#f7f7f2]/50">$</span>
              <span className="min-w-0 flex-1 truncate">npx expo install expo-mcp-bridge</span>
              <CopyButton text="npx expo install expo-mcp-bridge react-native-view-shot && npx expo-mcp-bridge init" className="!border-white/25 !bg-transparent !text-[#f7f7f2]" />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/docs/bridge/" className="bg-[#f7f7f2] px-6 py-3.5 text-sm font-semibold text-[#0b0b0b] transition-transform duration-300 hover:-translate-y-0.5">Get started</Link>
              <a href={site.repos.bridge} className="border border-white/25 px-6 py-3.5 text-sm font-semibold transition-colors duration-300 hover:bg-white/10">GitHub · bridge</a>
              <a href={site.repos.video} className="border border-white/25 px-6 py-3.5 text-sm font-semibold transition-colors duration-300 hover:bg-white/10">GitHub · launch-video</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
