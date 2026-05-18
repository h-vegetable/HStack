import { colors, radius } from './tokens';

/**
 * HeroUI theme override built from HStack tokens.
 * Pass to `heroui({ themes: hstackHeroUITheme })` in tailwind.config.
 */
export const hstackHeroUITheme = {
  light: {
    colors: {
      primary: {
        DEFAULT: colors.brand[500],
        foreground: '#ffffff',
        ...colors.brand,
      },
    },
    layout: {
      radius: {
        small: radius.sm,
        medium: radius.md,
        large: radius.lg,
      },
    },
  },
  dark: {
    colors: {
      primary: {
        DEFAULT: colors.brand[400],
        foreground: '#ffffff',
        ...colors.brand,
      },
    },
    layout: {
      radius: {
        small: radius.sm,
        medium: radius.md,
        large: radius.lg,
      },
    },
  },
};
