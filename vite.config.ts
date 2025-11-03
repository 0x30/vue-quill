import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    return {
      plugins: [vue(), vueJsx(), cssInjectedByJsPlugin()],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'VueQuill',
          fileName: format => `vue-quill.${format}.js`,
        },
        minify: true,
        cssMinify: true,
        cssCodeSplit: false,
        rollupOptions: {
          external: [
            'vue',
            'quill',
            'quill-resize-module',
            'quill-table-better',
          ],
          output: {
            globals: {
              vue: 'Vue',
              quill: 'Quill',
              'quill-resize-module': 'QuillResizeModule',
              'quill-table-better': 'QuillTableBetter',
            },
          },
        },
      },
    }
  }

  return {
    plugins: [vue(), vueJsx()],
  }
})
