"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

type Line = { kind: "user" | "tool" | "out" | "agent"; text: string };
type Phone = { email: string; password: string; focus: "email" | "password" | "login" | null; error: boolean };

// One scripted session, shown step by step. Mirrors the real tool output format.
const script: { line?: Line; phone?: Partial<Phone>; wait: number }[] = [
  { line: { kind: "user", text: "test the login form with an empty password" }, wait: 900 },
  { line: { kind: "tool", text: "app_snapshot" }, wait: 500 },
  { line: { kind: "out", text: 'input "Email" value="" [e3]\ninput "Password" (secure) [e4]\nbutton "Log In" [e7]' }, wait: 1100 },
  { line: { kind: "tool", text: 'app_type {ref:"e3", value:"sam@demo.dev"}' }, phone: { focus: "email" }, wait: 300 },
  { phone: { email: "sam@demo.dev" }, wait: 700 },
  { line: { kind: "tool", text: 'app_tap {ref:"e7"}' }, phone: { focus: "login" }, wait: 650 },
  { phone: { error: true, focus: null }, line: { kind: "out", text: '+ text "Please enter your password."' }, wait: 1200 },
  { line: { kind: "agent", text: "Login blocks an empty password with a clear message ✓ — no network call was made." }, wait: 3200 },
];

const empty: Phone = { email: "", password: "", focus: null, error: false };

export function AgentDemo() {
  const reduce = useReducedMotion();
  // Same first render on server and client (no hydration mismatch);
  // reduced-motion visitors jump straight to the finished state after mount.
  const [step, setStep] = useState(0);

  useEffect(() => {
    const done = step >= script.length;
    if (reduce && done) return;
    const t = setTimeout(
      () => setStep(reduce ? script.length : done ? 0 : step + 1),
      reduce ? 0 : done ? 1200 : script[step].wait,
    );
    return () => clearTimeout(t);
  }, [step, reduce]);

  // The phone shows every change up to and including the current step.
  const phone = script.slice(0, step + 1).reduce<Phone>((p, s) => ({ ...p, ...s.phone }), empty);
  const lines = script.slice(0, step).map((s) => s.line).filter(Boolean) as Line[];

  return (
    <div className="relative grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]" aria-label="Animated demo: an AI agent testing a login form on a phone">
      {/* agent terminal */}
      <div className="flex min-h-[340px] flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl shadow-black/20">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" /><span className="size-2.5 rounded-full bg-[#febc2e]" /><span className="size-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-xs text-muted">agent · expo-app MCP</span>
        </div>
        <div className="flex-1 space-y-2.5 overflow-hidden p-4 font-mono text-[12.5px] leading-relaxed">
          <AnimatePresence initial={false}>
            {lines.map((l, i) => (
              <motion.div key={i + l.text} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                {l.kind === "user" && <div><span className="text-accent-2">you ›</span> {l.text}</div>}
                {l.kind === "tool" && <div className="text-accent">⚙ {l.text}</div>}
                {l.kind === "out" && <pre className="whitespace-pre-wrap rounded-lg bg-bg-2 px-3 py-2 text-muted">{l.text}</pre>}
                {l.kind === "agent" && <div className="rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 font-sans text-[13.5px]">{l.text}</div>}
              </motion.div>
            ))}
          </AnimatePresence>
          {step < script.length && <span className="inline-block h-4 w-2 animate-pulse bg-accent align-middle" />}
        </div>
      </div>

      {/* phone */}
      <div className="mx-auto w-[220px] rounded-[2.2rem] border-[7px] border-[#0a0a10] bg-white p-4 pt-8 text-[#15151f] shadow-2xl shadow-black/30 dark:border-[#26263a]">
        <div className="mx-auto mb-6 h-1.5 w-16 rounded-full bg-[#e8e8f0]" />
        <div className="mx-auto mb-3 grid size-10 place-items-center rounded-xl bg-gradient-to-br from-[#6d5cff] to-[#e0479e] text-sm font-bold text-white">A</div>
        <p className="text-center text-[15px] font-extrabold">Welcome back</p>
        <p className="mb-4 text-center text-[10px] text-[#6b6b80]">Log in to continue</p>
        <Field label="Email" value={phone.email} active={phone.focus === "email"} />
        <Field label="Password" value={phone.password} placeholder="••••••••" active={phone.focus === "password"} />
        <AnimatePresence>
          {phone.error && (
            <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0 }} className="mb-2 text-[10px] font-semibold text-[#e5484d]">
              Please enter your password.
            </motion.p>
          )}
        </AnimatePresence>
        <div className="relative">
          <div className="rounded-lg bg-[#5b4ce6] py-2 text-center text-[12px] font-bold text-white">Log In</div>
          {phone.focus === "login" && (
            <motion.span className="absolute inset-0 rounded-lg border-2 border-[#e0479e]" initial={{ scale: 1, opacity: 1 }} animate={{ scale: 1.25, opacity: 0 }} transition={{ duration: 0.6, repeat: 1 }} />
          )}
        </div>
        <p className="mt-4 text-center text-[9px] text-[#6b6b80]">Don&apos;t have an account? <span className="font-semibold text-[#5b4ce6]">Register</span></p>
      </div>
    </div>
  );
}

function Field({ label, value, placeholder = "you@example.com", active }: { label: string; value: string; placeholder?: string; active: boolean }) {
  return (
    <div className="mb-2.5">
      <p className="mb-1 text-[9.5px] font-semibold text-[#4b4b60]">{label}</p>
      <div className={`rounded-md border px-2 py-1.5 text-[11px] transition-colors ${active ? "border-[#6d5cff] ring-2 ring-[#6d5cff]/25" : "border-[#e4e4ef]"} bg-[#f6f6fb]`}>
        {value || <span className="text-[#a0a0b5]">{placeholder}</span>}
      </div>
    </div>
  );
}
