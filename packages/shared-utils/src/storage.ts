/**
 * Type-safe localStorage wrapper that auto-serializes JSON values.
 * Returns `null` and silently catches errors when storage is unavailable (SSR / privacy mode).
 */
export const storage = {
  get<T>(key: string): T | null {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  },
  set<T>(key: string, value: T): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore quota / privacy errors
    }
  },
  remove(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
  },
};
