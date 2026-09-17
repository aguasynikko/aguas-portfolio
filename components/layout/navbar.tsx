"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, person } from "@/data/resume";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view. IntersectionObserver is far
  // cheaper than measuring offsets on every scroll event.
  useEffect(() => {
    if (!isHome) return;
    const ids = navItems.map((n) => n.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const initials = person.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-base"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-noir",
          scrolled
            ? "border-b border-line bg-base/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="container flex h-16 items-center justify-between sm:h-20"
        >
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label={`${person.name} — home`}
          >
            <span className="font-mono text-xs tracking-label text-heading transition-colors group-hover:text-accent">
              {initials}
            </span>
            <span aria-hidden className="h-4 w-px bg-line-strong" />
            <span className="hidden font-mono text-[10px] uppercase tracking-label text-muted sm:inline">
              {person.title}
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const href = isHome ? item.href : `/${item.href}`;
              const isActive = isHome && active === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative px-3 py-2 font-mono text-[11px] uppercase tracking-label transition-colors duration-300",
                      isActive ? "text-accent" : "text-muted hover:text-heading"
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-500 ease-noir",
                        isActive ? "scale-x-100" : "scale-x-0"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              asChild
              variant="solid"
              size="sm"
              className="hidden sm:inline-flex"
            >
              <a href={isHome ? "#contact" : "/#contact"}>Get in touch</a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        hidden={!open}
        className={cn(
          "fixed inset-0 z-40 bg-base/95 backdrop-blur-xl transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <ul className="container flex h-full flex-col justify-center gap-2">
          {navItems.map((item, i) => (
            <li key={item.href} className="border-b border-line">
              <Link
                href={isHome ? item.href : `/${item.href}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 py-4 font-serif text-3xl text-heading transition-colors hover:text-accent"
              >
                <span
                  aria-hidden
                  className="font-mono text-[10px] tracking-label text-muted"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
