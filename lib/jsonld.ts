import {
  education,
  experience,
  person,
  publications,
  skills,
} from "@/data/resume";
import { siteUrl } from "./utils";

/** Person schema — the primary entity for this site. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: person.name,
    url: siteUrl,
    image: `${siteUrl}${person.photo}`,
    jobTitle: person.title,
    email: `mailto:${person.email}`,
    description: person.tagline,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Makati City",
      addressCountry: "PH",
    },
    alumniOf: education.map((e) => ({
      "@type": "CollegeOrUniversity",
      name: e.school,
    })),
    worksFor: experience
      .filter((e) => e.kind === "work")
      .map((e) => ({ "@type": "Organization", name: e.company })),
    knowsAbout: skills.map((s) => s.name),
    sameAs: person.socials
      .filter((s) => s.href.startsWith("http"))
      .map((s) => s.href),
  };
}

/** One ScholarlyArticle per publication. */
export function publicationsJsonLd() {
  return publications.map((pub) => ({
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "@id": `${siteUrl}/publications#${pub.id}`,
    headline: pub.title,
    name: pub.title,
    abstract: pub.abstract,
    datePublished: String(pub.year),
    author: pub.authors.map((name) => ({
      "@type": "Person",
      name,
      ...(name === person.name ? { "@id": `${siteUrl}/#person` } : {}),
    })),
    publisher: pub.publisher
      ? { "@type": "Organization", name: pub.publisher }
      : undefined,
    isPartOf: pub.venue
      ? { "@type": "Periodical", name: pub.venue }
      : undefined,
    ...(pub.doi ? { identifier: `https://doi.org/${pub.doi}` } : {}),
    ...(pub.link ? { url: pub.link } : {}),
  }));
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: `${person.name} — ${person.title}`,
    description: person.tagline,
    publisher: { "@id": `${siteUrl}/#person` },
  };
}
