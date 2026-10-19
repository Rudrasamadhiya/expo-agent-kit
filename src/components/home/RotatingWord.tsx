"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/** Cycles through words in place, each sliding up out of a soft blur. */
export function RotatingWord({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [reduce, words.length, interval]);

  return (
    <span className="relative inline-grid justify-items-start align-bottom">
      {/* reserve the widest word so the line never reflows */}
      {words.map((w) => (
        <span key={w} className="invisible col-start-1 row-start-1" aria-hidden>{w}</span>
      ))}
      <span className="sr-only">{words.join(", ")}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          aria-hidden
          className="gradient-text-animated col-start-1 row-start-1"
          initial={{ y: "0.6em", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-0.6em", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
