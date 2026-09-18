"use client";

import { useMemo, useState } from "react";
import { publications } from "@/data/resume";
import type { PublicationType } from "@/data/types";
import { cn } from "@/lib/utils";
import { PublicationRecord } from "@/components/sections/publication-record";
import { Reveal } from "@/components/ui/reveal";

const ALL = "All";

export function PublicationsIndex() {
  const [filter, setFilter] = useState<PublicationType | typeof ALL>(ALL);

  const sorted = useMemo(
    () => [...publications].sort((a, b) => b.year - a.year),
    []
  );

  // Only show a type chip if something actually carries that type.
  const types = useMemo(() => {
    const present = new Set(sorted.map((p) => p.type));
    return [ALL, ...[...present].sort()] as (PublicationType | typeof ALL)[];
  }, [sorted]);

  const visible =
    filter === ALL ? sorted : sorted.filter((p) => p.type === filter);

  return (
    <>
      {types.length > 2 && (
        <div
          role="group"
          aria-label="Filter publications by type"
          className="mb-6 flex flex-wrap gap-2"
        >
          {types.map((type) => {
            const isActive = filter === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setFilter(type)}
                aria-pressed={isActive}
                className={cn(
                  "rounded-sm border px-3 py-1.5 font-mono text-[10px] uppercase tracking-label transition-all duration-300 ease-noir",
                  isActive
                    ? "border-accent bg-accent text-canvas"
                    : "border-line text-muted hover:border-line-strong hover:text-heading"
                )}
              >
                {type}
              </button>
            );
          })}
        </div>
      )}

      <div>
        {visible.map((pub, i) => (
          <Reveal key={pub.id} delay={i * 0.06}>
            <PublicationRecord pub={pub} index={i} />
          </Reveal>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-sm text-muted">
          No publications of that type.
        </p>
      )}
    </>
  );
}
