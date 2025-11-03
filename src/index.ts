import VueQuill from './components/VueQuill'
import type { App } from 'vue'

export { VueQuill }

export default {
  install(app: App) {
    app.component('VueQuill', VueQuill)
  }
}

export * from './types'
export type { FileData } from './components/FileBlot'
