import type { Config } from 'tailwindcss';

export interface CreateTailwindOptions {
  /** Glob roots for content scanning. */
  contentRoots: string[];
  /** Optional extra preset(s) (e.g. HeroUI plugin output). */
  presets?: Config['presets'];
  /** Optional extra plugin(s). */
  plugins?: Config['plugins'];
}

/**
 * Build a Tailwind preset/Config base shared across HStack apps.
 * Apps should import this and merge their own content paths.
 */
export function createTailwindPreset(options: CreateTailwindOptions): Config {
  const { contentRoots, presets = [], plugins = [] } = options;
  return {
    content: contentRoots,
    darkMode: 'class',
    presets,
    theme: {
      extend: {
        // Token extension is delegated to @hstack/shared-styles preset.
      },
    },
    plugins,
  };
}
