const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals');
module.exports = {
    entry: './src/index.ts',
    mode: process.env.NODE_ENV || "development",
    externals: [nodeExternals()],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs'
    },
    plugins: [new CleanWebpackPlugin()],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'jsx'],
        // alias: {
        //     "@theme/specs/abstract$": path.resolve(__dirname, './src/theme/specs/abstract'),
        //     "@theme/specs/default": path.resolve(__dirname, './src/theme/specs/default/index.ts'),
        //     "@theme/provider": path.resolve(__dirname, './src/theme/provider/index.ts'),
        //     "@theme/responsive$": path.resolve(__dirname, './src/theme/responsive'),
        //     "@theme/style-props": path.resolve(__dirname, './src/theme/style-props/index.ts')
        // },
    },
}