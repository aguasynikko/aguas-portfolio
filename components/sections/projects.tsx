"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { projects } from "@/data/resume";
import type { Project } from "@/data/types";
import { cn, pad } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Section, SectionHeading } from "@/components/ui/section";

const ALL = "All";
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Fallback thumbnail for projects without an image: a generated plate built
 * from the case number and initials. Keeps the grid uniform instead of leaving
 * holes, and costs nothing to render.
 */
function MonogramPlate({ project, index }: { project: Project; index: number }) {
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
      <span
        aria-hidden
        className="absolute bottom-4 left-4 font-mono text-[10px] tracking-label text-muted/70"
      >
        CASE {pad(index + 1)}
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
          <MonogramPlate project={project} index={index} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="mb-5 flex items-center justify-between">
          <p className="label">Case {pad(index + 1)}</p>
          {project.year && (
            <p className="font-mono text-[10px] tracking-label text-muted/70">
              {project.year}
            </p>
          )}
        </div>

        <h3 className="text-xl leading-snug transition-colors duration-300 group-hover:text-accent sm:text-2xl">
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

        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
          {project.blurb}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
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
          <div className="relative z-10 mt-7 flex items-center gap-5 border-t border-line pt-5">
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
  const [filter, setFilter] = useState<string>(ALL);

  // Only offer filters that would actually narrow the set.
  const filters = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) =>
      p.tech.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1))
    );
    const meaningful = [...counts.entries()]
      .filter(([, n]) => n > 1)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([t]) => t);
    return [ALL, ...meaningful];
  }, []);

  const visible = useMemo(() => {
    const ordered = [...projects].sort(
      (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
    );
    return filter === ALL
      ? ordered
      : ordered.filter((p) => p.tech.includes(filter));
  }, [filter]);

  return (
    <Section id="projects">
      <SectionHeading
        id="projects"
        index="03"
        eyebrow="Projects"
        title="Selected work."
        lead="Six builds spanning edge AI, medical imaging, analytics, and production web apps."
      />

      <div
        role="group"
        aria-label="Filter projects by technology"
        className="mask-fade-x -mx-6 mb-12 flex gap-2 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        {filters.map((tech) => {
          const isActive = filter === tech;
          return (
            <button
              key={tech}
              type="button"
              onClick={() => setFilter(tech)}
              aria-pressed={isActive}
              className={cn(
                "shrink-0 rounded-sm border px-3 py-1.5 font-mono text-[10px] uppercase tracking-label transition-all duration-300 ease-noir",
                isActive
                  ? "border-accent bg-accent text-base"
                  : "border-line bg-transparent text-muted hover:border-line-strong hover:text-heading"
              )}
            >
              {tech}
            </button>
          );
        })}
      </div>

      <motion.ul
        layout={!reduced}
        className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 xl:grid-cols-3"
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
              className="relative bg-base"
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
