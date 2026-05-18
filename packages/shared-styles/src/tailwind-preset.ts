import type { Config } from 'tailwindcss';

import { colors, fontFamily, radius, spacing } from './tokens';

/**
 * Tailwind preset that injects HStack design tokens.
 * Apps should add this to `presets: [hstackPreset]` in their tailwind.config.
 */
export const hstackPreset: Config = {
  content: [],
  theme: {
    extend: {
      colors: {
        brand: colors.brand,
        neutral: colors.neutral,
      },
      borderRadius: radius,
      spacing,
      fontFamily: {
        sans: [...fontFamily.sans],
        mono: [...fontFamily.mono],
      },
    },
  },
};

export default hstackPreset;
