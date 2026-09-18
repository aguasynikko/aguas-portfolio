"use client";

import { useMemo } from "react";
import { skills } from "@/data/resume";
import type { Skill, SkillCategory } from "@/data/types";
import { getIcon, monogram } from "@/lib/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";

const CATEGORY_ORDER: SkillCategory[] = [
  "Languages",
  "AI & ML",
  "Frontend",
  "Backend & Data",
  "Cloud & DevOps",
  "Tools",
];

function proficiency(skill: Skill): string | null {
  if (skill.level && skill.years) return `${skill.level} · ${skill.years} yrs`;
  if (skill.level) return skill.level;
  if (skill.years) return `${skill.years} yrs`;
  return null;
}

/** One row within a category column: logo at left, name beside it. */
function TechRow({ skill }: { skill: Skill }) {
  const Icon = getIcon(skill.icon);
  const detail = proficiency(skill);

  const row = (
    <div className="group flex w-full items-center gap-3 border border-line bg-surface px-3 py-2.5 transition-all duration-500 ease-noir hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-raised hover:shadow-lift">
      {Icon ? (
        <Icon
          aria-hidden
          className="size-4 shrink-0 text-body transition-colors duration-500 group-hover:text-accent"
        />
      ) : (
        // Monogram fallback for technologies with no Simple Icons mark.
        <span
          aria-hidden
          className="flex size-4 shrink-0 items-center justify-center border border-line-strong font-mono text-[8px] text-body transition-colors duration-500 group-hover:border-accent group-hover:text-accent"
        >
          {monogram(skill.name)}
        </span>
      )}
      <span className="truncate font-mono text-[10px] uppercase tracking-label text-muted transition-colors duration-500 group-hover:text-heading">
        {skill.name}
      </span>
    </div>
  );

  if (!detail) {
    return <div aria-label={skill.name}>{row}</div>;
  }

  return (
    <Tooltip>
      {/* A button, not a div: the tooltip must be reachable by keyboard. */}
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={`${skill.name} — ${detail}`}
          className="w-full cursor-default text-left"
        >
          {row}
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">{detail}</TooltipContent>
    </Tooltip>
  );
}

export function Skills() {
  const grouped = useMemo(() => {
    const map = new Map<SkillCategory, Skill[]>();
    skills.forEach((s) => {
      const list = map.get(s.category) ?? [];
      list.push(s);
      map.set(s.category, list);
    });
    return CATEGORY_ORDER.filter((c) => map.has(c)).map((c) => ({
      category: c,
      items: map.get(c)!,
    }));
  }, []);

  return (
    <Section id="skills">
      <SectionHeading
        id="skills"
        index="04"
        eyebrow="Stack"
        title="The inventory."
        lead="Tools I reach for, grouped by where they sit in the build."
      />

      <TooltipProvider delayDuration={120} skipDelayDuration={300}>
        {/* Each category is a column. They stack on mobile, then sit side by
            side from `sm` up — six columns at the widest breakpoint. */}
        <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {grouped.map(({ category, items }, groupIndex) => (
            <div key={category}>
              <div className="mb-3 flex items-baseline gap-3 border-b border-line pb-2">
                <p className="label shrink-0">{category}</p>
                <span
                  aria-hidden
                  className="ml-auto font-mono text-[10px] tracking-label text-muted/50"
                >
                  {String(items.length).padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                {items.map((skill, i) => (
                  <RevealItem
                    key={`${category}-${skill.name}`}
                    index={groupIndex + i}
                  >
                    <TechRow skill={skill} />
                  </RevealItem>
                ))}
              </div>
            </div>
          ))}
        </div>
      </TooltipProvider>
    </Section>
  );
}
