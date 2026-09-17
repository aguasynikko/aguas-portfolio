import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { person, publications } from "@/data/resume";
import { publicationsJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/ui/json-ld";
import { Button } from "@/components/ui/button";
import { PublicationsIndex } from "./publications-index";

export const metadata: Metadata = {
  title: "Publications",
  description: `Peer-reviewed research by ${person.name} in medical imaging and clinical natural language processing.`,
  alternates: { canonical: "/publications" },
  openGraph: {
    title: `Publications — ${person.name}`,
    description: `Peer-reviewed research by ${person.name}.`,
    url: "/publications",
  },
};

export default function PublicationsPage() {
  return (
    <main id="main" className="pb-24 pt-32 sm:pt-40">
      <div className="container">
        <Button asChild variant="ghost" size="sm" className="-ml-4 mb-12">
          <Link href="/">
            <ArrowLeft />
            Back to portfolio
          </Link>
        </Button>

        <header className="mb-16 max-w-2xl">
          <p className="label mb-5 flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-line-strong" />
            Archive
          </p>
          <h1 className="text-gradient-heading text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Publications.
          </h1>
          <p className="mt-6 leading-relaxed text-muted">
            {publications.length} peer-reviewed{" "}
            {publications.length === 1 ? "record" : "records"} in medical imaging
            and clinical natural language processing. Expand any entry for its
            abstract, or copy a formatted citation.
          </p>
        </header>

        {/* Client island — the page itself stays a server component. */}
        <PublicationsIndex />
      </div>
      <JsonLd data={publicationsJsonLd()} />
    </main>
  );
}
