/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  envPrefix: 'VITE_',
  cacheDir: './node_modules/.vite/org',
  base: process.env.NODE_ENV === 'production' ? '/marvel-comics/' : '/',
  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: './dist/org',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: { external: ['cypress'] },
  },

  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    deps: {
      inline: ['@nivo'],
    },
    reporters: ['default'],
    coverage: {
      reportsDirectory: './coverage/org',
      provider: 'v8',
    },
    alias: {
      '@nivo/circle-packing': require.resolve('@nivo/circle-packing'),
    },
    setupFiles: './vitest.setup.ts',
  },
});
