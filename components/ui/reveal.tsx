import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealTag = "div" | "section" | "li" | "article" | "span";

/**
 * Fade-and-rise on scroll, driven entirely by CSS.
 *
 * This deliberately uses no JavaScript. The previous implementation relied on
 * Framer Motion's `whileInView`, which server-renders the element at
 * `opacity: 0` and only reveals it once React hydrates — so a hydration
 * failure (a browser extension mutating the DOM was enough) left most of the
 * page permanently blank.
 *
 * Now the animation is a scroll-driven CSS animation behind an `@supports`
 * guard. Browsers without `animation-timeline` simply render the content, and
 * a browser where JS never runs at all renders it too. The motion is an
 * enhancement; the content no longer depends on it.
 *
 * `delay` is kept for call-site compatibility and maps to an offset in the
 * scroll range rather than to seconds.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Retained for API compatibility; the CSS translate distance is fixed. */
  y?: number;
  as?: RevealTag;
}) {
  return (
    <Tag
      className={cn("reveal", className)}
      style={{ "--reveal-delay": delay } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/**
 * Staggered variant: each child is offset a little further along the scroll
 * range, so a grid resolves in sequence rather than all at once.
 */
export function RevealItem({
  children,
  className,
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <div
      className={cn("reveal", className)}
      style={{ "--reveal-delay": index * 0.04 } as CSSProperties}
    >
      {children}
    </div>
  );
}
