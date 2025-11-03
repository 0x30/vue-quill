# 🖊️ Vue Quill

A Vue 3 wrapper component for [Quill.js](https://quilljs.com/) - a powerful and flexible rich text editor.

## ✨ Features

- 📦 Easy integration with Vue 3
- 🎨 Multiple themes (Snow & Bubble)
- 🔧 Highly customizable toolbar
- 📝 Support for HTML, Text, and Delta formats
- 🎯 Full TypeScript support
- ⚡ Built with Vite
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

```vue
<VueQuill 
  :toolbar="[
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean'],
    ['link', 'image', 'video']
  ]"
/>
```

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

