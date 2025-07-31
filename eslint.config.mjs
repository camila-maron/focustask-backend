// @ts-check
import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';
import globals from 'globals';

const compat = new FlatCompat();

export default [
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...compat.extends(
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ),
  ...compat.extends('plugin:prettier/recommended'),
  {
    ignores: [
      'dist',
      'node_modules',
      '*.js',
      '*.json',
      '*.sqlite',
      'test.sqlite',
      'db.sqlite',
      'coverage',
      'build',
      'eslint.config.mjs',
    ],
  },
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module',
        ecmaVersion: 2022,
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
  },
  {
    rules: {
      // TypeScript
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/ban-types': [
        'error',
        {
          types: {
            '{}': false,
          },
        },
      ],
      // Prettier
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          singleQuote: true,
          printWidth: 100,
          trailingComma: 'all',
        },
      ],
      // General
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
      'sort-imports': [
        'warn',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],
    },
  },
];
