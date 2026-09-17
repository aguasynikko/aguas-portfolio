import { ArrowUpRight, Download } from "lucide-react";
import { person } from "@/data/resume";
import { getIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <Section id="contact">
      <SectionHeading
        id="contact"
        index="07"
        eyebrow="Contact"
        title="Let's talk."
        lead={person.lookingFor}
      />

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="space-y-10">
            <div>
              <p className="label mb-5">Direct</p>
              <a
                href={`mailto:${person.email}`}
                className="group inline-flex items-baseline gap-2 font-serif text-xl text-heading transition-colors duration-300 hover:text-accent sm:text-2xl"
              >
                {person.email}
                <ArrowUpRight
                  aria-hidden
                  className="size-4 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </a>
              <p className="mt-4 text-sm text-muted">{person.location}</p>
            </div>

            <div>
              <p className="label mb-5">Profiles</p>
              <ul className="space-y-px overflow-hidden border border-line bg-line">
                {person.socials
                  .filter((s) => s.label !== "Email")
                  .map((social) => {
                    const Icon = getIcon(social.icon);
                    return (
                      <li key={social.label} className="bg-base">
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors duration-300 hover:bg-surface"
                        >
                          <span className="flex items-center gap-3">
                            {Icon && (
                              <Icon
                                aria-hidden
                                className="size-4 text-muted transition-colors duration-300 group-hover:text-accent"
                              />
                            )}
                            <span className="text-sm text-body transition-colors duration-300 group-hover:text-heading">
                              {social.label}
                            </span>
                          </span>
                          <span className="hidden font-mono text-[10px] tracking-label text-muted sm:inline">
                            {social.handle}
                          </span>
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>

            <div>
              <p className="label mb-5">Résumé</p>
              <Button asChild variant="outline">
                <a href={person.resumeUrl} download>
                  Download PDF
                  <Download />
                </a>
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="border border-line bg-surface p-7 sm:p-10">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
