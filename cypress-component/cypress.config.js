import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: { framework: 'react', bundler: 'vite' },
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.ts',
    indexHtmlFile: 'cypress/support/component-index.html',
  },
  screenshotsFolder: 'out/screenshots',
  videosFolder: 'out/videos',
  video: false,
  screenshotOnRunFailure: true,
  viewportWidth: 600,
  viewportHeight: 700,
});
