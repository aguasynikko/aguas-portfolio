/**
 * Fixed film-grain and vignette layer. Purely decorative, never interactive,
 * and sits above the background but below all content.
 */
export function GrainOverlay() {
  return (
    <>
      <div
        aria-hidden
        className="grain-layer pointer-events-none fixed inset-0 z-[1] mix-blend-overlay"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_55%,hsl(var(--base)/0.55)_100%)]"
      />
    </>
  );
}
