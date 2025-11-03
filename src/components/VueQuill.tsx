import { defineComponent, ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize'
import type { VueQuillInstance } from '../types'
import './VueQuill.css'

// Register image resize module
Quill.register('modules/imageResize', ImageResize)

export default defineComponent({
  name: 'VueQuill',
  props: {
    content: {
      type: String,
      default: ''
    },
    contentType: {
      type: String as () => 'delta' | 'html' | 'text',
      default: 'html'
    },
    enable: {
      type: Boolean,
      default: true
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    theme: {
      type: String as () => 'snow' | 'bubble' | string,
      default: 'snow'
    },
    toolbar: {
      type: [String, Array, Object, Boolean],
      default: true
    },
    formats: {
      type: Array as () => string[],
      default: () => []
    },
    modules: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Object,
      default: () => ({})
    },
    imageUploader: {
      type: Function as unknown as () => (file: File) => Promise<string>,
      default: undefined
    },
    enableImageResize: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:content', 'textChange', 'selectionChange', 'editorChange', 'focus', 'blur', 'ready'],
  setup(props, { emit, expose }) {
    const editorRef = ref<HTMLElement>()
    let quill: Quill | null = null
    let isUpdatingContent = false

    // Custom image upload handler
    const selectLocalImage = () => {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.click()

      input.onchange = async () => {
        const file = input.files?.[0]
        if (file && quill && props.imageUploader) {
          await uploadImage(file)
        }
      }
    }

    // Upload image helper
    const uploadImage = async (file: File) => {
      if (!quill || !props.imageUploader) return
      
      const range = quill.getSelection(true)
      
      try {
        // Show loading state
        const loadingGif = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxOCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2NjIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4='
        quill.insertEmbed(range.index, 'image', loadingGif)
        quill.setSelection(range.index + 1, 0)
        
        // Upload image and get URL
        const imageUrl = await props.imageUploader(file)
        
        // Replace loading with actual image
        quill.deleteText(range.index, 1)
        quill.insertEmbed(range.index, 'image', imageUrl)
        quill.setSelection(range.index + 1, 0)
      } catch (error) {
        console.error('Image upload failed:', error)
        quill.deleteText(range.index, 1)
      }
    }

    // Handle paste event for images
    const handlePaste = (e: ClipboardEvent) => {
      if (!props.imageUploader || !quill) return

      const clipboardData = e.clipboardData
      if (!clipboardData) return

      const items = clipboardData.items
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        
        if (item && item.type.indexOf('image') !== -1) {
          e.preventDefault()
          
          const file = item.getAsFile()
          if (file) {
            uploadImage(file)
          }
          break
        }
      }
    }

    // Methods
    const initQuill = async () => {
      if (!editorRef.value) return

      // Import bubble theme if needed
      if (props.theme === 'bubble') {
        import('quill/dist/quill.bubble.css')
      }

      // Setup image resize module if enabled
      const modules: any = {
        toolbar: props.toolbar,
        ...props.modules
      }

      if (props.enableImageResize) {
        modules.imageResize = {
          modules: ['Resize', 'DisplaySize']
        }
      }

      const options = {
        theme: props.theme,
        placeholder: props.placeholder,
        readOnly: props.readOnly,
        modules,
        formats: props.formats?.length ? props.formats : undefined,
        ...props.options
      }

      quill = new Quill(editorRef.value, options)

      // Setup custom image uploader if provided
      if (props.imageUploader) {
        const toolbar: any = quill.getModule('toolbar')
        if (toolbar) {
          toolbar.addHandler('image', () => {
            selectLocalImage()
          })
        }
        
        // Add paste event listener for images
        const editor = quill.root
        editor.addEventListener('paste', handlePaste)
      }

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

    expose<VueQuillInstance>({
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
        // Remove paste event listener
        if (props.imageUploader) {
          const editor = quill.root
          editor.removeEventListener('paste', handlePaste)
        }
        quill = null
      }
    })

    return () => (
      <div ref={editorRef} class="vue-quill-editor"></div>
    )
  }
})
