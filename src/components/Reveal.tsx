"use client";
import { motion } from "motion/react";

/**
 * Layout wrapper. Content is visible by default; pass `animate` to fade it up the first
 * time it scrolls into view — reserved for the few moments that deserve motion.
 */
export function Reveal({ children, delay = 0, className = "", animate = false }: { children: React.ReactNode; delay?: number; className?: string; animate?: boolean }) {
  if (!animate) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 18, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}
