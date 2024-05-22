// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
// import stylistic from '@stylistic/eslint-plugin'

export default withNuxt(
  // Your custom configs here
  // {
  //   plugins: {
  //     '@stylistic': stylistic
  //   },
  // }
  {
    ignores: ['components/ui'],
  },
  {
    rules: {
      'vue/block-order': ['warn', {
        order: ['script', 'template', 'style'],
      }],
      'vue/define-macros-order': ['warn', {
        order: ['defineOptions', 'defineModel', 'defineProps', 'defineEmits', 'defineSlots'],
        defineExposeLast: true,
      }],
    },
  },
)
