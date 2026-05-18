import { heroui } from '@heroui/react';
import type { Config } from 'tailwindcss';

import { hstackHeroUITheme, hstackPreset } from '@hstack/shared-styles';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    '../../packages/shared-ui/src/**/*.{ts,tsx}',
    '../../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  presets: [hstackPreset],
  plugins: [
    heroui({
      themes: hstackHeroUITheme,
    }),
  ],
};

export default config;
