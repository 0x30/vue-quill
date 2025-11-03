import Quill from 'quill'
import styles from './FileBlot.module.scss'

const BlockEmbed = Quill.import('blots/block/embed') as any

// Register file icon for Quill toolbar
const icons = Quill.import('ui/icons') as any
icons['file'] = `
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
  <polyline points="14 2 14 8 20 8"></polyline>
  <line x1="12" y1="18" x2="12" y2="12"></line>
  <line x1="9" y1="15" x2="15" y2="15"></line>
</svg>
`

export interface FileData {
  name: string
  size: number
  url: string
  type?: string
}

class FileBlot extends BlockEmbed {
  static blotName = 'file'
  static tagName = 'div'
  static className = styles.fileBlock!

  static create(value: FileData) {
    const node = super.create() as HTMLDivElement
    node.setAttribute('contenteditable', 'false')
    node.classList.add(styles.fileBlock!)

    // Add data-type attribute for styling
    if (value.type) {
      node.setAttribute('data-type', value.type)
    }

    // Create file container
    const container = document.createElement('div')
    container.classList.add(styles.fileContainer!)

    // Icon based on file type
    const icon = document.createElement('div')
    icon.classList.add(styles.fileIcon!)
    icon.innerHTML = this.getFileIcon(value.type || value.name)

    // File info
    const info = document.createElement('div')
    info.classList.add(styles.fileInfo!)

    const name = document.createElement('div')
    name.classList.add(styles.fileName!)
    name.textContent = value.name
    name.setAttribute('title', value.name)

    const size = document.createElement('div')
    size.classList.add(styles.fileSize!)
    size.textContent = this.formatFileSize(value.size)

    info.appendChild(name)
    info.appendChild(size)

    // Download button
    const downloadBtn = document.createElement('a')
    downloadBtn.classList.add(styles.fileDownload!)
    downloadBtn.href = value.url
    downloadBtn.download = value.name
    downloadBtn.setAttribute('target', '_blank')
    downloadBtn.setAttribute('title', 'Download file')
    downloadBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    `

    // Prevent default click behavior on container
    container.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()
    })

    container.appendChild(icon)
    container.appendChild(info)
    container.appendChild(downloadBtn)

    node.appendChild(container)

    // Store data
    node.dataset.name = value.name
    node.dataset.size = value.size.toString()
    node.dataset.url = value.url
    if (value.type) {
      node.dataset.type = value.type
    }

    return node
  }

  static value(node: HTMLDivElement): FileData {
    return {
      name: node.dataset.name || '',
      size: parseInt(node.dataset.size || '0'),
      url: node.dataset.url || '',
      type: node.dataset.type,
    }
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  static getFileIcon(typeOrName: string): string {
    const type = typeOrName.toLowerCase()

    // PDF files
    if (type.includes('pdf')) {
      return `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="9" y1="15" x2="15" y2="15"></line>
          <line x1="9" y1="18" x2="15" y2="18"></line>
        </svg>
      `
    }

    // Image files
    if (
      type.includes('image') ||
      /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(type)
    ) {
      return `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      `
    }

    // Video files
    if (type.includes('video') || /\.(mp4|avi|mov|wmv|flv|mkv)$/i.test(type)) {
      return `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polygon points="23 7 16 12 23 17 23 7"></polygon>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
        </svg>
      `
    }

    // Audio files
    if (type.includes('audio') || /\.(mp3|wav|ogg|m4a|flac)$/i.test(type)) {
      return `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
      `
    }

    // Archive files
    if (
      type.includes('zip') ||
      type.includes('rar') ||
      type.includes('7z') ||
      /\.(zip|rar|7z|tar|gz)$/i.test(type)
    ) {
      return `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="21 8 21 21 3 21 3 8"></polyline>
          <rect x="1" y="3" width="22" height="5"></rect>
          <line x1="10" y1="12" x2="14" y2="12"></line>
        </svg>
      `
    }

    // Text/Code files
    if (
      type.includes('text') ||
      /\.(txt|md|json|xml|html|css|js|ts|py|java|c|cpp)$/i.test(type)
    ) {
      return `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      `
    }

    // Excel/Spreadsheet files
    if (
      type.includes('spreadsheet') ||
      type.includes('excel') ||
      /\.(xls|xlsx|csv)$/i.test(type)
    ) {
      return `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="8" y1="13" x2="16" y2="13"></line>
          <line x1="8" y1="17" x2="16" y2="17"></line>
          <line x1="12" y1="9" x2="12" y2="21"></line>
        </svg>
      `
    }

    // Word/Document files
    if (
      type.includes('word') ||
      type.includes('document') ||
      /\.(doc|docx)$/i.test(type)
    ) {
      return `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      `
    }

    // Default file icon
    return `
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
        <polyline points="13 2 13 9 20 9"></polyline>
      </svg>
    `
  }
}

export default FileBlot
