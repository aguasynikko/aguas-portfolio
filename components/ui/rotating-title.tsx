"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** The first title holds longer — it's the frame most visitors actually see. */
const ANCHOR_HOLD_MS = 4200;
const HOLD_MS = 3000;

/**
 * Masked vertical slide between role titles.
 *
 * Three things make this behave rather than look like a novelty widget:
 *
 *  1. LAYOUT — every title is rendered invisibly in the same grid cell, so the
 *     box permanently reserves the widest one. Nothing below it ever shifts,
 *     which keeps Cumulative Layout Shift at zero.
 *  2. ACCESSIBILITY — the animated text is aria-hidden. The real, stable
 *     content lives in a visually-hidden span supplied by the parent heading,
 *     so screen readers and crawlers see one unchanging string.
 *  3. REDUCED MOTION — no cycling at all; the titles render as a static
 *     hairline-separated list, which reads as deliberate rather than broken.
 */
export function RotatingTitle({
  titles,
  className,
}: {
  titles: string[];
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || titles.length < 2) return;
    const hold = index === 0 ? ANCHOR_HOLD_MS : HOLD_MS;
    const timer = setTimeout(
      () => setIndex((i) => (i + 1) % titles.length),
      hold
    );
    return () => clearTimeout(timer);
  }, [index, reduced, titles.length]);

  if (reduced) {
    return (
      <span aria-hidden className={cn("inline-flex flex-wrap items-baseline", className)}>
        {titles.map((t, i) => (
          <span key={t} className="inline-flex items-baseline">
            {i > 0 && <span className="mx-3 text-muted">·</span>}
            {t}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span
      aria-hidden
      // grid + overlapping cells: the tallest/widest ghost sets the box size
      className={cn("grid overflow-hidden", className)}
    >
      {/* Invisible sizing ghosts — reserve space for the longest title. */}
      {titles.map((t) => (
        <span
          key={`ghost-${t}`}
          className="invisible col-start-1 row-start-1 whitespace-nowrap"
        >
          {t}
        </span>
      ))}

      <span className="col-start-1 row-start-1 flex items-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={titles[index]}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="whitespace-nowrap"
          >
            {titles[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
