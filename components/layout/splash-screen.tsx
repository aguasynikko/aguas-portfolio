/**
 * Opening splash.
 *
 * Deliberately a server component with no JavaScript: the overlay dismisses
 * itself with a CSS animation that ends in `visibility: hidden`. If it relied
 * on React to unmount it, a hydration failure would leave the whole site
 * covered by an opaque panel forever.
 *
 * The briefcase is hand-drawn rather than pulled from lucide so the outline
 * can be stroked on first and filled afterwards — that needs `pathLength` on
 * each subpath, which an icon component does not expose.
 *
 * aria-hidden because the real content is already in the DOM underneath —
 * screen readers and crawlers should never see this at all.
 */
export function SplashScreen() {
  return (
    <div aria-hidden className="splash">
      <svg
        className="splash-mark"
        viewBox="0 0 24 24"
        fill="none"
        // Square caps and mitred joins: no rounding anywhere, so the mark
        // reads as cut rather than drawn.
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        {/* handle — stroked only; filling an open shape would close it oddly */}
        <path
          className="splash-handle"
          pathLength={1}
          d="M8.5 7 V3.5 H15.5 V7"
        />
        {/* case — stroked, then flooded */}
        <path
          className="splash-case"
          pathLength={1}
          d="M2 7 H22 V20 H2 Z"
        />
        {/* keyhole — sits on the filled case in the background colour, then
            turns a quarter-turn clockwise */}
        <g className="splash-lock">
          <rect x="11" y="11.6" width="2" height="2" />
          <rect x="11.4" y="13.2" width="1.2" height="3.2" />
        </g>
      </svg>
    </div>
  );
}
