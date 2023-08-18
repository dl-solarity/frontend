module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    'vue-i18n': {
      localeDir: 'plugins/localization/**/*.(json|json5)',
    },
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    '@vue/eslint-config-typescript/recommended',
    'plugin:vue-i18n/recommended',
    '@vue/prettier',
    '@vue/eslint-config-prettier',
  ],
  plugins: ['promise'],
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        vueIndentScriptAndStyle: false,
        printWidth: 80,
        trailingComma: 'all',
        endOfLine: 'auto',
        tabWidth: 2,
        semi: false,
        singleQuote: true,
        bracketSpacing: true,
        bracketSameLine: false,
        arrowParens: 'avoid',
      },
    ],
    'vue-i18n/no-v-html': 'off',
    'vue-i18n/no-dynamic-keys': 'warn',
    'vue-i18n/no-missing-keys': 'warn',
    'vue-i18n/no-unused-keys': [
      'error',
      {
        extensions: ['.js', '.ts', '.vue'],
      },
    ],
    'vue-i18n/no-raw-text': [
      'error',
      {
        ignoreText: ['—', '|', '×'],
      },
    ],
    'arrow-parens': 0,
    'no-debugger': 1,
    'no-warning-comments': [
      1,
      {
        terms: ['hardcoded'],
        location: 'anywhere',
      },
    ],
    'no-return-await': 0,
    'object-curly-spacing': ['error', 'always'],
    'no-var': 'error',
    'comma-dangle': [1, 'always-multiline'],
    'linebreak-style': ['error', 'unix'],
    'generator-star-spacing': 0,
    'no-tabs': 2,
    'max-len': [
      1,
      {
        code: 80,
        comments: 80,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-console': [
      1,
      {
        allow: ['warn', 'error'],
      },
    ],
    quotes: [2, 'single', { avoidEscape: false }],
    'no-multiple-empty-lines': [2, { max: 1, maxEOF: 0, maxBOF: 0 }],
    semi: [2, 'never'],
    'vue/multi-word-component-names': 0,
    'vue/component-definition-name-casing': ['error', 'kebab-case'],
    'vue/valid-v-for': 2,
    'vue/attributes-order': 0,
    'vue/order-in-components': 1,
    'vue/html-closing-bracket-newline': 0,
    'vue/attribute-hyphenation': 1,
    'vue/component-name-in-template-casing': [2, 'kebab-case'],
    'vue/html-end-tags': 2,
    'vue/html-indent': 1,
    'vue/html-quotes': 1,
    'vue/multiline-html-element-content-newline': 1,
    'vue/mustache-interpolation-spacing': 1,
    'vue/no-async-in-computed-properties': 2,
    'vue/no-use-v-if-with-v-for': 1,
    'vue/no-dupe-keys': 2,
    'vue/no-duplicate-attributes': 2,
    'vue/no-multi-spaces': 1,
    'vue/no-reserved-keys': 2,
    'vue/no-shared-component-data': 2,
    'vue/no-side-effects-in-computed-properties': 2,
    'vue/no-spaces-around-equal-signs-in-attribute': 2,
    'vue/no-template-key': 2,
    'vue/no-textarea-mustache': 2,
    'vue/no-unused-components': 1,
    'vue/no-unused-vars': 1,
    'vue/no-v-html': 1,
    'vue/prop-name-casing': 2,
    'vue/require-default-prop': 2,
    'vue/require-prop-types': 2,
    'vue/require-valid-default-prop': 2,
    'vue/this-in-template': 2,
    'vue/v-bind-style': 2,
    'vue/v-on-style': 2,
    'vue/valid-template-root': 2,
    'vue/valid-v-bind': 2,
    'vue/valid-v-else-if': 2,
    'vue/valid-v-else': 2,
    'vue/valid-v-model': 2,
    'vue/valid-v-on': 2,
    'vue/singleline-html-element-content-newline': [
      1,
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea', 'span'],
      },
    ],
    'promise/always-return': 'error',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/catch-or-return': 'error',
    'promise/no-nesting': 'warn',
    'promise/no-callback-in-promise': 'warn',
    'promise/prefer-await-to-then': 'warn',
  },
}
