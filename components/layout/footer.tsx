import { ArrowUpRight } from "lucide-react";
import { person } from "@/data/resume";
import { getIcon } from "@/lib/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="container py-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-serif text-2xl text-heading">{person.name}</p>
            <p className="label mt-2">{person.location}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {person.focus}
            </p>
          </div>

          <nav aria-label="Elsewhere">
            <p className="label mb-3">Elsewhere</p>
            <ul className="space-y-2">
              {person.socials.map((social) => {
                const Icon = getIcon(social.icon);
                const external = social.href.startsWith("http");
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group inline-flex items-center gap-3 text-sm text-muted transition-colors duration-300 hover:text-heading"
                    >
                      {Icon && <Icon aria-hidden className="size-4" />}
                      <span>{social.label}</span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="hairline my-7" />

        <p className="label text-center">
          © {year} {person.name}
        </p>
      </div>
    </footer>
  );
}
