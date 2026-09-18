import * as React from "react";
import { cn } from "@/lib/utils";

const fieldStyles =
  "w-full rounded border border-line bg-surface px-3.5 py-2.5 font-sans text-sm text-heading placeholder:text-muted/70 transition-colors duration-300 ease-noir hover:border-line-strong focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50 aria-[invalid=true]:border-brass";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      // Password managers and 2FA extensions add their own attributes to
      // form fields before hydration. Without this, that mismatch aborts
      // hydration for the whole tree and interactive elements elsewhere on
      // the page silently stop responding.
      suppressHydrationWarning
      className={cn(fieldStyles, className)}
      {...props}
    />
  )
);
Input.displayName = "Input";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    suppressHydrationWarning
    className={cn(fieldStyles, "min-h-[7rem] resize-y leading-relaxed", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Input, Textarea };
