import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import alias from '@rollup/plugin-alias';

const packageJson = require("./package.json");

export default {
    input: "src/index.ts",
    output: [
        {
            file: packageJson.main,
            format: "cjs",
            sourcemap: true
        },
        {
            file: packageJson.module,
            format: "esm",
            sourcemap: true
        }
    ],
    plugins: [
        alias({
            entries: [
                { find: '@theme/specs/abstract', replacement: './src/theme/specs/abstract' },
                { find: '@theme/specs/default', replacement: './src/theme/specs/default' },
                { find: '@theme/provider', replacement: './src/theme/provider' },
                { find: '@theme/responsive', replacement: './src/theme/responsive' },
            ]
        }),
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({ useTsconfigDeclarationDir: true }),
    ]
};