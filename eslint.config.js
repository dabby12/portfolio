// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginUnusedImports from 'eslint-plugin-unused-imports';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      'unused-imports': pluginUnusedImports,
    },
    rules: {
      // Turn off the base rule to avoid duplication
      'no-unused-vars': 'off',

      // Remove unused imports
      'unused-imports/no-unused-imports': 'error',

      // Remove unused variables but allow ones that start with _
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
];
