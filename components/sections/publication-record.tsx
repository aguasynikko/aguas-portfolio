"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, Copy, ExternalLink, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { person } from "@/data/resume";
import type { Publication } from "@/data/types";
import { toAPA, toBibTeX } from "@/lib/citation";
import { cn, pad } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const EASE = [0.22, 1, 0.36, 1] as const;

function CopyCitation({ pub }: { pub: Publication }) {
  const [copied, setCopied] = useState<"apa" | "bibtex" | null>(null);

  async function copy(format: "apa" | "bibtex") {
    const text = format === "apa" ? toAPA(pub) : toBibTeX(pub);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(format);
      toast.success(
        format === "apa" ? "APA citation copied" : "BibTeX copied",
        { description: pub.title }
      );
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard access can be denied (insecure context, permissions policy).
      toast.error("Couldn't copy to clipboard", {
        description: "Your browser blocked clipboard access.",
      });
    }
  }

  return (
    <div className="flex items-center gap-4">
      {(["apa", "bibtex"] as const).map((format) => (
        <button
          key={format}
          type="button"
          onClick={() => copy(format)}
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-label text-muted transition-colors duration-300 hover:text-accent"
        >
          {copied === format ? (
            <Check aria-hidden className="size-3" />
          ) : (
            <Copy aria-hidden className="size-3" />
          )}
          {format === "apa" ? "Copy APA" : "Copy BibTeX"}
        </button>
      ))}
    </div>
  );
}

export function PublicationRecord({
  pub,
  index,
}: {
  pub: Publication;
  index: number;
}) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const panelId = `abstract-${pub.id}`;

  const links: { label: string; href: string; icon: typeof FileText }[] = [];
  if (pub.link) links.push({ label: "Read paper", href: pub.link, icon: ExternalLink });
  if (pub.pdfUrl) links.push({ label: "PDF", href: pub.pdfUrl, icon: FileText });
  if (pub.doi)
    links.push({
      label: `DOI ${pub.doi}`,
      href: `https://doi.org/${pub.doi}`,
      icon: ExternalLink,
    });

  return (
    <article className="group border-b border-line py-7 first:border-t md:py-8">
      <div className="grid gap-3 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-2">
          <p className="label">Record {pad(index + 1)}</p>
          <p
            aria-hidden
            className="mt-1.5 font-mono text-[11px] tracking-label text-muted/60"
          >
            {pub.year}
          </p>
        </div>

        <div className="md:col-span-10">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <Badge variant="outline">{pub.type}</Badge>
            <span className="font-mono text-[11px] uppercase tracking-label text-muted">
              {pub.venue}
            </span>
          </div>

          <h3 className="max-w-3xl text-lg leading-snug transition-colors duration-300 group-hover:text-accent sm:text-xl">
            {pub.title}
          </h3>

          {/* Author list — the site owner's name is emphasized. */}
          <p className="mt-2.5 text-sm leading-relaxed text-muted">
            {pub.authors.map((author, i) => (
              <span key={author}>
                {i > 0 && <span aria-hidden>, </span>}
                <span
                  className={cn(
                    author === person.name && "font-medium text-heading"
                  )}
                >
                  {author}
                </span>
              </span>
            ))}
          </p>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label text-muted transition-colors duration-300 hover:text-heading"
          >
            <ChevronDown
              aria-hidden
              className={cn(
                "size-3 transition-transform duration-500 ease-noir",
                open && "rotate-180"
              )}
            />
            {open ? "Hide abstract" : "Read abstract"}
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={panelId}
                key="panel"
                initial={reduced ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={reduced ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="max-w-3xl border-l border-line-strong pl-5 pt-4">
                  <p className="text-sm leading-relaxed text-body">{pub.abstract}</p>

                  {pub.highlights && pub.highlights.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {pub.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-sm text-muted">
                          <span
                            aria-hidden
                            className="mt-[0.55rem] h-px w-3 shrink-0 bg-line-strong"
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  {pub.tech && pub.tech.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {pub.tech.map((t) => (
                        <li key={t}>
                          <Badge>{t}</Badge>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4">
            {links.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-label text-muted transition-colors duration-300 hover:text-accent"
              >
                <Icon aria-hidden className="size-3" />
                {label}
              </a>
            ))}
            <CopyCitation pub={pub} />
          </div>
        </div>
      </div>
    </article>
  );
}
