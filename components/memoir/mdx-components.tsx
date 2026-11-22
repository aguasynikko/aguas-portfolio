import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

/**
 * A captioned photo inside a Chapter. Letters are written explicitly in the MDX
 * (`letter="A"`) so moving an Exhibit never silently relabels the others.
 */
function Exhibit({
  src,
  alt,
  letter,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  letter: string;
  caption: string;
  width: number;
  height: number;
}) {
  return (
    // w-fit keeps portrait photos from stretching to the column width; the
    // height cap stops them from filling more than one screen.
    <figure className="group mx-auto my-10 w-fit max-w-full">
      <div className="overflow-hidden border border-line bg-surface">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, 720px"
          className="media-noir h-auto max-h-[70vh] w-auto max-w-full"
        />
      </div>
      {/* w-0 min-w-full: the caption wraps to the photo's width instead of
          widening the figure past it. */}
      <figcaption className="mt-3 flex w-0 min-w-full gap-3 text-sm leading-relaxed text-muted">
        <span className="label shrink-0 pt-0.5 text-heading">
          Exhibit {letter}
        </span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

export const memoirMdxComponents = {
  Exhibit,
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-6 text-base leading-[1.85] text-body first:mt-0 sm:text-[17px]" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-12 text-2xl leading-tight tracking-tight text-heading" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mt-6 space-y-3" {...props} />
  ),
  li: ({ children, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li className="flex gap-3 text-base leading-[1.75] text-body" {...props}>
      <span aria-hidden className="mt-[0.85rem] h-px w-3 shrink-0 bg-line-strong" />
      <span>{children}</span>
    </li>
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-medium text-heading" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="text-heading underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
      {...props}
    />
  ),
};
