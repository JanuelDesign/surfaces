/**
 * Precision number formatting utilities to prevent JavaScript floating point artifacts
 * (e.g. 752.0600000000001) and format clean numbers (e.g. 750 instead of 750.00).
 */

/**
 * Rounds a number to a maximum number of decimal places (default 2),
 * avoiding floating-point rounding errors like 1.005 * 100 = 100.49999999999999.
 */
export function roundNumber(value: number | string | undefined | null, maxDecimals: number = 2): number {
  if (value === undefined || value === null) return 0;
  const num = typeof value === 'number' ? value : parseFloat(String(value));
  if (isNaN(num)) return 0;
  const factor = Math.pow(10, maxDecimals);
  return Math.round((num + Number.EPSILON) * factor) / factor;
}

/**
 * Formats a number to up to `maxDecimals` (default 2).
 * If the resulting number is an integer (e.g. 750 or 750.00), it returns '750' without decimals.
 * If it has decimals (e.g. 752.06), it preserves them cleanly without trailing zero clutter.
 */
export function formatCleanNumber(value: number | string | undefined | null, maxDecimals: number = 2): string {
  if (value === undefined || value === null) return '0';
  const rounded = roundNumber(value, maxDecimals);
  return parseFloat(rounded.toFixed(maxDecimals)).toString();
}
