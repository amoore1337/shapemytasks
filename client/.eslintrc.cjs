module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }],
    'no-use-before-define': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-use-before-define': ['off'],
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'max-len': 'off',
    'no-plusplus': 'off',
    'no-unused-vars': 'off',
    'no-continue': 'off',
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc' },
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          { pattern: 'react', group: 'builtin' },
          { pattern: '@/**', group: 'internal', position: 'after' },
        ],
        pathGroupsExcludedImportTypes: [],
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    'react/no-array-index-key': 'warn',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['js', '.ts', '.tsx'],
      },
    },
  },
  globals: {
    test: true,
    expect: true,
  },
};
