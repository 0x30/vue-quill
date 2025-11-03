import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    return {
      plugins: [vue(), vueJsx()],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'VueQuill',
          fileName: (format) => `vue-quill.${format}.js`
        },
        rollupOptions: {
          external: ['vue', 'quill'],
          output: {
            globals: {
              vue: 'Vue',
              quill: 'Quill'
            }
          }
        }
      }
    }
  }
  
  return {
    plugins: [vue(), vueJsx()],
  }
})
