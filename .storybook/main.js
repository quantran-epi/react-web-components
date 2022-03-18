const path = require("path");

module.exports = {
    stories: ["../src/components/**/*.stories.tsx"],
    // Add any Storybook addons you want here: https://storybook.js.org/addons/
    addons: [
        "@storybook/addon-viewport",
    ],
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            loader: require.resolve("babel-loader"),
        });
        config.resolve.extensions.push(".ts", ".tsx");

        return config;
    }
};