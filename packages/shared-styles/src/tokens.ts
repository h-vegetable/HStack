/**
 * HStack design tokens — 轻科幻·活力光感
 *
 * Single source of truth for colors / spacing / radius / typography / animation.
 * Consumed by Tailwind preset, HeroUI theme override, CSS variables, and any custom CSS.
 *
 * @see .agent/designs/design-spec.md for the full visual specification.
 */

// ─── Colors ───────────────────────────────────────────────

/** Primary palette — electric violet-blue (light: #5D5FEF, dark: #8582FF) */
export const colors = {
  primary: {
    50: '#efeffe',
    100: '#dcdcff',
    200: '#b9b9ff',
    300: '#9393ff',
    400: '#7676ff',
    500: '#5D5FEF', // light-theme primary
    600: '#4F4BE8',
    700: '#423DD4',
    800: '#3634A8',
    900: '#2D2B84',
    950: '#1A184F',
  },
  /** Secondary palette — bright cyan-green (light: #00D2FF, dark: #3AE0D9) */
  secondary: {
    50: '#e6fbff',
    100: '#ccf5ff',
    200: '#99ebff',
    300: '#5ce0ff',
    400: '#00D2FF', // light-theme secondary
    500: '#00BDE6',
    600: '#0099BD',
    700: '#007A98',
    800: '#005F76',
    900: '#004D5F',
    950: '#002F3B',
  },
  /** Accent palette — coral pink (light: #FF7A9E, dark: #FF6B8B) */
  accent: {
    50: '#fff0f3',
    100: '#ffe0e8',
    200: '#ffc2d4',
    300: '#ff9db8',
    400: '#FF7A9E', // light-theme accent
    500: '#FF5C86',
    600: '#E63D6A',
    700: '#C22654',
    800: '#9E1D45',
    900: '#7F183A',
    950: '#4A0C20',
  },
  /** Neutral palette — cool grey with purple undertone */
  neutral: {
    50: '#F5F3FF',
    100: '#EDE9FF',
    200: '#DDD8F3',
    300: '#C4BDD9',
    400: '#8E8EA0',
    500: '#6A6A82',
    600: '#4A4A6A',
    700: '#3A3A52',
    800: '#2A2A3F',
    900: '#1E1E2F',
    950: '#0F0A1E',
  },
} as const;

// ─── Radius ───────────────────────────────────────────────

export const radius = {
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
} as const;

// ─── Spacing ──────────────────────────────────────────────

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
} as const;

// ─── Typography ───────────────────────────────────────────

export const fontFamily = {
  /** Display / headings — geometric sci-fi feel */
  heading: ['Rajdhani', 'Quicksand', 'system-ui', 'sans-serif'],
  /** Body / UI — rounded friendly */
  sans: ['Quicksand', 'system-ui', '-apple-system', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
  mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
} as const;

// ─── Animation ────────────────────────────────────────────

export const animation = {
  /** Breathe glow — 2s ease-in-out infinite */
  breathe: 'breathe 2s ease-in-out infinite',
  /** Scan-edge rotation — 5s (card) / 6s (panel) linear infinite */
  scanEdge: 'scanEdge 5s linear infinite',
  scanEdgeSlow: 'scanEdge 6s linear infinite',
  /** Hologram line — 4s ease-in-out infinite */
  holoLine: 'holoLine 4s ease-in-out infinite',
  /** Light descend (drawer) — 2s ease-in-out infinite */
  lightDescend: 'lightDescend 2s ease-in-out infinite',
  /** Fade-in-up entrance — 0.6s ease forwards */
  fadeInUp: 'fadeInUp 0.6s ease forwards',
} as const;

export const transition = {
  /** Elastic bounce — buttons, cards, dialogs */
  elastic: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  /** Spring-back — toggle knobs */
  spring: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
  /** Smooth — general transitions */
  smooth: 'ease',
} as const;

export const zIndex = {
  canvas: 0,
  content: 1,
  nav: 100,
  overlay: 200,
  drawer: 201,
} as const;

// ─── Aggregated ───────────────────────────────────────────

export const tokens = {
  colors,
  radius,
  spacing,
  fontFamily,
  animation,
  transition,
  zIndex,
} as const;

export type DesignTokens = typeof tokens;
