"use client";
import { motion } from "motion/react";
import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

const managers = [
  { id: "expo", label: "Expo", cmd: "npx expo install expo-mcp-bridge react-native-view-shot" },
  { id: "npm", label: "npm", cmd: "npm install expo-mcp-bridge react-native-view-shot" },
  { id: "pnpm", label: "pnpm", cmd: "pnpm add expo-mcp-bridge react-native-view-shot" },
  { id: "yarn", label: "yarn", cmd: "yarn add expo-mcp-bridge react-native-view-shot" },
  { id: "bun", label: "bun", cmd: "bun add expo-mcp-bridge react-native-view-shot" },
];

/** Package-manager picker with a copyable install line, in the style of the Node.js download box. */
export function InstallSwitcher() {
  const [active, setActive] = useState(managers[0]);
  return (
    <div className="glow-border mx-auto w-full max-w-2xl rounded-2xl border border-line bg-panel/80 text-left shadow-xl shadow-black/5 backdrop-blur">
      <div role="tablist" aria-label="Package manager" className="flex gap-1 overflow-x-auto border-b border-line px-2 pt-2">
        {managers.map((m) => (
          <button key={m.id} role="tab" aria-selected={m.id === active.id} onClick={() => setActive(m)}
            className={`relative rounded-t-lg px-3.5 py-2 text-sm font-medium transition-colors ${m.id === active.id ? "text-text" : "text-muted hover:text-text"}`}>
            {m.label}
            {m.id === active.id && <motion.span layoutId="pm-underline" className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent" />}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 px-4 py-3.5 font-mono text-[13.5px]" role="tabpanel">
        <span className="select-none text-accent-ink">$</span>
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap">{active.cmd}</code>
        <CopyButton text={active.cmd} />
      </div>
      <div className="flex items-center gap-3 border-t border-dashed border-line px-4 py-3 font-mono text-[13.5px]">
        <span className="select-none text-accent-ink">$</span>
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap">npx expo-mcp-bridge init</code>
        <CopyButton text="npx expo-mcp-bridge init" />
      </div>
    </div>
  );
}
