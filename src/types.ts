import type Quill from 'quill'

export interface VueQuillProps {
  content?: string
  contentType?: 'delta' | 'html' | 'text'
  enable?: boolean
  readOnly?: boolean
  placeholder?: string
  theme?: 'snow' | 'bubble' | string
  toolbar?: string | string[] | object | boolean
  formats?: string[]
  modules?: Record<string, any>
  options?: Record<string, any>
  imageUploader?: (file: File) => Promise<string>
  enableImageResize?: boolean
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
