const path = require("path");

module.exports = {
    stories: ["../src/components/**/*.stories.tsx"],
    // Add any Storybook addons you want here: https://storybook.js.org/addons/
    addons: [
        "@storybook/addon-viewport"
    ],
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            loader: require.resolve("babel-loader"),
        });
        config.resolve.extensions.push(".ts", ".tsx");
        config.resolve.alias = {
            ...config.resolve?.alias,
            "@theme/specs/abstract$": path.resolve(__dirname, '../src/theme/specs/abstract'),
            "@theme/specs/default": path.resolve(__dirname, '../src/theme/specs/default/index.ts'),
            "@theme/provider": path.resolve(__dirname, '../src/theme/provider/index.ts'),
            "@theme/responsive": path.resolve(__dirname, '../src/theme/responsive/index.ts')
        }

        return config;
    }
};