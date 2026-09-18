import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import { Footer } from "@/components/layout/footer";
import { GrainOverlay } from "@/components/layout/grain-overlay";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { JsonLd } from "@/components/ui/json-ld";
import { person } from "@/data/resume";
import { personJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { siteUrl } from "@/lib/utils";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${person.name} — ${person.title}`,
    template: `%s — ${person.name}`,
  },
  description: person.tagline,
  keywords: [
    person.name,
    "AI Engineer",
    "Machine Learning",
    "Computer Vision",
    "RAG",
    "Data Scientist",
    "Software Developer",
    "Philippines",
  ],
  authors: [{ name: person.name, url: siteUrl }],
  creator: person.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: person.name,
    title: `${person.name} — ${person.title}`,
    description: person.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${person.name} — ${person.title}`,
    description: person.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
    { media: "(prefers-color-scheme: light)", color: "#F5F5F3" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      // next-themes writes the class on <html>; suppress the expected
      // server/client mismatch for that one attribute.
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <GrainOverlay />
          <Navbar />
          <div className="relative z-10">{children}</div>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              classNames: {
                toast:
                  "!bg-surface-raised !border !border-line-strong !text-body !rounded",
                title: "!text-heading !font-sans !text-sm",
                description: "!text-muted !text-xs",
              },
            }}
          />
        </ThemeProvider>
        <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
        <Analytics />
      </body>
    </html>
  );
}
