import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { experience, person, projects, publications } from "@/data/resume";
import {
  chapterLabel,
  formatFiled,
  getChapter,
  getChapters,
  type RelatedRecord,
} from "@/lib/memoir";
import { Button } from "@/components/ui/button";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const chapters = await getChapters();
  return chapters.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = await getChapter(slug);
  if (!found) return {};
  const { meta } = found;
  return {
    title: meta.title,
    description: meta.summary,
    alternates: { canonical: `/memoir/${slug}` },
    openGraph: {
      type: "article",
      title: `${meta.title} — ${person.name}`,
      description: meta.summary,
      url: `/memoir/${slug}`,
      images: [{ url: meta.cover, alt: meta.coverAlt }],
    },
  };
}

/** Resolves a Chapter's reference to a display title and a link on this site. */
function resolveRelated(
  related: RelatedRecord
): { kind: string; title: string; href: string } | null {
  if (related.kind === "publication") {
    const pub = publications.find((p) => p.id === related.id);
    return pub
      ? { kind: "Publication", title: pub.title, href: "/publications" }
      : null;
  }
  if (related.kind === "experience") {
    const exp = experience.find((e) => e.id === related.id);
    return exp
      ? {
          kind: "Experience",
          title: `${exp.role}, ${exp.company}`,
          href: "/#experience",
        }
      : null;
  }
  const project = projects.find((p) => p.slug === related.slug);
  return project
    ? { kind: "Project", title: project.title, href: "/#projects" }
    : null;
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line py-3">
      <dt className="label">{label}</dt>
      <dd className="mt-1 text-sm leading-relaxed text-body">{children}</dd>
    </div>
  );
}

export default async function CasePage({ params }: { params: Params }) {
  const { slug } = await params;
  const found = await getChapter(slug);
  if (!found) notFound();
  const { meta, content } = found;

  // getChapters() is newest first: the older Chapter is the next index.
  const chapters = await getChapters();
  const i = chapters.findIndex((c) => c.slug === slug);
  const previous = chapters[i + 1];
  const next = chapters[i - 1];
  const related = meta.related ? resolveRelated(meta.related) : null;

  return (
    <main id="main" className="pb-16 pt-24 sm:pt-28">
      <div className="container">
        <Button asChild variant="ghost" size="sm" className="-ml-4 mb-8">
          <Link href="/memoir">
            <ArrowLeft />
            Back to the memoir
          </Link>
        </Button>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <article className="lg:col-span-8">
            <header className="mb-10">
              <p className="label mb-3 flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-line-strong" />
                {chapterLabel(meta.number)}
              </p>
              <h1 className="text-gradient-heading pb-[0.08em] text-3xl leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
                {meta.title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                {meta.summary}
              </p>
            </header>

            <div className="max-w-[68ch]">{content}</div>
          </article>

          <aside className="lg:col-span-4">
            <dl className="lg:sticky lg:top-28">
              <MetaRow label="Chapter">{chapterLabel(meta.number)}</MetaRow>
              <MetaRow label="Filed">{formatFiled(meta.filed)}</MetaRow>
              <MetaRow label="Scene">{meta.scene}</MetaRow>
              {related && (
                <MetaRow label="Related">
                  <Link
                    href={related.href}
                    className="group inline-flex gap-2 transition-colors hover:text-accent"
                  >
                    <FileText aria-hidden className="mt-1 size-3.5 shrink-0 text-muted group-hover:text-accent" />
                    <span>
                      <span className="block font-mono text-[10px] uppercase tracking-label text-muted">
                        {related.kind}
                      </span>
                      {related.title}
                    </span>
                  </Link>
                </MetaRow>
              )}
              {meta.report && (
                <MetaRow label="Original post">
                  <a
                    href={meta.report}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                  >
                    View the original post
                    <ArrowUpRight aria-hidden className="size-3.5" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </MetaRow>
              )}
              <div className="border-t border-line" />
            </dl>
          </aside>
        </div>

        <nav
          aria-label="More chapters"
          className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={`/memoir/${previous.slug}`}
              className="card card-hover group p-5"
            >
              <p className="label flex items-center gap-2">
                <ArrowLeft aria-hidden className="size-3" />
                Previous chapter
              </p>
              <p className="mt-2 leading-snug transition-colors group-hover:text-accent">
                {previous.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/memoir/${next.slug}`}
              className="card card-hover group p-5 sm:text-right"
            >
              <p className="label flex items-center gap-2 sm:justify-end">
                Next chapter
                <ArrowRight aria-hidden className="size-3" />
              </p>
              <p className="mt-2 leading-snug transition-colors group-hover:text-accent">
                {next.title}
              </p>
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}
