import type Quill from 'quill'

// Resize module configuration types
export interface ResizeParchmentConfig {
  attribute?: string[]
  limit?: {
    minWidth?: number
    minHeight?: number
    maxWidth?: number
    maxHeight?: number
    ratio?: number
  }
}

export interface ResizeModuleConfig {
  modules?: string[]
  keyboardSelect?: boolean
  selectedClass?: string
  activeClass?: string
  embedTags?: string[]
  tools?: string[]
  parchment?: {
    image?: ResizeParchmentConfig
    video?: ResizeParchmentConfig
    [key: string]: ResizeParchmentConfig | undefined
  }
  onActive?: (blot: any, target: HTMLElement) => void
  onInactive?: (blot: any, target: HTMLElement) => void
  onChangeSize?: (
    blot: any,
    target: HTMLElement,
    size: { width: number; height: number }
  ) => void
}

// Toolbar configuration types
export type ToolbarHandler =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strike'
  | 'blockquote'
  | 'code-block'
  | 'code'
  | 'header'
  | 'list'
  | 'script'
  | 'indent'
  | 'direction'
  | 'size'
  | 'color'
  | 'background'
  | 'font'
  | 'align'
  | 'link'
  | 'image'
  | 'video'
  | 'formula'
  | 'clean'

export type ToolbarConfig =
  | boolean
  | string
  | Array<string | { [key: string]: any }>
  | Array<Array<string | { [key: string]: any }>>
  | {
      container?:
        | string
        | string[]
        | Array<string | { [key: string]: any }>
        | Array<Array<string | { [key: string]: any }>>
      handlers?: { [key: string]: Function }
    }

export interface VueQuillProps {
  content?: string
  contentType?: 'delta' | 'html' | 'text'
  enable?: boolean
  readOnly?: boolean
  placeholder?: string
  theme?: 'snow' | 'bubble' | string
  toolbar?: ToolbarConfig
  formats?: string[]
  modules?: Record<string, any>
  options?: Record<string, any>
  imageUploader?: (file: File) => Promise<string>
  fileUploader?: (file: File) => Promise<string>
  enableImageResize?: boolean
  resizeModuleConfig?: ResizeModuleConfig
  onUpdateContent?: (content: string) => void
  onTextChange?: (delta: any, oldDelta: any, source: string) => void
  onSelectionChange?: (range: any, oldRange: any, source: string) => void
  onEditorChange?: (eventName: string, ...args: any[]) => void
  onFocus?: (range: any, source: string) => void
  onBlur?: (previousRange: any, source: string) => void
  onReady?: (quill: Quill) => void
}

export interface VueQuillInstance {
  getQuill: () => Quill | null
  getHTML: () => string
  getText: () => string
  getContents: () => any
  setHTML: (html: string) => void
  setText: (text: string) => void
  setContents: (delta: any) => void
}
