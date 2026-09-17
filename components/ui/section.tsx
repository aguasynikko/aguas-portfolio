import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/** Standard section shell: consistent rhythm, anchor target, top hairline. */
export function Section({
  id,
  children,
  className,
  divider = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  divider?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-24 sm:py-32", className)}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <div className="container">
        {divider && <div className="hairline mb-16 sm:mb-20" />}
        {children}
      </div>
    </section>
  );
}

/**
 * Section heading: a numbered monospace eyebrow above a large serif title,
 * with an optional lead paragraph. The number is decorative, so it is hidden
 * from assistive tech.
 */
export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  lead,
  action,
}: {
  id?: string;
  index?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  action?: ReactNode;
}) {
  return (
    <Reveal className="mb-14 sm:mb-20">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="label mb-5 flex items-center gap-3">
            {index && (
              <span aria-hidden className="text-muted/60">
                {index}
              </span>
            )}
            <span aria-hidden className="h-px w-8 bg-line-strong" />
            {eyebrow}
          </p>
          <h2
            id={id ? `${id}-heading` : undefined}
            className="text-gradient-heading text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {title}
          </h2>
          {lead && (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {lead}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </Reveal>
  );
}
