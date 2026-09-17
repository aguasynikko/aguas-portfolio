import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Zero-pads a 1-based index into a record label: 1 → "01". */
export function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ynikko-aguas.vercel.app"
).replace(/\/$/, "");
