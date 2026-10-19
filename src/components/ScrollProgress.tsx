"use client";
import { motion, useScroll, useSpring } from "motion/react";

/** Thin gradient bar along the top edge showing how far down the page you are. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return (
    <motion.div aria-hidden style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-accent via-accent-2 to-accent-3" />
  );
}
