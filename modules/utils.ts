import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Kompletace CSS tříd z objektu s variantami vybranými na základě parametrů.
 * @param inputs Objekt s variantami CSS tříd.
 * @returns Tailwind CSS třídy.
 * @label BASIC_FEATURE
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
