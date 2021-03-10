module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['off'],
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'max-len': 'off',
    'no-plusplus': 'off',
    'no-unused-vars': 'off',
    'import/order': ['error', { alphabetize: { order: 'asc' } }],
    '@typescript-eslint/no-unused-vars': ['warn'],
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
