import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import {
  defineConfig,
  globalIgnores,
} from "eslint/config";

export default defineConfig([
  globalIgnores([
    "dist/**",
    ".astro/**",
    "node_modules/**",
  ]),

  {
    files: ["**/*.{js,mjs,cjs,ts}"],

    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],

    languageOptions: {
      globals: globals.browser,
    },
  },

  ...eslintPluginAstro.configs.recommended,
]);