import antfu from '@antfu/eslint-config'

// export default antfu({
//   formatters: true,
//   vue: true,
// })

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    formatters: true,
    vue: true,
  })
)
