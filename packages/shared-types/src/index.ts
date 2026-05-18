/**
 * Cross-cutting types shared across all HStack apps and packages.
 * Domain-specific types should live close to their owning module (apps/api/src/modules/{domain}/dto).
 */

export type AuthMode = 'embedded' | 'standalone';

export type Theme = 'light' | 'dark' | 'system';

export type Locale = 'zh-CN' | 'en-US';

export interface AuthUser {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  roles: string[];
}

export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
  traceId?: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export type MicroAppName = 'portal' | 'mock' | 'house-hunting' | 'component-hub';

export interface MicroAppDataPayload {
  user: AuthUser | null;
  token: string | null;
  theme: Theme;
  locale: Locale;
}
