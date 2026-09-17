import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-[80svh] items-center justify-center px-6 text-center"
    >
      <div>
        <p className="label mb-6">Error 404</p>
        <h1 className="text-gradient-heading text-5xl tracking-tight sm:text-6xl">
          No record found.
        </h1>
        <p className="mx-auto mt-6 max-w-sm leading-relaxed text-muted">
          That page isn&apos;t in the archive. It may have been moved, or never
          existed at all.
        </p>
        <Button asChild variant="outline" className="mt-10">
          <Link href="/">
            <ArrowLeft />
            Return to portfolio
          </Link>
        </Button>
      </div>
    </main>
  );
}
