import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getChapters, toFolder } from "@/lib/memoir";
import { MemoirFolder } from "@/components/memoir/memoir-folder";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";

/** Homepage cut: the newest Chapters only; the full Memoir lives at /memoir. */
const HOME_LIMIT = 3;

export async function MemoirSection() {
  const chapters = await getChapters();
  if (chapters.length === 0) return null;
  const shown = chapters.slice(0, HOME_LIMIT);

  return (
    <Section id="memoir">
      <SectionHeading
        id="memoir"
        index="07"
        eyebrow="Memoir"
        title="The memoir."
        lead="Conferences, trips and the moments in between: the experiences that don't fit on a CV."
        action={
          <Button asChild variant="ghost">
            <Link href="/memoir">
              Read the memoir
              <ArrowRight />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.08}>
            <MemoirFolder chapter={toFolder(c)} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
