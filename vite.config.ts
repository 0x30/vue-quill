import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    return {
      plugins: [
        vue(),
        vueJsx(),
        dts({
          insertTypesEntry: true,
          tsconfigPath: './tsconfig.app.json',
          outDir: 'dist',
          rollupTypes: true,
          include: ['lib/index.ts', 'src/**/*'],
        }),
        cssInjectedByJsPlugin(),
      ],
      build: {
        copyPublicDir: false,
        lib: {
          entry: resolve(__dirname, 'lib/index.ts'),
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
            // 移除所有注释
            banner: undefined,
            footer: undefined,
          },
        },
      },
      esbuild: {
        legalComments: 'none', // 移除所有注释（包括 license 注释）
        drop: ['console', 'debugger'], // 移除 console 和 debugger
      },
    }
  }

  return {
    plugins: [vue(), vueJsx()],
  }
})
