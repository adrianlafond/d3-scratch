module.exports = {
  extends: 'standard',
  rules: {
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
    }],
    'comma-dangle': ['error', 'always-multiline'],
  }
}