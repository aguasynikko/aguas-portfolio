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
import { Stagger, StaggerItem } from "@/components/ui/reveal";
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

function TechTile({ skill }: { skill: Skill }) {
  const Icon = getIcon(skill.icon);
  const detail = proficiency(skill);

  const tile = (
    <div
      className={
        "group flex aspect-square flex-col items-center justify-center gap-2 " +
        "border border-line bg-surface p-3 transition-all duration-500 ease-noir " +
        "hover:-translate-y-1 hover:border-line-strong hover:bg-surface-raised hover:shadow-lift"
      }
    >
      {Icon ? (
        <Icon
          aria-hidden
          className="size-7 text-body transition-colors duration-500 group-hover:text-accent sm:size-8"
        />
      ) : (
        // Monogram fallback for technologies with no Simple Icons mark.
        <span
          aria-hidden
          className="flex size-7 items-center justify-center border border-line-strong font-mono text-[11px] text-body transition-colors duration-500 group-hover:border-accent group-hover:text-accent sm:size-8 sm:text-xs"
        >
          {monogram(skill.name)}
        </span>
      )}
      <span className="text-center font-mono text-[9px] uppercase leading-tight tracking-label text-muted transition-colors duration-500 group-hover:text-heading sm:text-[10px]">
        {skill.name}
      </span>
    </div>
  );

  if (!detail) {
    return <div aria-label={skill.name}>{tile}</div>;
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
          {tile}
        </button>
      </TooltipTrigger>
      <TooltipContent>{detail}</TooltipContent>
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
        <div className="space-y-8">
          {grouped.map(({ category, items }, groupIndex) => (
            <div key={category}>
              <div className="mb-3 flex items-center gap-4">
                <p className="label shrink-0">{category}</p>
                <span aria-hidden className="h-px flex-1 bg-line" />
                <span
                  aria-hidden
                  className="font-mono text-[10px] tracking-label text-muted/50"
                >
                  {String(items.length).padStart(2, "0")}
                </span>
              </div>

              <Stagger
                className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10"
                stagger={0.035}
                delayChildren={groupIndex * 0.04}
              >
                {items.map((skill) => (
                  <StaggerItem key={`${category}-${skill.name}`}>
                    <TechTile skill={skill} />
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
      </TooltipProvider>
    </Section>
  );
}
