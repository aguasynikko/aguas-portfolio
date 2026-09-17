import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { publications } from "@/data/resume";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { PublicationRecord } from "./publication-record";

/** Homepage cut: newest first, capped — the full index lives at /publications. */
const HOME_LIMIT = 4;

export function Publications() {
  const sorted = [...publications].sort((a, b) => b.year - a.year);
  const shown = sorted.slice(0, HOME_LIMIT);
  const hasMore = sorted.length > HOME_LIMIT;

  return (
    <Section id="publications">
      <SectionHeading
        id="publications"
        index="05"
        eyebrow="Publications"
        title="The archive."
        lead="Peer-reviewed work in medical imaging and clinical natural language processing."
        action={
          <Button asChild variant="outline" size="sm">
            <Link href="/publications">
              Full index
              <ArrowRight />
            </Link>
          </Button>
        }
      />

      <div>
        {shown.map((pub, i) => (
          <Reveal key={pub.id} delay={i * 0.08}>
            <PublicationRecord pub={pub} index={i} />
          </Reveal>
        ))}
      </div>

      {hasMore && (
        <Reveal className="mt-8 text-center">
          <Button asChild variant="ghost">
            <Link href="/publications">
              View all {sorted.length} publications
              <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      )}
    </Section>
  );
}
