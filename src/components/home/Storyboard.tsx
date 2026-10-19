"use client";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/content/site";

const frames = [
  { src: "/images/frame-intro.svg", title: "Intro", desc: "Logo burst, kinetic title, light sweep." },
  { src: "/images/frame-popout.svg", title: "Pop-out", desc: "The tapped card lifts off the phone." },
  { src: "/images/frame-split.svg", title: "Side-by-side", desc: "A panel springs out next to the phone." },
  { src: "/images/frame-outro.svg", title: "Outro", desc: "Call to action with a pulsing button." },
];
const DURATION = 4000;

/** Frames from a generated launch video, played as a slideshow with a scrubbable filmstrip. */
export function Storyboard() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-100px" });
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const playing = inView && !paused && !reduce;

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setI((n) => (n + 1) % frames.length), DURATION);
    return () => clearTimeout(t);
  }, [i, playing]);

  return (
    <div ref={ref} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-[#0b0b12] shadow-2xl shadow-black/30">
        <AnimatePresence initial={false}>
          <motion.div key={i} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(frames[i].src)} alt={`Launch video frame: ${frames[i].title} — ${frames[i].desc}`} className={`size-full object-cover ${playing ? "kenburns" : ""}`} />
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/45 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
          <span className="size-1.5 animate-pulse rounded-full bg-[#ff4d6d]" /> 1080p · 16:9 · with sound
        </div>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2" role="tablist" aria-label="Video frames">
        {frames.map((f, k) => (
          <button key={f.src} role="tab" aria-selected={k === i} onClick={() => setI(k)}
            className={`group relative overflow-hidden rounded-lg border text-left transition-all ${k === i ? "border-accent ring-2 ring-accent/30" : "border-line opacity-70 hover:opacity-100"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(f.src)} alt="" className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 pb-1 pt-4 text-[10px] font-semibold text-white sm:text-xs">{f.title}</span>
            {k === i && (
              <motion.span key={`${i}-${playing}`} className="absolute inset-x-0 top-0 h-0.5 origin-left bg-accent"
                initial={{ scaleX: playing ? 0 : 1 }} animate={{ scaleX: 1 }} transition={{ duration: playing ? DURATION / 1000 : 0, ease: "linear" }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
