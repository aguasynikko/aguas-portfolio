import type { Publication } from "@/data/types";

/**
 * Formats an author name as APA does: "Ynikko Arzee Neo Aguas" → "Aguas, Y. A. N."
 * Falls back to the raw string for single-token names.
 */
function apaAuthor(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  const surname = parts[parts.length - 1];
  const initials = parts
    .slice(0, -1)
    .map((p) => `${p[0].toUpperCase()}.`)
    .join(" ");
  return `${surname}, ${initials}`;
}

function apaAuthorList(authors: string[]): string {
  const formatted = authors.map(apaAuthor);
  if (formatted.length === 1) return formatted[0];
  if (formatted.length === 2) return `${formatted[0]}, & ${formatted[1]}`;
  return `${formatted.slice(0, -1).join(", ")}, & ${formatted[formatted.length - 1]}`;
}

export function toAPA(pub: Publication): string {
  const authors = apaAuthorList(pub.authors);
  const venue = pub.venue ? `${pub.venue}.` : "";
  const pages = pub.pages ? ` ${pub.pages}.` : "";
  const locator = pub.doi
    ? ` https://doi.org/${pub.doi}`
    : pub.link
      ? ` ${pub.link}`
      : "";
  return `${authors} (${pub.year}). ${pub.title}. ${venue}${pages}${locator}`.replace(
    /\s+/g,
    " "
  );
}

/** Stable BibTeX key: surname + year + first title word, e.g. aguas2026multi. */
function bibKey(pub: Publication): string {
  const surname =
    pub.authors[0]?.trim().split(/\s+/).pop()?.toLowerCase() ?? "anon";
  const firstWord =
    pub.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .find((w) => w.length > 3) ?? "work";
  return `${surname}${pub.year}${firstWord}`;
}

export function toBibTeX(pub: Publication): string {
  const entryType =
    pub.type === "Journal"
      ? "article"
      : pub.type === "Conference"
        ? "inproceedings"
        : pub.type === "Thesis"
          ? "phdthesis"
          : "misc";

  const venueField =
    pub.type === "Journal"
      ? "journal"
      : pub.type === "Conference"
        ? "booktitle"
        : "howpublished";

  const fields: [string, string | undefined][] = [
    ["title", pub.title],
    ["author", pub.authors.join(" and ")],
    [venueField, pub.venue],
    ["year", String(pub.year)],
    ["publisher", pub.publisher],
    ["pages", pub.pages],
    ["doi", pub.doi],
    ["url", pub.link ?? pub.pdfUrl],
  ];

  const body = fields
    .filter((f): f is [string, string] => Boolean(f[1]))
    .map(([k, v]) => `  ${k} = {${v}}`)
    .join(",\n");

  return `@${entryType}{${bibKey(pub)},\n${body}\n}`;
}
