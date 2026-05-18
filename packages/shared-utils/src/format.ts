/** Locale-aware date formatter. */
export function formatDate(input: Date | string | number, locale = 'zh-CN'): string {
  const date = input instanceof Date ? input : new Date(input);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/** Number formatter with thousand separator. */
export function formatNumber(value: number, locale = 'zh-CN'): string {
  return new Intl.NumberFormat(locale).format(value);
}
