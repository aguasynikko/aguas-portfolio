"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { projects } from "@/data/resume";
import type { Project, ProjectCategory } from "@/data/types";
import { cn, pad } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Section, SectionHeading } from "@/components/ui/section";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fixed, authored filter set — order is intentional, not data-derived. */
const CATEGORIES: ProjectCategory[] = [
  "Artificial Intelligence",
  "Data Science",
  "Software Development",
];

/** Exactly one category is always active — there is no "show everything" view. */
type Filter = ProjectCategory;

/**
 * Fallback thumbnail for projects without an image: a generated plate built
 * from the case number and initials. Keeps the grid uniform instead of leaving
 * holes, and costs nothing to render.
 */
function MonogramPlate({ project }: { project: Project }) {
  const initials = project.title
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-surface-raised">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(hsl(var(--line-strong))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--line-strong))_1px,transparent_1px)] [background-size:28px_28px]"
      />
      <span
        aria-hidden
        className="relative font-serif text-6xl text-heading/25 transition-colors duration-700 group-hover:text-heading/40 sm:text-7xl"
      >
        {initials}
      </span>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const primaryLink = project.demo ?? project.repo;

  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="media-noir object-cover"
          />
        ) : (
          <MonogramPlate project={project} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="label">Case {pad(index + 1)}</p>
          {project.year && (
            <p className="font-mono text-[10px] tracking-label text-muted/70">
              {project.year}
            </p>
          )}
        </div>

        <h3 className="text-lg leading-snug transition-colors duration-300 group-hover:text-accent">
          {primaryLink ? (
            <a
              href={primaryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="after:absolute after:inset-0 after:content-['']"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
          {project.blurb}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 5).map((t) => (
            <li key={t}>
              <Badge>{t}</Badge>
            </li>
          ))}
          {project.tech.length > 5 && (
            <li>
              <Badge variant="outline">+{project.tech.length - 5}</Badge>
            </li>
          )}
        </ul>

        {(project.demo || project.repo) && (
          <div className="relative z-10 mt-4 flex items-center gap-5 border-t border-line pt-4">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-label text-muted transition-colors hover:text-accent"
              >
                Live demo
                <ArrowUpRight aria-hidden className="size-3" />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-label text-muted transition-colors hover:text-accent"
              >
                <Github aria-hidden className="size-3" />
                Source
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export function Projects() {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("Artificial Intelligence");

  // Hide a category chip entirely if no project currently claims it.
  const filters = useMemo<ProjectCategory[]>(() => {
    const used = new Set(projects.flatMap((p) => p.categories));
    return CATEGORIES.filter((c) => used.has(c));
  }, []);

  const visible = useMemo(() => {
    const ordered = [...projects].sort(
      (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
    );
    return ordered.filter((p) => p.categories.includes(filter));
  }, [filter]);

  return (
    <Section id="projects">
      <SectionHeading
        id="projects"
        index="03"
        eyebrow="Projects"
        title="Selected work."
        lead="Builds spanning edge AI, medical imaging, analytics, and production web apps."
      />

      <div
        role="group"
        aria-label="Filter projects by discipline"
        className="mask-fade-x -mx-6 mb-6 flex gap-2 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:[mask-image:none]"
      >
        {filters.map((category) => {
          const isActive = filter === category;
          return (
            <button
              key={category}
              type="button"
              // Selecting only. Clicking the active chip is a no-op, so one
              // category is always in effect.
              onClick={() => setFilter(category)}
              aria-pressed={isActive}
              className={cn(
                "shrink-0 rounded-sm border px-3 py-1.5 font-mono text-[10px] uppercase tracking-label transition-all duration-300 ease-noir",
                "motion-reduce:transform-none",
                isActive
                  ? "scale-[1.06] border-accent bg-accent text-canvas shadow-lift"
                  : "scale-100 border-line bg-transparent text-muted hover:border-line-strong hover:text-heading"
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      <motion.ul
        layout={!reduced}
        // Real gaps rather than a bg-line parent with gap-px: the cards
        // already carry their own borders, and an incomplete final row
        // used to expose the parent background as a grey slab.
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, i) => (
            <motion.li
              key={project.slug}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative"
            >
              <ProjectCard project={project} index={i} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 && (
        <p className="py-16 text-center text-sm text-muted">
          No projects match that filter.
        </p>
      )}
    </Section>
  );
}
