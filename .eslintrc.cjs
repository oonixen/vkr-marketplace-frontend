module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'prettier',
    '@feature-sliced'
  ],
  plugins: ['react-refresh', 'prettier'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  settings: {
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true
      }
    }
  },
  rules: {
    'prettier/prettier': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    "@typescript-eslint/no-explicit-any": 0,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
