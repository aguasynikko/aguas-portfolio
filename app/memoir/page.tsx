import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { person } from "@/data/resume";
import { getChapters, toFolder } from "@/lib/memoir";
import { MemoirFolder } from "@/components/memoir/memoir-folder";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Memoir",
  description: `Conferences, trips and experiences of ${person.name} beyond the CV.`,
  alternates: { canonical: "/memoir" },
  openGraph: {
    title: `Memoir — ${person.name}`,
    description: "Conferences, trips and the moments in between.",
    url: "/memoir",
  },
};

export default async function MemoirPage() {
  const chapters = await getChapters();

  return (
    <main id="main" className="pb-12 pt-24 sm:pt-28">
      <div className="container">
        <Button asChild variant="ghost" size="sm" className="-ml-4 mb-8">
          <Link href="/">
            <ArrowLeft />
            Back to portfolio
          </Link>
        </Button>

        <header className="mb-10 max-w-2xl">
          <p className="label mb-3 flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-line-strong" />
            Memoir
          </p>
          <h1 className="text-gradient-heading pb-[0.08em] text-4xl leading-[1.1] tracking-tight sm:text-5xl">
            The memoir.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            {chapters.length} {chapters.length === 1 ? "chapter" : "chapters"},
            newest first. Conferences, trips and the moments in between, written
            up in my own words.
          </p>
        </header>

        <div className="grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {chapters.map((c) => (
            <MemoirFolder key={c.slug} chapter={toFolder(c)} />
          ))}
        </div>
      </div>
    </main>
  );
}
