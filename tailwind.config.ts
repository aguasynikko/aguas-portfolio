import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        // Semantic tokens resolve to the CSS variables in globals.css, so the
        // same class names produce "noir" in dark mode and "daylight" in light.
        // Named `canvas`, not `base`: a `base` colour would generate a
        // `text-base` utility that collides with Tailwind's built-in
        // text-base font size, and the colour silently wins — which
        // painted body copy in the background colour.
        canvas: "hsl(var(--base) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        "surface-raised": "hsl(var(--surface-raised) / <alpha-value>)",
        line: "hsl(var(--line) / <alpha-value>)",
        "line-strong": "hsl(var(--line-strong) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        body: "hsl(var(--body) / <alpha-value>)",
        heading: "hsl(var(--heading) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        brass: "hsl(var(--brass) / <alpha-value>)",
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        label: "0.18em",
      },
      borderRadius: {
        sm: "2px",
        DEFAULT: "3px",
        md: "4px",
        lg: "6px",
      },
      boxShadow: {
        lift: "0 18px 50px -22px hsl(var(--glow) / 0.55)",
        "lift-lg": "0 30px 80px -30px hsl(var(--glow) / 0.7)",
      },
      transitionTimingFunction: {
        noir: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
