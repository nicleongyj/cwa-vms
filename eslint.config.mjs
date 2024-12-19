import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
    { files: ["**/*.{js,mjs,cjs,ts}"] },
    { languageOptions: { globals: globals.node } },
    {
        rules: {
            eqeqeq: "off",
            "no-unused-vars": "error",
            "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
        },
    },
    { ignores: ["node_modules/*"] },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
];
