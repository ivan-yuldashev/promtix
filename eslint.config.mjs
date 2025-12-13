import antfu from '@antfu/eslint-config';

export default antfu({
  formatters: true,
  gitignore: true,
  ignores: ['**/migrations/*', '**/dist/**', '**/node_modules/**'],
  react: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: true,
  },
  type: 'app',
  typescript: true,
}, {
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    'antfu/no-top-level-await': 'off',
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    'no-console': ['error', { allow: ['info', 'error', 'warn'] }],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../*', './*'],
          },
        ],
      },
    ],
    'node/no-process-env': 'error',
    'node/prefer-global/process': 'off',
    'perfectionist/sort-array-includes': 'error',
    'perfectionist/sort-classes': 'error',
    'perfectionist/sort-enums': ['error', { partitionByNewLine: true }],
    'perfectionist/sort-exports': 'error',
    'perfectionist/sort-imports': [
      'error',
      {
        groups: [
          'type',
          'internal-type',
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling', 'index'],
          'style',
        ],
        newlinesBetween: 'always',
      },
    ],
    'perfectionist/sort-interfaces': 'error',
    'perfectionist/sort-named-exports': 'error',
    'perfectionist/sort-named-imports': 'error',
    'perfectionist/sort-object-types': 'error',
    'perfectionist/sort-objects': ['error', { partitionByNewLine: true }],
    'perfectionist/sort-switch-case': 'error',
    'perfectionist/sort-union-types': 'error',
    'prefer-template': 'error',
    'style/padding-line-between-statements': [
      'error',
      { blankLine: 'always', next: 'export', prev: '*' },
      { blankLine: 'any', next: 'export', prev: 'export' },
    ],
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
        ignore: ['README.md', 'CONTRIBUTING.md'],
      },
    ],
    'unused-imports/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
}, {
  files: ['apps/backend/**/*.ts'],
  rules: {},
}, {
  files: ['apps/frontend/**/*.tsx', 'apps/frontend/**/*.ts'],
  rules: {},
});
