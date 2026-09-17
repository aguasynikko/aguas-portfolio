import { cn } from "@/lib/utils";

/** Monospace tech tag / type badge used across cards and records. */
export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "solid";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-1 font-mono text-[10px] uppercase tracking-label transition-colors duration-300",
        variant === "default" && "border border-line bg-surface-raised text-muted",
        variant === "outline" && "border border-line-strong bg-transparent text-muted",
        variant === "solid" && "bg-accent text-base",
        className
      )}
    >
      {children}
    </span>
  );
}
