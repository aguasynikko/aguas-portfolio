"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { Button } from "@/components/ui/button";

/** startViewTransition is not in lib.dom yet. */
type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { ready: Promise<void> };
};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Theme is unknowable until hydration; rendering a fixed-size placeholder
  // avoids both a hydration mismatch and a layout jump in the navbar.
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  /**
   * Swaps the theme behind a circular wipe that opens from the button.
   *
   * The View Transitions API snapshots the old and new renders, so the whole
   * page crosses over at once instead of a hundred elements each running
   * their own colour transition. Falls back to an instant swap where the API
   * is missing (Firefox, older Safari) or motion is reduced — the theme still
   * changes, just without the sweep.
   */
  function toggle(event: MouseEvent<HTMLButtonElement>) {
    const next = isDark ? "light" : "dark";
    const doc = document as ViewTransitionDocument;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof doc.startViewTransition !== "function") {
      setTheme(next);
      return;
    }

    const { clientX: x, clientY: y } = event;
    // Radius needed to reach the furthest corner from the click point.
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      // flushSync so the DOM carries the new theme before the snapshot is
      // taken; a normal React update would land after the transition starts.
      flushSync(() => setTheme(next));
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 620,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} mode`
          : "Toggle color theme"
      }
      onClick={toggle}
      className="rounded-full border border-transparent hover:border-line"
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-4" />
        ) : (
          <Moon className="size-4" />
        )
      ) : (
        <span className="size-4" />
      )}
    </Button>
  );
}
