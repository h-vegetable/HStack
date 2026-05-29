import type { Config } from 'tailwindcss';

import { animation, colors, fontFamily, radius, spacing, transition, zIndex } from './tokens';

/**
 * Tailwind preset that injects HStack design tokens (轻科幻·活力光感).
 * Apps should add this to `presets: [hstackPreset]` in their tailwind.config.
 */
export const hstackPreset: Config = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        neutral: colors.neutral,
      },
      borderRadius: radius,
      spacing,
      fontFamily: {
        heading: [...fontFamily.heading],
        sans: [...fontFamily.sans],
        mono: [...fontFamily.mono],
      },
      animation,
      transitionTimingFunction: {
        elastic: transition.elastic,
        spring: transition.spring,
        smooth: transition.smooth,
      },
      zIndex: {
        canvas: String(zIndex.canvas),
        content: String(zIndex.content),
        nav: String(zIndex.nav),
        overlay: String(zIndex.overlay),
        drawer: String(zIndex.drawer),
      },
      keyframes: {
        breathe: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        scanEdge: {
          to: { '--hs-scan-angle': '360deg' },
        },
        holoLine: {
          '0%, 100%': { opacity: '0.3', transform: 'scaleX(0.8)' },
          '50%': { opacity: '0.7', transform: 'scaleX(1)' },
        },
        lightDescend: {
          '0%, 100%': { opacity: '0.3', transform: 'translateY(0)' },
          '50%': { opacity: '1', transform: 'translateY(20px)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
};

export default hstackPreset;
