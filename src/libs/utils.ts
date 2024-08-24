import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function wait(fn: () => void, ms: number) {
  return new Promise((res) => {
    setTimeout(() => {
      res(fn);
    }, ms);
  });
}

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
