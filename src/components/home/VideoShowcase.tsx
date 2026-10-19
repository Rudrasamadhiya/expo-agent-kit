"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const scenes = [
  { title: "Your prep at a glance", chip: ["130k+", "Questions"], bars: [0.62, 0.35, 0.8, 0.5], hue: "from-[#6d5cff] to-[#2a1f7a]" },
  { title: "Know where you stand", chip: ["26%", "Accuracy"], bars: [0.3, 0.75, 0.45, 0.9], hue: "from-[#e0479e] to-[#4a1440]" },
  { title: "The real exam interface", chip: ["3 hours", "real timer"], bars: [0.5, 0.5, 0.85, 0.4], hue: "from-[#12b5cb] to-[#0d3c52]" },
];

export function VideoShowcase() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % scenes.length), 3200);
    return () => clearInterval(t);
  }, [reduce]);
  const s = scenes[i];
  return (
    <div className="rounded-2xl border border-line bg-panel p-3 shadow-2xl shadow-black/20" aria-label="Animated preview of a generated launch video">
      <div className={`relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br ${s.hue} transition-[background] duration-700`}>
        <div className="grid-bg absolute inset-0 opacity-20" />
        <AnimatePresence mode="wait">
          <motion.div key={i} className="absolute inset-0 flex items-center gap-[6%] px-[7%]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <div className="flex-1 text-white">
              <motion.span className="mb-[3%] inline-block rounded-full border border-white/40 bg-white/15 px-2 py-0.5 text-[clamp(8px,1.1vw,12px)] font-bold" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 380, damping: 16 }}>
                0{i + 3}
              </motion.span>
              <h3 className="text-[clamp(14px,2.6vw,30px)] font-extrabold leading-tight">
                {s.title.split(" ").map((w, k) => (
                  <motion.span key={k} className="mr-[0.25em] inline-block" initial={{ y: 18, opacity: 0, filter: "blur(6px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} transition={{ delay: 0.15 + k * 0.08, duration: 0.45 }}>
                    {w}
                  </motion.span>
                ))}
              </h3>
              <motion.div className="mt-[3%] h-[4px] rounded-full bg-gradient-to-r from-white to-white/40" initial={{ width: 0 }} animate={{ width: "38%" }} transition={{ delay: 0.5, duration: 0.6 }} />
            </div>
            <motion.div className="relative w-[26%] rounded-[12%/6%] border-[3px] border-black/80 bg-white p-[3%] shadow-2xl" initial={{ y: 30, rotate: 3, opacity: 0 }} animate={{ y: 0, rotate: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 140, damping: 18 }}>
              <div className="mb-[8%] h-[6px] w-1/2 rounded bg-[#e4e4ef]" />
              <div className="flex h-[70px] items-end gap-[6%] sm:h-[110px]">
                {s.bars.map((b, k) => (
                  <motion.div key={k} className="flex-1 rounded-t bg-[#6d5cff]" initial={{ height: 0 }} animate={{ height: `${b * 100}%` }} transition={{ delay: 0.3 + k * 0.08, duration: 0.5 }} />
                ))}
              </div>
              <div className="mt-[10%] space-y-[6%]">
                <div className="h-[6px] rounded bg-[#e4e4ef]" /><div className="h-[6px] w-3/4 rounded bg-[#e4e4ef]" />
              </div>
              <motion.div className="absolute -right-[38%] top-[18%] rounded-xl bg-white px-[10%] py-[6%] text-[#15151f] shadow-xl" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.9, type: "spring", stiffness: 420, damping: 14 }}>
                <div className="text-[clamp(9px,1.3vw,15px)] font-extrabold leading-none">{s.chip[0]}</div>
                <div className="text-[clamp(7px,0.85vw,10px)] text-[#6b7280]">{s.chip[1]}</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* studio-style timeline */}
      <div className="relative mt-3 flex h-9 gap-1">
        {["Intro", "Dashboard", "Analytics", "Exam", "Outro"].map((n, k) => (
          <div key={n} className={`flex flex-1 items-center rounded-md border px-2 text-[10px] ${k === i + 1 ? "border-accent bg-accent/15 text-text" : "border-line bg-bg-2 text-muted"}`}>{n}</div>
        ))}
        <motion.div className="absolute -top-1 bottom-[-4px] w-0.5 bg-[#ff4d6d]" animate={{ left: `${((i + 1.5) / 5) * 100}%` }} transition={{ duration: 0.6 }} />
      </div>
    </div>
  );
}
