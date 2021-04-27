module.exports = {
  root: true,
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  plugins: ['html'],
  rules: {
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: ['off', 'always'],
    eqeqeq: 0,
    'spaced-comment': 0,
    'keyword-spacing': 0,
    'space-before-function-paren': 0,
    quotes: [0, 'single'],
    'comma-dangle': 0,
    'vue/require-v-for-key': 'off'
  }
}
