import { colors, radius } from './tokens';

/**
 * HeroUI theme override built from HStack tokens (轻科幻·活力光感).
 * Pass to `heroui({ themes: hstackHeroUITheme })` in tailwind.config.
 */
export const hstackHeroUITheme = {
  light: {
    colors: {
      primary: {
        DEFAULT: colors.primary[500],
        foreground: '#ffffff',
        ...colors.primary,
      },
      secondary: {
        DEFAULT: colors.secondary[400],
        foreground: '#ffffff',
        ...colors.secondary,
      },
      danger: {
        DEFAULT: colors.accent[400],
        foreground: '#ffffff',
        ...colors.accent,
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
        DEFAULT: colors.primary[400],
        foreground: '#ffffff',
        ...colors.primary,
      },
      secondary: {
        DEFAULT: colors.secondary[400],
        foreground: '#ffffff',
        ...colors.secondary,
      },
      danger: {
        DEFAULT: colors.accent[400],
        foreground: '#ffffff',
        ...colors.accent,
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
