import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import prettier from 'eslint-config-prettier';
export default defineConfig([
  js.configs.recommended,
  {
    files: ['**/*.{js,cjs}'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
      ecmaVersion: 'latest',
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prefer-const': 'error',
      'no-console': 'warn',
      'consistent-return': 'warn',
      'prefer-template': 'warn',
      'prettier/prettier': 'error',
    },
  },
  prettier,
]);
