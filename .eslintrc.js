module.exports = {
  extends: 'standard',
  rules: {
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
    }],
    'comma-dangle': ['error', 'always-multiline'],
    'strict': 0,
    'key-spacing': ['off'],
  },
  parser: 'babel-eslint',
}