const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "bn7xhp",

    e2e: {
        baseUrl: "http://localhost:8080",
        specPattern: "cypress/e2e/**/*.cy.js",
        supportFile: false,
    },


    component: {
        devServer: {
            framework: "create-react-app",
            bundler: "webpack",
        },
        specPattern: "cypress/component/**/*.cy.js",
        supportFile: false,

    },
});
