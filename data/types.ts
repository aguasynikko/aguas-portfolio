/**
 * Content model for the portfolio.
 *
 * Every section on the site renders from `data/resume.ts`, which is typed by
 * these interfaces. Adding content should never require touching a component.
 */

export type SkillCategory =
  | "Languages"
  | "Frontend"
  | "Backend & Data"
  | "AI & ML"
  | "Cloud & DevOps"
  | "Tools";

export type SkillLevel = "Foundational" | "Proficient" | "Advanced";

export interface Skill {
  name: string;
  /**
   * Key from `lib/icons.ts`. If the name is absent from that map, the tile
   * falls back to a monospace monogram automatically — so an unknown or
   * misspelled key degrades gracefully instead of breaking the build.
   */
  icon?: string;
  category: SkillCategory;
  level?: SkillLevel;
  /** Years of hands-on use. Renders in the tooltip as "Advanced · 3 yrs". */
  years?: number;
}

export interface Achievement {
  text: string;
  /** Rendered as monospace tags beneath the bullet. */
  tech?: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  /** Display strings, e.g. "Apr. 2026". */
  start: string;
  end: string;
  /** ISO YYYY-MM, used only for sorting. */
  sortKey: string;
  /** Drives the timeline marker: research entries render differently. */
  kind: "work" | "research";
  summary?: string;
  achievements: Achievement[];
}

/** Drives the project filter chips. "All" is added by the UI, not stored. */
export type ProjectCategory =
  | "Artificial Intelligence"
  | "Data Science"
  | "Software Development";

export interface Project {
  slug: string;
  title: string;
  /** One-sentence hook shown on the card. */
  blurb: string;
  highlights: string[];
  /** A project may sit in more than one category. */
  categories: ProjectCategory[];
  tech: string[];
  /** Path under /public. Omit to render the generated monogram plate. */
  image?: string;
  demo?: string;
  repo?: string;
  /** Featured projects appear on the homepage grid first. */
  featured?: boolean;
  year?: string;
}

export type PublicationType =
  | "Journal"
  | "Conference"
  | "Preprint"
  | "Article"
  | "Thesis";

export interface Publication {
  id: string;
  title: string;
  /**
   * Full author list in citation order. Any entry that exactly matches
   * `person.name` is highlighted, so keep the spelling identical.
   */
  authors: string[];
  venue: string;
  year: number;
  type: PublicationType;
  abstract: string;
  highlights?: string[];
  tech?: string[];
  doi?: string;
  pdfUrl?: string;
  link?: string;
  /** Optional, for citation completeness. */
  pages?: string;
  publisher?: string;
}

export interface Education {
  school: string;
  degree: string;
  /** Bare field of specialization, e.g. "Artificial Intelligence". */
  specialization?: string;
  location?: string;
  start: string;
  end: string;
  notes?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
  /** Used to cluster certificates under a subheading. */
  group?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  /** Key from `lib/icons.ts`. */
  icon: string;
  /** Shown in the contact grid under the label. */
  handle?: string;
}

export interface Person {
  name: string;
  /** Canonical role. Used for SEO, Open Graph, and JSON-LD — never animated. */
  title: string;
  /** Hero rotation. The first entry is the anchor and paints first. */
  titles: string[];
  tagline: string;
  bio: string[];
  photo: string;
  photoAlt: string;
  resumeUrl: string;
  location: string;
  /** Short factual line above the name — what the work is, not what's wanted. */
  kicker: string;
  /** One-line description of the problem areas the work covers. */
  focus: string;
  email: string;
  /** Intentionally omitted from the rendered page — see README. */
  phone?: string;
  socials: SocialLink[];
}

export interface NavItem {
  label: string;
  href: string;
}
