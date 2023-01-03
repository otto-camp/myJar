const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "bn7xhp",

    e2e: {
        baseUrl: "http://localhost:8080",
        specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
        supportFile: false,
    },


    component: {
        devServer: {
            framework: "create-react-app",
            bundler: "webpack",
        },
        specPattern: "cypress/component/**/*.{cy,spec}.{js,jsx,ts,tsx}",
        supportFile: false,

    },
});
