import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Joins class names, dropping falsy pieces, and lets a later Tailwind utility
 * beat an earlier one that sets the same property instead of leaving the
 * winner to stylesheet order.
 *
 * Most of this repo's classes are the hand-written `ws-*` ones from
 * `design-portfolio.css`, which `tailwind-merge` passes through untouched —
 * it only rewrites classes it recognises as Tailwind utilities, and
 * `globals.css` does import Tailwind, so those can appear at any point.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
