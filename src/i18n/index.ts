import { pt, type Dict } from './pt';
import { en } from './en';

export type Lang = 'pt' | 'en';

const dictionaries: Record<Lang, Dict> = { pt, en };

export function t(lang: Lang): Dict {
  return dictionaries[lang];
}

/**
 * Extract the active language from a URL pathname.
 * `/en/anything` → 'en'. Everything else → 'pt'.
 */
export function langFromPath(pathname: string): Lang {
  return pathname.startsWith('/en/') || pathname === '/en' ? 'en' : 'pt';
}

/**
 * Map the current path to its counterpart in the other language.
 * Example: '/' ↔ '/en/', '/blog' ↔ '/en/blog'.
 * Blog-post slugs do NOT auto-translate — caller must verify existence
 * via `translationOf`. This helper only handles the route prefix.
 */
export function switchLangPath(pathname: string, target: Lang): string {
  const isEn = pathname.startsWith('/en/') || pathname === '/en';
  if (target === 'en') {
    if (isEn) return pathname;
    return pathname === '/' ? '/en/' : `/en${pathname}`;
  }
  // target === 'pt'
  if (!isEn) return pathname;
  const stripped = pathname.replace(/^\/en/, '');
  return stripped === '' ? '/' : stripped;
}

export type { Dict };
