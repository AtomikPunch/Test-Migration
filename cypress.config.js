const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.jardiland.com/',
    chromeWebSecurity: false,
    defaultCommandTimeout: 5000,
    screenshotsFolder: 'cypress/screenshots',
    experimentalOriginDependencies: true,
    fixturesFolder: 'cypress/resources',
    supportFile: 'cypress/src/support/e2e.js',
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      }),
        require("cypress-localstorage-commands/plugin")(on, config);
      return config;
    },
  },
});
