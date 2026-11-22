"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { useState, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

/** How long the cover takes to swing open before the Chapter loads. */
const OPEN_MS = 420;

export interface FolderChapter {
  slug: string;
  title: string;
  summary: string;
  label: string;
  filed: string;
  scene: string;
}

/**
 * A Memoir Chapter drawn as a file folder: a tab carrying the chapter number,
 * a sheet tucked inside, and a front cover. Hover tips the cover forward and
 * lifts the sheet; a click swings the cover open, then opens the Chapter.
 *
 * It stays a real link, so middle-click, cmd/ctrl-click and keyboard
 * navigation behave normally. Only a plain left click waits for the animation.
 */
export function MemoirFolder({ chapter }: { chapter: FolderChapter }) {
  const router = useRouter();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const href = `/memoir/${chapter.slug}`;

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    if (reduced || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    if (open) return;
    setOpen(true);
    router.prefetch(href);
    window.setTimeout(() => router.push(href), OPEN_MS);
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      data-open={open || undefined}
      className="group block rounded-md outline-none [perspective:1200px] focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
    >
      <div className="relative pt-7">
        {/* Back of the folder, with its tab. */}
        <div
          aria-hidden
          className="absolute left-0 top-0 flex h-8 items-start rounded-t-md border border-b-0 border-line bg-surface-raised px-4 pt-2 transition-colors duration-500 group-hover:border-line-strong"
        >
          <span className="label whitespace-nowrap text-heading">
            {chapter.label}
          </span>
        </div>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 top-7 rounded-md rounded-tl-none border border-line bg-surface-raised transition-colors duration-500 group-hover:border-line-strong"
        />

        {/* The sheet inside: peeks out on hover, slides up on open. */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-x-5 bottom-8 top-9 rounded-sm border border-line-strong bg-canvas",
            "transition-transform duration-500 ease-noir",
            "group-hover:-translate-y-3 group-data-[open]:-translate-y-8"
          )}
        >
          <div className="space-y-2 p-4">
            <div className="h-px w-2/3 bg-line-strong" />
            <div className="h-px w-1/2 bg-line" />
            <div className="h-px w-3/5 bg-line" />
          </div>
        </div>

        {/* Front cover — hinged at the bottom edge. */}
        <div
          className={cn(
            "relative mt-5 flex min-h-[13rem] origin-bottom flex-col rounded-md border border-line bg-surface p-5",
            "transition-[transform,border-color,box-shadow] duration-500 ease-noir motion-reduce:transition-none",
            "group-hover:border-line-strong group-hover:shadow-lift group-hover:[transform:rotateX(-12deg)]",
            "group-data-[open]:[transform:rotateX(-62deg)]"
          )}
        >
          <p className="font-mono text-[10px] uppercase tracking-label text-muted/70">
            Filed {chapter.filed}
          </p>

          <h3 className="mt-3 text-lg leading-snug transition-colors duration-300 group-hover:text-accent">
            {chapter.title}
          </h3>

          <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
            {chapter.summary}
          </p>

          <div className="mt-4 flex items-center justify-between gap-4 border-t border-line pt-4">
            <p className="flex min-w-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-label text-muted">
              <MapPin aria-hidden className="size-3 shrink-0" />
              <span className="truncate">{chapter.scene}</span>
            </p>
            <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-label text-muted transition-colors group-hover:text-accent">
              Open
              <ArrowUpRight aria-hidden className="size-3" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
