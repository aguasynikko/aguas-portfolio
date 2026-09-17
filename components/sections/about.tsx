import Image from "next/image";
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

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <figure className="group relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-line bg-surface">
              <Image
                src={person.photo}
                alt={person.photoAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority={false}
                className="media-noir object-cover object-top"
              />
              {/* Keeps the portrait seated in the dark rather than floating. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/60 via-transparent to-transparent"
              />
            </div>
            <figcaption className="label mt-4 flex items-center justify-between">
              <span>{person.location}</span>
              <span aria-hidden>—</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <div className="space-y-6">
              {person.bio.map((paragraph, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-lg leading-relaxed text-body sm:text-xl"
                      : "leading-relaxed text-muted"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 border-l border-line-strong pl-6">
              <p className="label mb-4">What I&apos;m looking for</p>
              <p className="leading-relaxed text-body">{person.lookingFor}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
