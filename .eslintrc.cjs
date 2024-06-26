module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'prettier',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/order': [
      'error',
      {
        'groups': [
          'index',
          'sibling',
          'parent',
          'internal',
          'external',
          'builtin',
          'object',
          'type'
        ]
      }
    ]
  },
  settings: {
    react: {
      version: "detect"
    }
  }
}
