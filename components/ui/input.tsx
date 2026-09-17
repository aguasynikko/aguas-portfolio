import * as React from "react";
import { cn } from "@/lib/utils";

const fieldStyles =
  "w-full rounded border border-line bg-surface px-4 py-3 font-sans text-sm text-heading placeholder:text-muted/70 transition-colors duration-300 ease-noir hover:border-line-strong focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50 aria-[invalid=true]:border-brass";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", ...props }, ref) => (
    <input type={type} ref={ref} className={cn(fieldStyles, className)} {...props} />
  )
);
Input.displayName = "Input";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(fieldStyles, "min-h-[9rem] resize-y leading-relaxed", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Input, Textarea };
