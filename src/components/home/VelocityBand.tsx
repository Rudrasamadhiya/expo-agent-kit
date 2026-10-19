"use client";
import { Fragment } from "react";
import ScrollVelocity from "@/components/reactbits/ScrollVelocity";
import { Sparkle } from "./Icons";

const rows = [
  ["Snapshot", "Tap", "Type", "Scroll", "Screenshot", "Logs"],
  ["Record", "Direct", "Pop out", "Sound", "Export MP4"],
];

const line = (words: string[]) => (
  <span className="inline-flex items-center gap-[0.35em]">
    {words.map((w, i) => (
      <Fragment key={w}>
        {i > 0 && <Sparkle className="size-[0.42em] shrink-0" />}
        <span>{w}</span>
      </Fragment>
    ))}
    <Sparkle className="size-[0.42em] shrink-0" />
  </span>
);

/** A solid color band of oversized type that speeds up with your scroll (React Bits ScrollVelocity). */
export function VelocityBand() {
  return (
    <section aria-label="What your agent can do" className="overflow-hidden bg-[var(--shape-1)] py-10 text-[var(--on-shape-1)] sm:py-14">
      <p className="sr-only">Snapshot, tap, type, scroll, screenshot and read logs — then record, direct, pop out, add sound and export an MP4.</p>
      <div aria-hidden>
        <ScrollVelocity
          texts={rows.map(line)}
          velocity={40}
          numCopies={4}
          outlineAlternate
          gap={24}
          scrollerClassName="display !text-5xl sm:!text-7xl lg:!text-[6rem] !leading-[1.05] !drop-shadow-none"
          parallaxClassName="py-1"
        />
      </div>
    </section>
  );
}
