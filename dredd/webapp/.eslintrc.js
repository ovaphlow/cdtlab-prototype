module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    // 'semi': 0
    "jsx-a11y/label-has-associated-control": 0,
    "no-alert": 0,
    "no-unused-expressions": [1, {
      "allowShortCircuit": true
    }],
    "camelcase": 0,
    "react/prop-types": 0,
    "import/prefer-default-export": 0,
  },
};