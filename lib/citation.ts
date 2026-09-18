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

/** APA renders page ranges with an en dash, not a hyphen. */
function apaPages(pages?: string): string {
  return pages ? pages.replace(/\s*-\s*/, "–") : "";
}

export function toAPA(pub: Publication): string {
  const authors = apaAuthorList(pub.authors);
  const locator = pub.doi
    ? ` https://doi.org/${pub.doi}`
    : pub.link
      ? ` ${pub.link}`
      : "";

  // Conference papers are cited as a chapter in proceedings: "In <venue>
  // (pp. x-y). <publisher>." Journals and everything else keep the simpler
  // "Venue, pages." shape.
  if (pub.type === "Conference" && pub.venue) {
    const pages = pub.pages ? ` (pp. ${apaPages(pub.pages)})` : "";
    const publisher = pub.publisher ? ` ${pub.publisher}.` : "";
    return `${authors} (${pub.year}). ${pub.title}. In ${pub.venue}${pages}.${publisher}${locator}`
      .replace(/\s+/g, " ")
      .trim();
  }

  const venue = pub.venue ? `${pub.venue}.` : "";
  const pages = pub.pages ? ` ${apaPages(pub.pages)}.` : "";
  return `${authors} (${pub.year}). ${pub.title}. ${venue}${pages}${locator}`
    .replace(/\s+/g, " ")
    .trim();
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
    ["keywords", pub.keywords?.join(";")],
    ["doi", pub.doi],
    ["url", pub.link ?? pub.pdfUrl],
  ];

  const body = fields
    .filter((f): f is [string, string] => Boolean(f[1]))
    .map(([k, v]) => `  ${k} = {${v}}`)
    .join(",\n");

  return `@${entryType}{${bibKey(pub)},\n${body}\n}`;
}

/**
 * Is this author entry the site owner?
 *
 * Exact string comparison is too brittle: papers list "Yñikko Arzee Neo D.
 * Aguas" while the site uses "Yñikko Arzee Neo Aguas", and a middle initial
 * appearing on one but not the other should not stop the name being
 * highlighted. Matching on given name plus surname handles that, and is still
 * strict enough not to collide with a co-author.
 */
export function isSamePerson(author: string, personName: string): boolean {
  const parts = (name: string) =>
    name
      .toLowerCase()
      .replace(/\./g, "")
      .split(/\s+/)
      .filter(Boolean);

  const a = parts(author);
  const b = parts(personName);
  if (a.length === 0 || b.length === 0) return false;

  return a[a.length - 1] === b[b.length - 1] && a[0] === b[0];
}
