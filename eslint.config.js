import js from "@eslint/js";
import nodemailerConfig from "eslint-config-nodemailer";
import prettierConfig from "eslint-config-prettier/flat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const tsconfigRootDir = path.dirname(fileURLToPath(import.meta.url));
const typeScriptFiles = ["src/**/*.ts"];
const typeCheckedConfigs = tseslint.configs.recommendedTypeChecked.map(
  config => ({
    ...config,
    files: typeScriptFiles
  })
);
const nodemailerGlobals = Object.fromEntries(
  Object.entries(nodemailerConfig.globals ?? {}).map(([name, writable]) => [
    name,
    writable ? "writable" : "readonly"
  ])
);

export default tseslint.config(
  {
    ignores: ["dist/", "node_modules/", "coverage/"]
  },
  js.configs.recommended,
  {
    name: "nodemailer",
    languageOptions: {
      globals: nodemailerGlobals
    },
    rules: nodemailerConfig.rules
  },
  ...typeCheckedConfigs,
  {
    files: typeScriptFiles,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir
      }
    },
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/no-empty-object-type": "off"
    }
  },
  prettierConfig
);
