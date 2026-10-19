"use client";
import { useRef } from "react";
import VariableProximity from "@/components/reactbits/VariableProximity";

/**
 * The hero's one authored motion moment: letters near the pointer swell in weight and width
 * (Mona Sans's variable axes) and take on the accent color. Static for touch and reduced motion.
 */
export function HeroHeadline() {
  const ref = useRef<HTMLHeadingElement>(null);
  return (
    <h1 ref={ref} className="display text-[2.6rem] sm:text-7xl lg:text-[5.6rem]">
      <VariableProximity
        label="Give your AI agent your phone app."
        containerRef={ref}
        fromFontVariationSettings="'wght' 640, 'wdth' 112"
        toFontVariationSettings="'wght' 900, 'wdth' 125"
        fromColor="var(--text)"
        toColor="var(--accent)"
        radius={130}
        falloff="gaussian"
      />
    </h1>
  );
}
