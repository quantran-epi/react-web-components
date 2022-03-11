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
    },
}