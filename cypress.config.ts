import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'e2e/src',
      bundler: 'vite',
      webServerCommands: {
        default: 'nx run org:serve',
        production: 'nx run org:preview',
      },
      ciWebServerCommand: 'nx run org:preview',
      ciBaseUrl: 'http://localhost:4300',
    }),

    baseUrl: 'http://localhost:4200',
  },
});
