"use client";

import { ArrowDown, ArrowRight, Download, Mail } from "lucide-react";
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
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 sm:pt-32"
      aria-labelledby="hero-heading"
    >
      {/* Spotlight — light cutting through darkness. */}
      <div aria-hidden className="spotlight pointer-events-none absolute inset-0" />

      <div className="container relative">
        <div className="max-w-4xl">
          <Line delay={0.1}>
            <p className="label flex items-center gap-3">
              <span
                aria-hidden
                className="inline-block size-1.5 rounded-full bg-brass"
              />
              {person.availability}
            </p>
          </Line>

          <Line delay={0.25} className="mt-8">
            <h1
              id="hero-heading"
              className="text-gradient-heading text-[clamp(2.75rem,8vw,6.5rem)] font-normal leading-[0.95] tracking-tight"
            >
              {/* The stable string for crawlers and screen readers. */}
              <span className="sr-only">
                {person.name} — {person.titles.slice(0, -1).join(", ")}, and{" "}
                {person.titles[person.titles.length - 1]}.
              </span>
              <span aria-hidden className="block">
                {person.name.split(" ").slice(0, 2).join(" ")}
              </span>
              <span aria-hidden className="block">
                {person.name.split(" ").slice(2).join(" ")}
              </span>
            </h1>
          </Line>

          <Line delay={0.45} className="mt-8">
            <div className="flex items-center gap-4">
              <span aria-hidden className="h-px w-10 shrink-0 bg-line-strong sm:w-16" />
              <RotatingTitle
                titles={person.titles}
                className="font-serif text-[clamp(1.25rem,3.5vw,2.25rem)] italic leading-tight text-body"
              />
            </div>
          </Line>

          <Line delay={0.6} className="mt-8">
            <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {person.tagline}
            </p>
          </Line>

          <Line delay={0.75} className="mt-12">
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <Button asChild variant="solid" size="lg">
                  <a href="#projects">
                    View projects
                    <ArrowRight />
                  </a>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild variant="outline" size="lg">
                  <a href={person.resumeUrl} download>
                    Résumé
                    <Download />
                  </a>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild variant="ghost" size="lg">
                  <a href="#contact">
                    Contact
                    <Mail />
                  </a>
                </Button>
              </Magnetic>
            </div>
          </Line>
        </div>

        {/* Metric strip — the 30-second scan. */}
        <Line delay={0.95} className="mt-20 sm:mt-24">
          <dl className="grid grid-cols-2 gap-px overflow-hidden border border-line bg-line lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-base px-5 py-6 sm:px-6 sm:py-7">
                <dt className="label mb-2 leading-relaxed">{stat.label}</dt>
                <dd className="font-serif text-2xl text-heading sm:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Line>
      </div>

      <div
        aria-hidden
        className="line-rise absolute inset-x-0 bottom-8 hidden justify-center lg:flex"
        style={{ "--line-delay": "1.6s" } as React.CSSProperties}
      >
        <ArrowDown className="size-4 animate-bounce text-muted/50" />
      </div>
    </section>
  );
}
