/**
 * HStack design tokens.
 * Single source of truth for colors / spacing / radius / typography.
 * Consumed by Tailwind preset, HeroUI theme override, and any custom CSS.
 */
export const colors = {
  brand: {
    50: '#eef4ff',
    100: '#dae6ff',
    200: '#bdd1ff',
    300: '#90b3ff',
    400: '#6a8eff',
    500: '#4a6aff',
    600: '#3550e8',
    700: '#2a3fc4',
    800: '#23339c',
    900: '#1f2c7a',
  },
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#0a0f1d',
  },
} as const;

export const radius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
} as const;

export const fontFamily = {
  sans: [
    'Inter',
    'system-ui',
    '-apple-system',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'PingFang SC',
    'Microsoft YaHei',
    'sans-serif',
  ],
  mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
} as const;

export const tokens = {
  colors,
  radius,
  spacing,
  fontFamily,
} as const;

export type DesignTokens = typeof tokens;
