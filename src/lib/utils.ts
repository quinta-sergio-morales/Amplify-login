// src/lib/utils.ts (assuming you rename the file to .ts)
import { clsx, type ClassValue } from "clsx"; // Import the ClassValue type from clsx
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
