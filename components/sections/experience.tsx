"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { experience } from "@/data/resume";
import type { Experience as ExperienceEntry } from "@/data/types";
import { cn, pad } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * True only where hover is a real, reliable signal — a mouse or trackpad.
 * Touch screens emulate hover and leave it stuck on after a tap, so the
 * hover-to-expand behaviour is gated behind this and touch falls back to tap.
 */
function useHoverCapable(): boolean {
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCapable(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setCapable(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return capable;
}

function ExperienceRow({
  entry,
  index,
}: {
  entry: ExperienceEntry;
  index: number;
}) {
  const reduced = useReducedMotion();
  const hoverCapable = useHoverCapable();

  // Two independent sources of truth: hovering is transient, clicking sticks.
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const expanded = pinned || (hoverCapable && hovered);

  const panelId = `experience-panel-${entry.id}`;

  return (
    <article
      className="group/row md:pl-12"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Timeline marker */}
      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-6 hidden size-[7px] -translate-x-[3px] rounded-full border bg-canvas transition-colors duration-500 md:block",
          expanded ? "border-accent bg-accent" : "border-line-strong"
        )}
      />

      <div className="border-b border-line">
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => setPinned((v) => !v)}
          // Keyboard users get the same reveal as a mouse hover.
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          className="w-full py-5 text-left transition-colors duration-500 md:py-6"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="label flex items-center gap-3">
              <span aria-hidden className="text-muted/60">
                {pad(index + 1)}
              </span>
              {entry.kind === "research" ? "Research" : "Internship"}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-label text-muted">
              <time>{entry.start}</time>
              <span aria-hidden className="mx-2">
                —
              </span>
              <time>{entry.end}</time>
            </p>
          </div>

          <div className="mt-3 flex items-start justify-between gap-6">
            <div>
              <h3
                className={cn(
                  "text-xl leading-tight transition-colors duration-500 sm:text-2xl",
                  expanded && "text-accent"
                )}
              >
                {entry.role}
              </h3>
              <p className="mt-1.5 text-sm text-muted">
                {entry.company}
                {entry.location && (
                  <>
                    <span aria-hidden className="mx-2 text-line-strong">
                      ·
                    </span>
                    {entry.location}
                  </>
                )}
              </p>
            </div>

            <span className="flex shrink-0 items-center gap-2 pt-1 font-mono text-[10px] uppercase tracking-label text-muted transition-colors duration-500 group-hover/row:text-heading">
              <span className="hidden sm:inline">
                {expanded ? "Close" : "Details"}
              </span>
              <ChevronDown
                aria-hidden
                className={cn(
                  "size-3.5 transition-transform duration-500 ease-noir",
                  expanded && "rotate-180"
                )}
              />
            </span>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={panelId}
              key="panel"
              initial={reduced ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduced ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="pb-7 md:pb-8">
                {entry.summary && (
                  <p className="max-w-2xl text-sm leading-relaxed text-body sm:text-base">
                    {entry.summary}
                  </p>
                )}

                <ul className="mt-5 space-y-3.5">
                  {entry.achievements.map((achievement, j) => (
                    <li key={j} className="max-w-3xl">
                      <div className="flex gap-4">
                        <span
                          aria-hidden
                          className="mt-[0.6rem] h-px w-4 shrink-0 bg-line-strong"
                        />
                        <div>
                          <p className="text-sm leading-relaxed text-muted">
                            {achievement.text}
                          </p>
                          {achievement.tech && achievement.tech.length > 0 && (
                            <ul className="mt-2 flex flex-wrap gap-1.5">
                              {achievement.tech.map((t) => (
                                <li key={t}>
                                  <Badge>{t}</Badge>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}

export function Experience() {
  // Newest first, by ISO sort key rather than display string.
  const entries = [...experience].sort((a, b) =>
    b.sortKey.localeCompare(a.sortKey)
  );

  return (
    <Section id="experience">
      <SectionHeading
        id="experience"
        index="02"
        eyebrow="Experience"
        title="The case file."
        lead="Where I've shipped production software. Hover or tap a row to open it."
      />

      <ol className="relative">
        {/* The spine. Decorative: the list itself conveys the sequence. */}
        <div
          aria-hidden
          className="absolute left-0 top-2 hidden h-full w-px bg-line md:block"
        />

        {entries.map((entry, i) => (
          <Reveal as="li" key={entry.id} delay={i * 0.08} className="relative">
            <ExperienceRow entry={entry} index={i} />
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
