"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/data/resume";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  // Tracks the section under a reading line near the top of the viewport.
  //
  // Measured on scroll rather than driven by IntersectionObserver: an observer
  // only fires when a boundary is crossed, so landing mid-section, resizing,
  // or a fast scroll that skips the band all left the URL stale. Measuring is
  // deterministic — whatever is under the line right now wins. rAF keeps it to
  // one measurement per frame, and the hash is only written when it changes,
  // which keeps us well clear of the browser's replaceState rate limit.
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);

      if (!isHome) return;

      const line = window.innerHeight * 0.35;
      const atTop = window.scrollY < 80;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      let current = "";

      if (!atTop) {
        for (const item of navItems) {
          const el = document.getElementById(item.href.slice(1));
          if (!el) continue;
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= line && bottom > line) {
            current = item.href;
            break;
          }
        }
        // The final section is often too short to reach the line.
        if (!current && atBottom) current = navItems[navItems.length - 1].href;
      }

      setActive(current);

      const currentHash = window.location.hash;
      if (currentHash !== current) {
        window.history.replaceState(
          null,
          "",
          current || window.location.pathname
        );
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [isHome]);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-canvas"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-noir",
          scrolled
            ? "border-b border-line bg-canvas/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="container flex h-16 items-center justify-between sm:h-20"
        >
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = isHome && active === item.href;
              const linkClass = cn(
                "relative block px-3 py-2 font-mono text-[11px] uppercase tracking-label transition-colors duration-300",
                isActive ? "text-accent" : "text-muted hover:text-heading"
              );
              const inner = (
                <>
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-500 ease-noir",
                      isActive ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </>
              );

              return (
                <li key={item.href}>
                  {isHome ? (
                    // A bare anchor, deliberately. next/link treats "#about"
                    // as a route change and does an RSC round trip before it
                    // scrolls; a plain href jumps immediately and still gets
                    // the smooth scrolling from globals.css.
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={linkClass}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link href={`/${item.href}`} className={linkClass}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* ml-auto keeps these hard right once the nav list is hidden. */}
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
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
          "fixed inset-0 z-40 bg-canvas/95 backdrop-blur-xl transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <ul className="container flex h-full flex-col justify-center gap-1 overflow-y-auto py-24">
          {navItems.map((item, i) => {
            const itemClass =
              "flex items-baseline gap-4 py-3 font-serif text-2xl text-heading transition-colors hover:text-accent sm:py-4 sm:text-3xl";
            const inner = (
              <>
                <span
                  aria-hidden
                  className="font-mono text-[10px] tracking-label text-muted"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </>
            );

            return (
              <li key={item.href} className="border-b border-line">
                {isHome ? (
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={itemClass}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link
                    href={`/${item.href}`}
                    onClick={() => setOpen(false)}
                    className={itemClass}
                  >
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
