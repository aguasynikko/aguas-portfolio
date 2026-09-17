import { experience } from "@/data/resume";
import { pad } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";

export function Experience() {
  // Newest first, by ISO sort key rather than display string.
  const entries = [...experience].sort((a, b) =>
    b.sortKey.localeCompare(a.sortKey)
  );

  return (
    <Section id="experience">
      <SectionHeading
        id="experience"
        index="02"
        eyebrow="Experience"
        title="The case file."
        lead="Where I've shipped production software."
      />

      <ol className="relative">
        {/* The spine. Decorative: the list itself conveys the sequence. */}
        <div
          aria-hidden
          className="absolute left-0 top-2 hidden h-full w-px bg-line md:block"
        />

        {entries.map((entry, i) => (
          <Reveal as="li" key={entry.id} delay={i * 0.08} className="group relative">
            <article className="md:pl-12">
              {/* Timeline marker */}
              <span
                aria-hidden
                className="absolute left-0 top-2 hidden size-[7px] -translate-x-[3px] rounded-full border border-line-strong bg-base transition-colors duration-500 group-hover:border-accent group-hover:bg-accent md:block"
              />

              <div className="border-b border-line py-7 first:pt-0 md:py-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <p className="label flex items-center gap-3">
                    <span aria-hidden className="text-muted/60">
                      {pad(i + 1)}
                    </span>
                    {entry.kind === "research" ? "Research" : "Employment"}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-label text-muted">
                    <time>{entry.start}</time>
                    <span aria-hidden className="mx-2">
                      —
                    </span>
                    <time>{entry.end}</time>
                  </p>
                </div>

                <h3 className="mt-3 text-xl leading-tight sm:text-2xl">
                  {entry.role}
                </h3>
                <p className="mt-1.5 text-sm text-muted">
                  {entry.company}
                  {entry.location && (
                    <>
                      <span aria-hidden className="mx-2 text-line-strong">
                        ·
                      </span>
                      {entry.location}
                    </>
                  )}
                </p>

                {entry.summary && (
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-body sm:text-base">
                    {entry.summary}
                  </p>
                )}

                <ul className="mt-5 space-y-3.5">
                  {entry.achievements.map((achievement, j) => (
                    <li key={j} className="max-w-3xl">
                      <div className="flex gap-4">
                        <span
                          aria-hidden
                          className="mt-[0.6rem] h-px w-4 shrink-0 bg-line-strong"
                        />
                        <div>
                          <p className="text-sm leading-relaxed text-muted">
                            {achievement.text}
                          </p>
                          {achievement.tech && achievement.tech.length > 0 && (
                            <ul className="mt-2 flex flex-wrap gap-1.5">
                              {achievement.tech.map((t) => (
                                <li key={t}>
                                  <Badge>{t}</Badge>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
