import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Prepend the configured basePath to a path that lives under /public.
// Required for <Image>/<img> src and CSS background-image when using
// `output: "export"`, since Next.js does not rewrite those at runtime.
// Pass-through for absolute URLs.
export function withBasePath(path: string) {
  if (/^(https?:)?\/\//.test(path)) return path;
  if (!path.startsWith("/")) path = `/${path}`;
  return `${BASE_PATH}${path}`;
}
