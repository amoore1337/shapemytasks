module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'prettier'],
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
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-use-before-define': ['off'],
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'max-len': 'off',
    'no-plusplus': 'off',
    'no-unused-vars': 'off',
    'no-continue': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    'react/no-array-index-key': 'warn',
  },
  settings: {},
  globals: {
    test: true,
    expect: true,
  },
};
