import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    rules: {
      'vue/multi-word-component-names': 'off'
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  }
]
