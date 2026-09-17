import { ExternalLink } from "lucide-react";
import { certifications, education } from "@/data/resume";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";

export function EducationSection() {
  // Preserve the authoring order of groups as they appear in the data file.
  const groups = certifications.reduce<Record<string, typeof certifications>>(
    (acc, cert) => {
      const key = cert.group ?? "Other";
      (acc[key] ??= []).push(cert);
      return acc;
    },
    {}
  );

  return (
    <Section id="education">
      <SectionHeading
        id="education"
        index="06"
        eyebrow="Education & Certifications"
        title="Credentials."
      />

      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="label mb-8">Degree</p>
          {education.map((edu) => (
            <Reveal key={edu.school}>
              <article className="border-l border-line-strong pl-6">
                <p className="font-mono text-[11px] uppercase tracking-label text-muted">
                  <time>{edu.start}</time>
                  <span aria-hidden className="mx-2">
                    —
                  </span>
                  <time>{edu.end}</time>
                </p>
                <h3 className="mt-4 text-2xl leading-snug">{edu.school}</h3>
                <p className="mt-3 leading-relaxed text-body">{edu.degree}</p>
                {edu.focus && (
                  <p className="mt-1 text-sm text-muted">{edu.focus}</p>
                )}
                {edu.location && <p className="label mt-4">{edu.location}</p>}
                {edu.notes && (
                  <ul className="mt-6 space-y-3">
                    {edu.notes.map((note) => (
                      <li key={note} className="flex gap-3 text-sm text-muted">
                        <span
                          aria-hidden
                          className="mt-[0.55rem] h-px w-3 shrink-0 bg-line-strong"
                        />
                        {note}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        <div className="lg:col-span-7">
          <p className="label mb-8">Certifications</p>
          <div className="space-y-10">
            {Object.entries(groups).map(([group, items], gi) => (
              <Reveal key={group} delay={gi * 0.06}>
                <div>
                  <div className="mb-4 flex items-center gap-5">
                    <p className="font-mono text-[10px] uppercase tracking-label text-muted/70">
                      {group}
                    </p>
                    <span aria-hidden className="h-px flex-1 bg-line" />
                  </div>
                  <ul>
                    {items.map((cert) => (
                      <li key={`${cert.name}-${cert.issuer}`}>
                        <div className="group flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                          <p className="text-body transition-colors duration-300 group-hover:text-heading">
                            {cert.credentialUrl ? (
                              <a
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 hover:text-accent"
                              >
                                {cert.name}
                                <ExternalLink aria-hidden className="size-3" />
                              </a>
                            ) : (
                              cert.name
                            )}
                          </p>
                          <p className="shrink-0 font-mono text-[10px] uppercase tracking-label text-muted">
                            {cert.issuer}
                            {cert.date && (
                              <>
                                <span aria-hidden className="mx-2 text-line-strong">
                                  ·
                                </span>
                                {cert.date}
                              </>
                            )}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
