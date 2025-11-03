<script setup lang="ts">
import { ref } from 'vue'
import VueQuill from './components/VueQuill'

const content = ref(
  '<p>Hello <strong>Vue Quill</strong>!</p><p>Start editing...</p>'
)
const readOnly = ref(false)
const theme = ref<'snow' | 'bubble'>('snow')
const enableCustomUpload = ref(true)
const enableImageResize = ref(true)

const onTextChange = (delta: any, oldDelta: any, source: string) => {
  console.log('Text changed:', { delta, oldDelta, source })
}

const onReady = (quill: any) => {
  console.log('Quill editor ready:', quill)
}

const onUpdateContent = (newContent: string) => {
  content.value = newContent
}

const clearContent = () => {
  content.value = ''
}

// 自定义图片上传方法 - 模拟上传到服务器
const customImageUploader = async (file: File): Promise<string> => {
  console.log('Uploading image:', file.name, file.size)

  // 模拟上传延迟
  await new Promise(resolve => setTimeout(resolve, 500))

  // 这里应该是实际的上传逻辑，例如：
  // const formData = new FormData();
  // formData.append('image', file);
  // const response = await fetch('/api/upload', {
  //   method: 'POST',
  //   body: formData
  // });
  // const data = await response.json();
  // return data.url;

  // 在 Demo 中，将图片转换为 Base64 格式
  // 实际项目中应该上传到服务器并返回 URL
  const url = URL.createObjectURL(file)
  return url
}

const setExampleContent = () => {
  content.value = `
    <h1>Vue Quill Editor Demo</h1>
    <p>This is a <strong>powerful</strong> and <em>flexible</em> rich text editor built with <u>Quill.js</u> and <u>Vue 3</u>.</p>
    <h2>✨ New Features</h2>
    <ul>
      <li>📸 Custom image uploader support</li>
      <li>� Paste images directly (Ctrl+V / Cmd+V)</li>
      <li>�🔄 Image resize capability - click and drag image corners!</li>
      <li>Rich text editing with formatting</li>
      <li>Multiple themes (Snow & Bubble)</li>
      <li>Customizable toolbar</li>
      <li>Full TypeScript support</li>
    </ul>
    <blockquote>
      "Try inserting an image using the toolbar button or paste an image from clipboard!"
    </blockquote>
    <p>Visit <a href="https://quilljs.com/" target="_blank">Quill.js official website</a> to learn more.</p>
  `
}
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>🖊️ Vue Quill Editor</h1>
      <p>A Vue 3 wrapper component for Quill.js rich text editor</p>
    </header>

    <div class="controls">
      <div class="control-group">
        <label class="checkbox-label">
          <input v-model="readOnly" type="checkbox" />
          Read Only Mode
        </label>
      </div>

      <div class="control-group">
        <label class="checkbox-label">
          <input v-model="enableCustomUpload" type="checkbox" />
          Custom Image Upload
        </label>
      </div>

      <div class="control-group">
        <label class="checkbox-label">
          <input v-model="enableImageResize" type="checkbox" />
          Enable Image Resize
        </label>
      </div>

      <div class="control-group">
        <label>Theme:</label>
        <select v-model="theme" class="theme-select">
          <option value="snow">Snow (default)</option>
          <option value="bubble">Bubble</option>
        </select>
      </div>

      <div class="control-group button-group">
        <button @click="setExampleContent" class="btn btn-primary">
          Load Example
        </button>
        <button @click="clearContent" class="btn btn-secondary">
          Clear Content
        </button>
      </div>
    </div>

    <div class="editor-wrapper">
      <h3>Editor:</h3>
      <div class="editor-container">
        <VueQuill
          :content="content"
          :theme="theme"
          :read-only="readOnly"
          :image-uploader="enableCustomUpload ? customImageUploader : undefined"
          :enable-image-resize="enableImageResize"
          placeholder="Start writing something amazing..."
          :on-text-change="onTextChange"
          :on-ready="onReady"
          :on-update-content="onUpdateContent"
        />
      </div>
    </div>

    <div class="output">
      <h3>Output (HTML):</h3>
      <pre><code>{{ content }}</code></pre>
    </div>

    <div class="documentation">
      <section class="doc-section">
        <h2>📦 Installation</h2>
        <p>Install directly from GitHub using pnpm, npm, or yarn:</p>
        <pre><code>pnpm install github:0x30/vue-quill
# or
npm install github:0x30/vue-quill
# or
yarn add github:0x30/vue-quill</code></pre>
      </section>

      <section class="doc-section">
        <h2>🚀 Basic Usage</h2>
        <pre><code>&lt;script setup&gt;
import { ref } from 'vue'
import { VueQuill } from 'vue-quill'
import 'quill/dist/quill.snow.css'

const content = ref('&lt;p&gt;Hello World!&lt;/p&gt;')

const onUpdateContent = (newContent: string) => {
  content.value = newContent
}
&lt;/script&gt;

&lt;template&gt;
  &lt;VueQuill :content="content" :on-update-content="onUpdateContent" /&gt;
&lt;/template&gt;</code></pre>
      </section>

      <section class="doc-section">
        <h2>⚙️ Props</h2>
        <ul class="props-list">
          <li><code>content</code> - Editor content (supports v-model)</li>
          <li>
            <code>contentType</code> - Content format: 'html' | 'text' | 'delta'
          </li>
          <li><code>theme</code> - Editor theme: 'snow' | 'bubble'</li>
          <li><code>readOnly</code> - Enable read-only mode</li>
          <li><code>placeholder</code> - Placeholder text</li>
          <li><code>toolbar</code> - Customize toolbar options</li>
          <li><code>modules</code> - Quill modules configuration</li>
          <li><code>formats</code> - Allowed formats array</li>
          <li>
            <code>imageUploader</code> - 🆕 Custom image upload function (file:
            File) => Promise&lt;string&gt;
          </li>
          <li>
            <code>enableImageResize</code> - 🆕 Enable image resize (default:
            true)
          </li>
        </ul>
      </section>

      <section class="doc-section">
        <h2>📸 Custom Image Upload Example</h2>
        <p>
          The custom image uploader works for both toolbar button clicks and
          pasted images!
        </p>
        <pre><code>&lt;script setup&gt;
const content = ref('')
const onUpdateContent = (newContent: string) => {
  content.value = newContent
}

const customImageUploader = async (file: File): Promise&lt;string&gt; => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  return data.url; // Return the image URL
};
&lt;/script&gt;

&lt;template&gt;
  &lt;VueQuill 
    :content="content"
    :on-update-content="onUpdateContent"
    :image-uploader="customImageUploader"
    :enable-image-resize="true"
  /&gt;
&lt;/template&gt;</code></pre>
        <div
          style="
            margin-top: 15px;
            padding: 15px;
            background: #fff3cd;
            border-radius: 6px;
            border-left: 4px solid #ffc107;
          "
        >
          <strong>💡 Tip:</strong> Try pasting an image from your clipboard
          (Ctrl+V / Cmd+V) - it will automatically trigger the custom uploader!
        </div>
      </section>

      <section class="doc-section">
        <h2>📡 Callbacks</h2>
        <ul class="props-list">
          <li>
            <code>onUpdateContent</code> - 🆕 Callback when content changes
            (replaces v-model)
          </li>
          <li><code>onTextChange</code> - Callback on text change</li>
          <li><code>onSelectionChange</code> - Callback on selection change</li>
          <li><code>onReady</code> - Callback when editor is ready</li>
          <li><code>onFocus</code> - Callback when editor gains focus</li>
          <li><code>onBlur</code> - Callback when editor loses focus</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 40px;
  padding: 20px;
}

.header h1 {
  font-size: 3rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.header p {
  font-size: 1.2rem;
  opacity: 0.95;
}

.controls {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
  align-items: center;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.control-group label {
  font-weight: 600;
  color: #333;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.checkbox-label input[type='checkbox'] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.theme-select {
  padding: 8px 12px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.theme-select:focus {
  outline: none;
  border-color: #667eea;
}

.button-group {
  margin-left: auto;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5568d3;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
}

.btn-secondary {
  background: #f1f1f1;
  color: #333;
}

.btn-secondary:hover {
  background: #e0e0e0;
  transform: translateY(-1px);
}

.editor-wrapper {
  margin-bottom: 30px;
}

.editor-wrapper h3 {
  color: white;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.editor-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.output {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.output h3 {
  color: #333;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.output pre {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  border-left: 4px solid #667eea;
}

.output code {
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #2d3748;
}

.documentation {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.doc-section {
  margin-bottom: 35px;
}

.doc-section:last-child {
  margin-bottom: 0;
}

.doc-section h2 {
  color: #667eea;
  margin-bottom: 15px;
  font-size: 1.5rem;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
}

.doc-section p {
  color: #555;
  line-height: 1.8;
  margin-bottom: 15px;
}

.doc-section pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 15px 0;
}

.doc-section code {
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.6;
}

.props-list {
  list-style: none;
  padding: 0;
}

.props-list li {
  padding: 12px;
  background: #f8f9fa;
  margin-bottom: 8px;
  border-radius: 6px;
  border-left: 3px solid #667eea;
}

.props-list code {
  background: #e2e8f0;
  padding: 2px 8px;
  border-radius: 4px;
  color: #667eea;
  font-weight: 600;
  font-size: 14px;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .controls {
    flex-direction: column;
    align-items: stretch;
  }

  .button-group {
    margin-left: 0;
    display: flex;
    gap: 10px;
  }

  .button-group .btn {
    flex: 1;
  }
}
</style>
