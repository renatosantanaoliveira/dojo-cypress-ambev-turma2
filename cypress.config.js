const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-grep/src/plugin')(config);
      return config;
    },
    "env": {
      "grepFilterSpecs": true
    },
    baseUrl:'https://conexaoqa.herokuapp.com/'
  },
  projectId: "o1ponr"
});
