const coreRules = require('./eslint/rules/core.cjs');
const importRules = require('./eslint/rules/import.cjs');
const a11yRules = require('./eslint/rules/jsx-a11y.cjs');
const reactRules = require('./eslint/rules/react.cjs');
const typescriptRules = require('./eslint/rules/typescript.cjs');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
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
  plugins: ['import', 'react', 'react-hooks', 'jsx-a11y', '@typescript-eslint'],
  rules: {
    ...coreRules,
    ...importRules,
    ...a11yRules,
    ...reactRules,
    ...typescriptRules,
  },
  settings: {
    // import:
    'import/ignore': ['node_modules', '\\.(css|md|svg|json)$'],
    'import/parsers': {
      [require.resolve('@typescript-eslint/parser')]: ['.ts', '.tsx', '.d.ts'],
    },
    'import/resolver': {
      [require.resolve('eslint-import-resolver-node')]: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      [require.resolve('eslint-import-resolver-typescript')]: {
        alwaysTryTypes: true,
      },
    },
  },
  globals: {
    test: true,
    expect: true,
  },
};
