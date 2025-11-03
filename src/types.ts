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
}

export interface VueQuillEmits {
  'update:content': [content: string]
  'textChange': [delta: any, oldDelta: any, source: string]
  'selectionChange': [range: any, oldRange: any, source: string]
  'editorChange': [eventName: string, ...args: any[]]
  'focus': [range: any, source: string]
  'blur': [previousRange: any, source: string]
  'ready': [quill: Quill]
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
