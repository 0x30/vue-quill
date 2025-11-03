# 🖊️ Vue Quill

A Vue 3 wrapper component for [Quill.js](https://quilljs.com/) - a powerful and flexible rich text editor.

## ✨ Features

- 📦 Easy integration with Vue 3
- 🎨 Multiple themes (Snow & Bubble)
- 🔧 Highly customizable toolbar
- 📝 Support for HTML, Text, and Delta formats
- 🎯 Full TypeScript support
- ⚡ Built with Vite and JSX/TSX
- 📸 **Custom image uploader support**
- 🔄 **Image resize capability**
- 🎪 Complete example demo included

## 📦 Installation

Install directly from GitHub:

```bash
pnpm install github:0x30/vue-quill
# or
npm install github:0x30/vue-quill
# or
yarn add github:0x30/vue-quill
```

## 🚀 Quick Start

### Basic Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VueQuill } from 'vue-quill'
import 'quill/dist/quill.snow.css'

const content = ref('<p>Hello World!</p>')
</script>

<template>
  <VueQuill v-model:content="content" />
</template>
```

### With Options

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VueQuill } from 'vue-quill'
import 'quill/dist/quill.snow.css'

const content = ref('')
const editorRef = ref()

const onReady = (quill: any) => {
  console.log('Editor ready:', quill)
}

const onTextChange = (delta: any, oldDelta: any, source: string) => {
  console.log('Text changed:', delta)
}

// Access Quill instance methods
const getHTML = () => {
  return editorRef.value?.getHTML()
}
</script>

<template>
  <VueQuill 
    ref="editorRef"
    v-model:content="content"
    theme="snow"
    placeholder="Start writing..."
    :read-only="false"
    @ready="onReady"
    @text-change="onTextChange"
  />
</template>
```

### 📸 Custom Image Upload

You can provide a custom image uploader function that uploads images to your server instead of using base64:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VueQuill } from 'vue-quill'
import 'quill/dist/quill.snow.css'

const content = ref('')

// Custom image uploader - upload to your server
const customImageUploader = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('image', file)
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  })
  
  const data = await response.json()
  return data.url // Return the uploaded image URL
}
</script>

<template>
  <VueQuill 
    v-model:content="content"
    :image-uploader="customImageUploader"
    :enable-image-resize="true"
  />
</template>
```

## 📖 API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | `''` | Editor content (supports v-model) |
| `contentType` | `'html' \| 'text' \| 'delta'` | `'html'` | Content format |
| `theme` | `'snow' \| 'bubble' \| string` | `'snow'` | Editor theme |
| `readOnly` | `boolean` | `false` | Enable read-only mode |
| `enable` | `boolean` | `true` | Enable/disable editor |
| `placeholder` | `string` | `''` | Placeholder text |
| `toolbar` | `string \| string[] \| object \| boolean` | `true` | Toolbar configuration |
| `modules` | `Record<string, any>` | `{}` | Quill modules |
| `formats` | `string[]` | `[]` | Allowed formats |
| `options` | `Record<string, any>` | `{}` | Additional Quill options |
| `imageUploader` | `(file: File) => Promise<string>` | `undefined` | Custom image upload function |
| `enableImageResize` | `boolean` | `true` | Enable image resize capability |
| `resizeModuleConfig` | `ResizeModuleConfig` | `undefined` | Advanced resize module configuration |

### Events

| Event | Parameters | Description |
|-------|-----------|-------------|
| `update:content` | `(content: string)` | Emitted when content changes |
| `text-change` | `(delta, oldDelta, source)` | Emitted on text change |
| `selection-change` | `(range, oldRange, source)` | Emitted on selection change |
| `editor-change` | `(eventName, ...args)` | Emitted on any editor change |
| `focus` | `(range, source)` | Emitted when editor gains focus |
| `blur` | `(previousRange, source)` | Emitted when editor loses focus |
| `ready` | `(quill)` | Emitted when editor is ready |

### Exposed Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getQuill()` | `Quill \| null` | Get Quill instance |
| `getHTML()` | `string` | Get content as HTML |
| `getText()` | `string` | Get content as plain text |
| `getContents()` | `Delta` | Get content as Delta |
| `setHTML(html)` | `void` | Set content from HTML |
| `setText(text)` | `void` | Set content from text |
| `setContents(delta)` | `void` | Set content from Delta |

## 🎨 Themes

### Snow Theme (Default)

```vue
<VueQuill theme="snow" />
```

Don't forget to import the Snow theme CSS:
```js
import 'quill/dist/quill.snow.css'
```

### Bubble Theme

```vue
<VueQuill theme="bubble" />
```

Import the Bubble theme CSS:
```js
import 'quill/dist/quill.bubble.css'
```

## 🔧 Custom Toolbar

You can customize the toolbar with various options:

### Full Toolbar Example

```vue
<VueQuill 
  :toolbar="[
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ align: [] }],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
    ['clean']
  ]"
/>
```

### Available Toolbar Options

**Text Formatting:**
- `bold` - Bold text
- `italic` - Italic text
- `underline` - Underline text
- `strike` - Strikethrough text
- `code` - Inline code

**Headers:**
- `{ header: [1, 2, 3, 4, 5, 6, false] }` - Header levels

**Lists:**
- `{ list: 'ordered' }` - Numbered list
- `{ list: 'bullet' }` - Bullet list
- `{ list: 'check' }` - Checklist

**Text Style:**
- `{ font: [] }` - Font family
- `{ size: [] }` - Font size
- `{ color: [] }` - Text color
- `{ background: [] }` - Background color

**Alignment:**
- `{ align: [] }` - Text alignment

**Indentation:**
- `{ indent: '-1' }` - Decrease indent
- `{ indent: '+1' }` - Increase indent

**Script:**
- `{ script: 'sub' }` - Subscript
- `{ script: 'super' }` - Superscript

**Blocks:**
- `blockquote` - Blockquote
- `code-block` - Code block

**Media:**
- `link` - Insert link
- `image` - Insert image
- `video` - Insert video
- `formula` - Insert formula (requires formula module)

**Other:**
- `{ direction: 'rtl' }` - Text direction (RTL/LTR)
- `clean` - Remove formatting

## 📸 Image Upload & Resize

### Custom Image Uploader

By default, Quill converts images to base64. You can provide a custom uploader to upload images to your server:

```typescript
const imageUploader = async (file: File): Promise<string> => {
  // Upload to your server
  const formData = new FormData()
  formData.append('image', file)
  
  const response = await fetch('https://your-api.com/upload', {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': 'Bearer YOUR_TOKEN'
    }
  })
  
  const data = await response.json()
  return data.imageUrl // Must return the image URL
}
```

**Features:**
- 🖱️ Click the image button in toolbar to select and upload
- 📋 **Paste images directly from clipboard** (Ctrl+V / Cmd+V)
- ⬆️ Automatic upload with loading state
- 🔄 Error handling with automatic rollback

### Image Resize

Images can be resized by clicking and dragging the corners. This feature is enabled by default but can be disabled:

```vue
<VueQuill 
  :enable-image-resize="false"
/>
```

#### Advanced Resize Configuration

You can customize the resize behavior with detailed configuration:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VueQuill } from 'vue-quill'
import type { ResizeModuleConfig } from 'vue-quill'

const resizeConfig: ResizeModuleConfig = {
  // Enable feature modules
  modules: ['DisplaySize', 'Toolbar', 'Resize', 'Keyboard'],
  
  // Enable keyboard arrow keys for selection
  keyboardSelect: true,
  
  // CSS classes for selected and active states
  selectedClass: 'selected',
  activeClass: 'active',
  
  // Resizable embedded tags
  embedTags: ['IMG', 'VIDEO', 'IFRAME'],
  
  // Toolbar buttons
  tools: ['left', 'center', 'right', 'full', 'edit'],
  
  // Parchment configuration: set attributes and limits
  parchment: {
    // Image configuration
    image: {
      attribute: ['width'],  // Adjustable attributes
      limit: {
        minWidth: 100,       // Minimum width limit
        maxWidth: 800        // Maximum width limit
      }
    },
    // Video configuration
    video: {
      attribute: ['width', 'height'],
      limit: {
        minWidth: 200,
        ratio: 0.5625        // Width/height ratio (16:9)
      }
    }
  },
  
  // Event callbacks
  onActive: (blot, target) => {
    console.log('Element activated:', blot, target)
  },
  onInactive: (blot, target) => {
    console.log('Element deactivated:', blot, target)
  },
  onChangeSize: (blot, target, size) => {
    console.log('Size changed:', size)
  }
}
</script>

<template>
  <VueQuill 
    :enable-image-resize="true"
    :resize-module-config="resizeConfig"
  />
</template>
```

**Resize Module Features:**
- 📏 **DisplaySize**: Show current element dimensions
- 🔧 **Toolbar**: Alignment and edit tools
- 🔄 **Resize**: Drag to resize functionality
- ⌨️ **Keyboard**: Arrow keys for adjusting size
- 🎯 **Parchment**: Set min/max limits and aspect ratios

## 💻 Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build library
pnpm build:lib

# Build demo
pnpm build
```

## 📝 Example

Run the development server to see a complete example:

```bash
pnpm dev
```

The example demonstrates:
- Basic editor usage
- Theme switching
- Read-only mode
- Content manipulation
- Event handling
- All available features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT

## 🔗 Links

- [Quill.js Official Site](https://quilljs.com/)
- [Quill.js Documentation](https://quilljs.com/docs/)
- [Vue 3 Documentation](https://vuejs.org/)

## ⭐ Show your support

Give a ⭐️ if this project helped you!

