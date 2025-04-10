import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      // Règle pour détecter les imports non utilisés
      "no-unused-vars": ["warn", {
        "vars": "all", 
        "varsIgnorePattern": "^_", 
        "args": "after-used", 
        "argsIgnorePattern": "^_",
        "ignoreRestSiblings": true
      }],
      // Détecte les imports qui ne sont pas utilisés (plus strict)
      "import/no-unused-modules": [1, { "unusedExports": true }]
    }
  }
];

export default eslintConfig;
