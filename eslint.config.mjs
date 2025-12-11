import antfu from '@antfu/eslint-config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default antfu(
  {
    formatters: true,
    ignores: ['**/migrations/*'],
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
    },
    type: 'app',
    typescript: { tsconfigPath: './tsconfig.json' },
  },
  eslintConfigPrettier,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'antfu/no-top-level-await': 'off',
      'no-console': [
        'error',
        {
          allow: ['info', 'error'],
        },
      ],
      'node/no-process-env': 'error',
      'node/prefer-global/process': 'off',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', next: 'export', prev: '*' },
        { blankLine: 'any', next: 'export', prev: 'export' },
      ],
      'perfectionist/sort-array-includes': 'error',
      'perfectionist/sort-classes': 'error',
      'perfectionist/sort-enums': ['error', { partitionByNewLine: true }],
      'perfectionist/sort-exports': 'error',
      'perfectionist/sort-imports': [
        'error',
        {
          tsconfigRootDir: '.',
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
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: ['README.md'],
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
  },
);
