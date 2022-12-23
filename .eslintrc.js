module.exports = {
  env: {
    node: true,
    browser: true,
    es2022: true,
    jest: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  overrides: [{
    "files": ["**/*.ts", "**/*.tsx"],
    "env": { "browser": true, "es6": true, "node": true },
    "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended"
    ],
    "globals": { "Atomics": "readonly", "SharedArrayBuffer": "readonly" },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaFeatures": { "jsx": true },
      "ecmaVersion": 2022,
      "sourceType": "module",
      "tsconfigRootDir": __dirname,
      "project": "tsconfig.json"
    },
    "plugins": ["@typescript-eslint"],
    "rules": {
      "indent": ["error", 2, { "SwitchCase": 1 }],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "single"],
      "comma-dangle": ["error", "never"],
      "trailing-comma": [
        0,
        {
          "multiline": {
            "objects": "always",
            "arrays": "always",
            "functions": "never",
            "typeLiterals": "ignore"
          },
          "esSpecCompliant": true
        }
      ],
      "@typescript-eslint/no-explicit-any": 0
    }
  }],
  parserOptions: {
    "ecmaFeatures": { "jsx": true },
    "ecmaVersion": 2022,
    "sourceType": "module",
    "project": "tsconfig.eslint.json"
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off',
    'no-await-in-loop': 'off',
    'react/jsx-uses-vars': 'warn',
    'react/jsx-uses-react': 'warn',
    'array-callback-return': 'warn',
    'default-case': ['warn', { commentPattern: '^no default$' }],
    'dot-location': ['warn', 'property'],
    'eqeqeq': ['warn', 'smart'],
    'new-parens': 'warn',
    'no-array-constructor': 'warn',
    'no-caller': 'warn',
    'no-cond-assign': ['warn', 'except-parens'],
    'no-const-assign': 'warn',
    'no-control-regex': 'warn',
    'no-delete-var': 'warn',
    'no-dupe-args': 'warn',
    'no-dupe-class-members': 'warn',
    'no-dupe-keys': 'warn',
    'no-duplicate-case': 'warn',
    'no-empty-character-class': 'warn',
    'no-empty-pattern': 'warn',
    'no-eval': 'warn',
    'no-ex-assign': 'warn',
    'no-extend-native': 'warn',
    'no-extra-bind': 'warn',
    'no-extra-label': 'warn',
    'no-fallthrough': 'warn',
    'no-func-assign': 'warn',
    'no-implied-eval': 'warn',
    'no-invalid-regexp': 'warn',
    'no-iterator': 'warn',
    'no-label-var': 'warn',
    'no-labels': ['warn', { allowLoop: true, allowSwitch: false }],
    'no-lone-blocks': 'warn',
    'no-loop-func': 'warn',
    'react/jsx-no-comment-textnodes': 'warn',
    'react/jsx-no-duplicate-props': 'warn',
    'react/jsx-no-target-blank': 'warn',
    'react/jsx-no-undef': 'error',
    'react/jsx-pascal-case': [
      'warn',
      {
        allowAllCaps: true,
        ignore: [],
      },
    ],
    'react/no-danger-with-children': 'warn',
    'react/no-direct-mutation-state': 'warn',
    'react/no-is-mounted': 'warn',
    'react/no-typos': 'error',
    'react/require-render-return': 'error',
    'react/style-prop-object': 'warn',
  }
};
