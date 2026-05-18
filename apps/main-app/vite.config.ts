import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root,
  plugins: [react(), tsconfigPaths({ projects: ['./tsconfig.json', '../../tsconfig.base.json'] })],
  server: {
    port: 5173,
    host: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    target: 'es2022',
    sourcemap: true,
  },
});
