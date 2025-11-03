<template>
  <div ref="editorRef" class="vue-quill-editor"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import type { VueQuillProps, VueQuillEmits, VueQuillInstance } from '../types'

// Props
const props = withDefaults(defineProps<VueQuillProps>(), {
  content: '',
  contentType: 'html',
  enable: true,
  readOnly: false,
  placeholder: '',
  theme: 'snow',
  toolbar: true,
  formats: () => [],
  modules: () => ({}),
  options: () => ({})
})

// Emits
const emit = defineEmits<VueQuillEmits>()

// Template refs
const editorRef = ref<HTMLElement>()

// State
let quill: Quill | null = null
let isUpdatingContent = false

// Methods
const initQuill = () => {
  if (!editorRef.value) return

  // Import bubble theme if needed
  if (props.theme === 'bubble') {
    import('quill/dist/quill.bubble.css')
  }

  const options = {
    theme: props.theme,
    placeholder: props.placeholder,
    readOnly: props.readOnly,
    modules: {
      toolbar: props.toolbar,
      ...props.modules
    },
    formats: props.formats?.length ? props.formats : undefined,
    ...props.options
  }

  quill = new Quill(editorRef.value, options)

  // Set initial content
  setContent(props.content, props.contentType, true)

  // Set enable state
  quill.enable(props.enable)

  // Bind events
  quill.on('text-change', (delta: any, oldDelta: any, source: string) => {
    if (!isUpdatingContent) {
      const content = getContent(props.contentType)
      emit('update:content', String(content))
      emit('textChange', delta, oldDelta, source)
      emit('editorChange', 'text-change', delta, oldDelta, source)
    }
  })

  quill.on('selection-change', (range: any, oldRange: any, source: string) => {
    emit('selectionChange', range, oldRange, source)
    emit('editorChange', 'selection-change', range, oldRange, source)
    
    if (range) {
      emit('focus', range, source)
    } else {
      emit('blur', oldRange, source)
    }
  })

  emit('ready', quill)
}

const getContent = (type: string = 'html'): string | any => {
  if (!quill) return ''
  
  switch (type) {
    case 'html':
      return quill.root.innerHTML
    case 'text':
      return quill.getText()
    case 'delta':
      return quill.getContents()
    default:
      return quill.root.innerHTML
  }
}

const setContent = (content: string | any, type: string = 'html', silent: boolean = false) => {
  if (!quill) return
  
  if (!silent) {
    isUpdatingContent = true
  }
  
  try {
    switch (type) {
      case 'html':
        quill.root.innerHTML = content
        break
      case 'text':
        quill.setText(content)
        break
      case 'delta':
        quill.setContents(content)
        break
      default:
        quill.root.innerHTML = content
    }
  } finally {
    if (!silent) {
      nextTick(() => {
        isUpdatingContent = false
      })
    }
  }
}

// Watch props changes
watch(() => props.content, (newContent) => {
  if (!isUpdatingContent && newContent !== getContent(props.contentType)) {
    setContent(newContent, props.contentType)
  }
})

watch(() => props.enable, (newEnable) => {
  if (quill) {
    quill.enable(newEnable)
  }
})

watch(() => props.readOnly, (newReadOnly) => {
  if (quill) {
    quill.enable(!newReadOnly)
  }
})

// Expose methods
const getQuill = () => quill
const getHTML = (): string => getContent('html') as string
const getText = (): string => getContent('text') as string
const getContents = () => getContent('delta')
const setHTML = (html: string) => setContent(html, 'html')
const setText = (text: string) => setContent(text, 'text')
const setContents = (delta: any) => setContent(delta, 'delta')

defineExpose<VueQuillInstance>({
  getQuill,
  getHTML,
  getText,
  getContents,
  setHTML,
  setText,
  setContents
})

// Lifecycle
onMounted(() => {
  nextTick(() => {
    initQuill()
  })
})

onUnmounted(() => {
  if (quill) {
    quill = null
  }
})
</script>

<style>
.vue-quill-editor {
  background: white;
}

.vue-quill-editor .ql-container {
  font-size: 16px;
}

.vue-quill-editor .ql-editor {
  min-height: 200px;
}

.vue-quill-editor .ql-editor.ql-blank::before {
  font-style: normal;
  color: #c0c4cc;
}
</style>
