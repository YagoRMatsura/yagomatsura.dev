/**
 * Estimate reading time in minutes for prose text.
 * Assumes ~200 words per minute. Always returns at least 1.
 *
 * @example
 *   readingTimeMinutes("word ".repeat(400)) // → 2
 */
export function readingTimeMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
