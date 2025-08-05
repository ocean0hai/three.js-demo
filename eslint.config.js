import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  unocss: true,
  vue: true,
  rules: {
    'vue/no-multiple-template-root': 'off',
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-setup-props-destructure': 'off',
    'vue/no-unused-vars': 'off',
    'vue/define-macros-order': 'off',
    'vue/use-v-on-event-modifiers': 'off',
    'vue/no-undef-components': 'off',
    'import/order': 'off',
    // TypeScript 规则
    '@typescript-eslint/no-explicit-any': 'off', // 允许使用any类型，方便开发
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'off', // 降级为警告
    '@typescript-eslint/no-unused-expressions': 'off', // 降级为警告
    '@typescript-eslint/consistent-type-imports': 'off', // 关闭强制使用type import
    '@typescript-eslint/no-import-type-side-effects': 'error',
    'quotes': 'off',

  },
})
