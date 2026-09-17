"use client";

import { ArrowRight, Download, Mail } from "lucide-react";
import Image from "next/image";
import { person, stats } from "@/data/resume";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { RotatingTitle } from "@/components/ui/rotating-title";

/**
 * Line-by-line reveal, like a dossier being uncovered one entry at a time.
 *
 * CSS-driven on purpose. The hero contains the LCP element, and a Framer
 * Motion `initial` would serialize into the HTML as opacity:0 — leaving the
 * headline invisible until hydration completes, and permanently invisible if
 * JS fails. A keyframe animation starts painting on the very first frame.
 */
function Line({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <div
        className="line-rise"
        style={{ "--line-delay": `${delay}s` } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}

export function Hero() {
  const [firstLine, secondLine] = [
    person.name.split(" ").slice(0, 2).join(" "),
    person.name.split(" ").slice(2).join(" "),
  ];

  return (
    <section
      id="hero"
      className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32"
      aria-labelledby="hero-heading"
    >
      {/* Spotlight — light cutting through darkness. */}
      <div aria-hidden className="spotlight pointer-events-none absolute inset-0" />

      <div className="container relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ---------------------------------------------------- text */}
          <div className="lg:col-span-8">
            <Line delay={0.1}>
              <p className="label flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-block size-1.5 rounded-full bg-brass"
                />
                {person.kicker}
              </p>
            </Line>

            <Line delay={0.25} className="mt-5">
              <h1
                id="hero-heading"
                // pb-[0.08em] gives descenders (the g in "Aguas") room to
                // render: background-clip:text crops anything past the box.
                className="text-gradient-heading pb-[0.08em] text-[clamp(2.5rem,7vw,5rem)] font-normal leading-[1.04] tracking-tight"
              >
                {/* The stable string for crawlers and screen readers. */}
                <span className="sr-only">
                  {person.name} — {person.titles.slice(0, -1).join(", ")}, and{" "}
                  {person.titles[person.titles.length - 1]}.
                </span>
                <span aria-hidden className="block">
                  {firstLine}
                </span>
                <span aria-hidden className="block">
                  {secondLine}
                </span>
              </h1>
            </Line>

            <Line delay={0.45} className="mt-5">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="h-px w-10 shrink-0 bg-line-strong sm:w-14"
                />
                <RotatingTitle
                  titles={person.titles}
                  className="font-serif text-[clamp(1.125rem,2.8vw,1.75rem)] italic leading-tight text-body"
                />
              </div>
            </Line>

            <Line delay={0.6} className="mt-6">
              <p className="max-w-xl leading-relaxed text-muted">
                {person.tagline}
              </p>
            </Line>

            <Line delay={0.75} className="mt-8">
              <div className="flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Button asChild variant="solid">
                    <a href="#projects">
                      View projects
                      <ArrowRight />
                    </a>
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button asChild variant="outline">
                    <a href={person.resumeUrl} download>
                      Résumé
                      <Download />
                    </a>
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button asChild variant="ghost">
                    <a href="#contact">
                      Contact
                      <Mail />
                    </a>
                  </Button>
                </Magnetic>
              </div>
            </Line>
          </div>

          {/* --------------------------------------------------- portrait */}
          <Line delay={0.35} className="lg:col-span-4">
            <figure className="group relative mx-auto max-w-[260px] sm:max-w-[300px] lg:max-w-none">
              <div className="relative aspect-square overflow-hidden border border-line bg-surface">
                <Image
                  src={person.photo}
                  alt={person.photoAlt}
                  fill
                  sizes="(max-width: 1024px) 300px, 33vw"
                  // Above the fold — preload rather than lazy-load it.
                  priority
                  className="object-cover object-top transition-transform duration-700 ease-noir group-hover:scale-[1.03]"
                />
              </div>
              {/* Hairline corner marks — a quiet framing detail. */}
              <span
                aria-hidden
                className="absolute -left-1 -top-1 size-3 border-l border-t border-line-strong"
              />
              <span
                aria-hidden
                className="absolute -bottom-1 -right-1 size-3 border-b border-r border-line-strong"
              />
            </figure>
          </Line>
        </div>

        {/* Metric strip — the 30-second scan. */}
        <Line delay={0.95} className="mt-12 sm:mt-14">
          <dl className="grid grid-cols-2 gap-px overflow-hidden border border-line bg-line lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-base px-4 py-4 sm:px-5 sm:py-5">
                <dt className="label mb-1.5 leading-relaxed">{stat.label}</dt>
                <dd className="font-serif text-xl text-heading sm:text-2xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Line>
      </div>
    </section>
  );
}
