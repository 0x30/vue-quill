import {
  defineComponent,
  ref,
  onMounted,
  onUnmounted,
  watch,
  nextTick,
} from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import Resize from 'quill-resize-module'
import type { VueQuillInstance, ResizeModuleConfig } from '../types'
import styles from './VueQuill.module.scss'

// Custom Image format to support blob URLs
const ImageFormat = Quill.import('formats/image') as any

class MyImage extends ImageFormat {
  static sanitize(url: string) {
    return super.sanitize(url, ['http', 'https', 'data', 'blob']) ? url : '//:0'
  }
}

Quill.register('formats/image', MyImage)

// Register resize module
Quill.register('modules/resize', Resize)

export default defineComponent({
  name: 'VueQuill',
  props: {
    content: {
      type: String,
      default: '',
    },
    contentType: {
      type: String as () => 'delta' | 'html' | 'text',
      default: 'html',
    },
    enable: {
      type: Boolean,
      default: true,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    theme: {
      type: String as () => 'snow' | 'bubble' | string,
      default: 'snow',
    },
    toolbar: {
      type: [String, Array, Object, Boolean],
      default: true,
    },
    formats: {
      type: Array as () => string[],
      default: () => [],
    },
    modules: {
      type: Object,
      default: () => ({}),
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    imageUploader: {
      type: Function as unknown as () => (file: File) => Promise<string>,
      default: undefined,
    },
    enableImageResize: {
      type: Boolean,
      default: true,
    },
    resizeModuleConfig: {
      type: Object as () => ResizeModuleConfig,
      default: undefined,
    },
    onUpdateContent: {
      type: Function as unknown as () => (content: string) => void,
      default: undefined,
    },
    onTextChange: {
      type: Function as unknown as () => (
        delta: any,
        oldDelta: any,
        source: string
      ) => void,
      default: undefined,
    },
    onSelectionChange: {
      type: Function as unknown as () => (
        range: any,
        oldRange: any,
        source: string
      ) => void,
      default: undefined,
    },
    onEditorChange: {
      type: Function as unknown as () => (
        eventName: string,
        ...args: any[]
      ) => void,
      default: undefined,
    },
    onFocus: {
      type: Function as unknown as () => (range: any, source: string) => void,
      default: undefined,
    },
    onBlur: {
      type: Function as unknown as () => (
        previousRange: any,
        source: string
      ) => void,
      default: undefined,
    },
    onReady: {
      type: Function as unknown as () => (quill: Quill) => void,
      default: undefined,
    },
  },
  setup(props, { expose }) {
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

      // Insert uploading placeholder
      const uploadingText = `[Uploading "${file.name}"...]`
      quill.insertText(range.index, uploadingText, 'user')
      quill.setSelection(range.index + uploadingText.length, 0)

      try {
        // Upload image and get URL
        const imageUrl = await props.imageUploader(file)

        // Remove the uploading text
        quill.deleteText(range.index, uploadingText.length, 'user')

        console.log('imageUrl', imageUrl)

        // Insert the actual image
        quill.insertEmbed(range.index, 'image', imageUrl, 'user')
        quill.setSelection(range.index + 1, 0)
      } catch (error) {
        console.error('Image upload failed:', error)
        // Remove uploading text on error
        quill.deleteText(range.index, uploadingText.length, 'user')
        // Insert error message
        quill.insertText(
          range.index,
          `[Failed to upload "${file.name}"]`,
          'user'
        )
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
          // Prevent default paste behavior
          e.preventDefault()
          e.stopPropagation()

          const file = item.getAsFile()
          if (file) {
            // Wait a tick to ensure Quill doesn't insert anything
            setTimeout(() => {
              uploadImage(file)
            }, 0)
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

      // Setup modules
      const modules: any = {
        toolbar: props.toolbar,
        ...props.modules,
      }

      // Setup resize module if enabled
      if (props.enableImageResize) {
        const defaultResizeConfig: ResizeModuleConfig = {
          modules: ['DisplaySize', 'Toolbar', 'Resize', 'Keyboard'],
          keyboardSelect: true,
          selectedClass: 'selected',
          activeClass: 'active',
          embedTags: ['IMG', 'VIDEO', 'IFRAME'],
          tools: ['left', 'center', 'right', 'full', 'edit'],
          parchment: {
            image: {
              attribute: ['width'],
              limit: {
                minWidth: 100,
              },
            },
            video: {
              attribute: ['width', 'height'],
              limit: {
                minWidth: 200,
                ratio: 0.5625, // 16:9
              },
            },
          },
        }

        // Merge with user provided config
        modules.resize = props.resizeModuleConfig 
          ? { ...defaultResizeConfig, ...props.resizeModuleConfig }
          : defaultResizeConfig
      }

      const options = {
        theme: props.theme,
        placeholder: props.placeholder,
        readOnly: props.readOnly,
        modules,
        formats: props.formats?.length ? props.formats : undefined,
        ...props.options,
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

        // Add paste event listener for images (use capture phase to intercept before Quill)
        const editor = quill.root
        editor.addEventListener('paste', handlePaste, true)
      }

      // Set initial content
      setContent(props.content, props.contentType, true)

      // Set enable state
      quill.enable(props.enable)

      // Bind events
      quill.on('text-change', (delta: any, oldDelta: any, source: string) => {
        if (!isUpdatingContent) {
          const content = getContent(props.contentType)
          props.onUpdateContent?.(String(content))
          props.onTextChange?.(delta, oldDelta, source)
          props.onEditorChange?.('text-change', delta, oldDelta, source)
        }
      })

      quill.on(
        'selection-change',
        (range: any, oldRange: any, source: string) => {
          props.onSelectionChange?.(range, oldRange, source)
          props.onEditorChange?.('selection-change', range, oldRange, source)

          if (range) {
            props.onFocus?.(range, source)
          } else {
            props.onBlur?.(oldRange, source)
          }
        }
      )

      props.onReady?.(quill)
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

    const setContent = (
      content: string | any,
      type: string = 'html',
      silent: boolean = false
    ) => {
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
    watch(
      () => props.content,
      newContent => {
        if (
          !isUpdatingContent &&
          newContent !== getContent(props.contentType)
        ) {
          setContent(newContent, props.contentType)
        }
      }
    )

    watch(
      () => props.enable,
      newEnable => {
        if (quill) {
          quill.enable(newEnable)
        }
      }
    )

    watch(
      () => props.readOnly,
      newReadOnly => {
        if (quill) {
          quill.enable(!newReadOnly)
        }
      }
    )

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
      setContents,
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
          editor.removeEventListener('paste', handlePaste, true)
        }
        quill = null
      }
    })

    return () => <div ref={editorRef} class={styles.vueQuillEditor}></div>
  },
})
