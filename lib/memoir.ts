import { promises as fs } from "node:fs";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import type { ReactElement } from "react";
import { memoirMdxComponents } from "@/components/memoir/mdx-components";
import { pad } from "@/lib/utils";

/**
 * Memoir loader. Each Chapter is one MDX file in `content/memoir/`; the file
 * name (minus `.mdx`) is its slug. See docs/adr/0001-chapters-as-mdx.md.
 */

const MEMOIR_DIR = path.join(process.cwd(), "content", "memoir");

/** Which existing record a Chapter is about. Ids match `data/resume.ts`. */
export type RelatedRecord =
  | { kind: "publication"; id: string }
  | { kind: "experience"; id: string }
  | { kind: "project"; slug: string };

export interface ChapterFrontmatter {
  title: string;
  /** One-sentence hook for folders and meta descriptions. */
  summary: string;
  /** ISO date (YYYY-MM-DD) the experience happened. Drives order and number. */
  filed: string;
  /** Where it happened. */
  scene: string;
  /** Path under /public. Used as the social-share image. */
  cover: string;
  coverAlt: string;
  /** URL of the original LinkedIn Post, shown as "Original post". */
  report?: string;
  related?: RelatedRecord;
}

export interface ChapterMeta extends ChapterFrontmatter {
  slug: string;
  /** 1-based, oldest first. Derived from `filed`, never stored. */
  number: number;
}

async function readSource(slug: string) {
  return fs.readFile(path.join(MEMOIR_DIR, `${slug}.mdx`), "utf8");
}

/** All Chapters, newest first, numbered oldest-first. */
export async function getChapters(): Promise<ChapterMeta[]> {
  let files: string[];
  try {
    files = await fs.readdir(MEMOIR_DIR);
  } catch {
    return [];
  }
  const slugs = files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.slice(0, -".mdx".length));

  const metas = await Promise.all(
    slugs.map(async (slug) => {
      const { frontmatter } = await compileMDX<ChapterFrontmatter>({
        source: await readSource(slug),
        options: { parseFrontmatter: true },
      });
      return { slug, ...frontmatter };
    })
  );

  return metas
    .sort((a, b) => a.filed.localeCompare(b.filed))
    .map((m, i) => ({ ...m, number: i + 1 }))
    .reverse();
}

export async function getChapter(
  slug: string
): Promise<{ meta: ChapterMeta; content: ReactElement } | null> {
  const chapters = await getChapters();
  const meta = chapters.find((c) => c.slug === slug);
  if (!meta) return null;

  const { content } = await compileMDX<ChapterFrontmatter>({
    source: await readSource(slug),
    options: { parseFrontmatter: true },
    components: memoirMdxComponents,
  });
  return { meta, content };
}

/** Publication id -> link to the Chapter about it, for the record's back-link. */
export type MemoirLinks = Record<string, { href: string; label: string }>;

export async function getPublicationMemoirLinks(): Promise<MemoirLinks> {
  const links: MemoirLinks = {};
  for (const c of await getChapters()) {
    if (c.related?.kind === "publication") {
      links[c.related.id] = { href: `/memoir/${c.slug}`, label: c.title };
    }
  }
  return links;
}

export function formatFiled(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function chapterLabel(n: number): string {
  return `Chapter ${pad(n)}`;
}

/** The plain fields the (client) folder needs, pre-formatted on the server. */
export function toFolder(c: ChapterMeta) {
  return {
    slug: c.slug,
    title: c.title,
    summary: c.summary,
    label: chapterLabel(c.number),
    filed: formatFiled(c.filed),
    scene: c.scene,
  };
}
