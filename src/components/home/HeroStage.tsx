"use client";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { AgentDemo } from "./AgentDemo";

const chips = [
  { text: "app_tap → 84 ms", className: "left-[-2%] top-[14%] float-slow", dot: "bg-[#28c840]" },
  { text: "+ 1 new error caught", className: "right-[-3%] top-[6%] float-slower", dot: "bg-[#ff5f57]" },
  { text: "snapshot · 312 tokens", className: "left-[6%] bottom-[-5%] float-slower", dot: "bg-accent" },
  { text: "🎬 launch video ready", className: "right-[2%] bottom-[-4%] float-slow", dot: "bg-accent-2" },
];

/** The live agent demo on a softly tilting 3D stage with floating status chips. */
export function HeroStage() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });

  return (
    <div
      className="relative mx-auto mt-16 max-w-5xl text-left [perspective:1400px]"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => { mx.set(0); my.set(0); }}
    >
      <div className="pointer-events-none absolute inset-x-10 -bottom-10 top-10 rounded-[3rem] bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-2xl" />
      <motion.div
        style={{ rotateX: rx, rotateY: ry }}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative rounded-[1.75rem] border border-line bg-bg-2/70 p-3 shadow-2xl shadow-black/20 backdrop-blur sm:p-5"
      >
        <AgentDemo />
      </motion.div>
      {chips.map((c, i) => (
        <motion.div
          key={c.text}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + i * 0.25, type: "spring", stiffness: 260, damping: 18 }}
          className={`absolute hidden items-center gap-2 rounded-full border border-line bg-panel/90 px-3.5 py-2 text-xs font-medium shadow-lg backdrop-blur md:flex ${c.className}`}
        >
          <span className={`size-2 rounded-full ${c.dot}`} />{c.text}
        </motion.div>
      ))}
    </div>
  );
}
