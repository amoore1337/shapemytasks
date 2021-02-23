module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'global-require': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'import/no-dynamic-require': 'off',
    'no-restricted-syntax': ['off', { selector: 'ForOfStatement' }],
  },
};
