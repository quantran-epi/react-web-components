const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const tsTransformPaths = require('@zerollup/ts-transform-paths');
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
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript"],
                        plugins: [
                            "@babel/plugin-proposal-class-properties",
                            "babel-plugin-styled-components"
                        ]
                    }
                }
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    getCustomTransformers: (program) => {
                        const transformer = tsTransformPaths(program);

                        return {
                            before: [transformer.before], // for updating paths in generated code
                            afterDeclarations: [transformer.afterDeclarations] // for updating paths in declaration files
                        };
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'jsx'],
    },
}