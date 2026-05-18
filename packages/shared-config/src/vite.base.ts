import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig, type UserConfig } from 'vite';

export interface CreateViteOptions {
  /** App root absolute path (usually `__dirname`). */
  root: string;
  /** Dev server port. */
  port?: number;
  /** Extra Vite config to merge. */
  extend?: UserConfig;
}

/**
 * Shared Vite config factory for HStack apps.
 * Adds React plugin, common alias `@` -> `<root>/src`, and sane dev defaults.
 */
export function createViteConfig(options: CreateViteOptions) {
  const { root, port = 5173, extend = {} } = options;

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(root, 'src'),
        ...(extend.resolve?.alias ?? {}),
      },
    },
    server: {
      port,
      host: true,
      cors: true,
      // Allow micro-app cross-origin loading
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      ...(extend.server ?? {}),
    },
    build: {
      target: 'es2022',
      sourcemap: true,
      ...(extend.build ?? {}),
    },
    ...extend,
  });
}
