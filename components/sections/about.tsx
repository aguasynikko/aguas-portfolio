import { person } from "@/data/resume";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        id="about"
        index="01"
        eyebrow="About"
        title="Research that ships."
      />

      {/* The portrait lives in the hero now, so this is text-only: bio on the
          left, the "looking for" callout pinned beside it on wide screens. */}
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-7">
          <div className="space-y-4">
            {person.bio.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "leading-relaxed text-body sm:text-lg"
                    : "text-sm leading-relaxed text-muted sm:text-base"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="border-l border-line-strong pl-5">
            <p className="label mb-3">What I&apos;m looking for</p>
            <p className="text-sm leading-relaxed text-body sm:text-base">
              {person.lookingFor}
            </p>
          </div>
          <dl className="mt-8 space-y-px overflow-hidden border border-line bg-line">
            {[
              { k: "Based in", v: person.location },
              { k: "Status", v: person.availability },
            ].map((row) => (
              <div
                key={row.k}
                className="flex items-baseline justify-between gap-4 bg-base px-4 py-3"
              >
                <dt className="label shrink-0">{row.k}</dt>
                <dd className="text-right text-sm text-body">{row.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
