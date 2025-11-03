import { defineComponent as M, ref as _, watch as C, onMounted as U, nextTick as T, onUnmounted as F, createVNode as E } from "vue";
import h from "quill";
import L from "quill-resize-module";
import k from "quill-table-better";
import { default as re } from "quill-table-better";
const S = "_fileBlock_gicnx_1", I = "_fileContainer_gicnx_8", H = "_fileIcon_gicnx_24", D = "_fileInfo_gicnx_42", A = "_fileName_gicnx_47", Q = "_fileSize_gicnx_57", $ = "_fileDownload_gicnx_63", g = {
  fileBlock: S,
  fileContainer: I,
  fileIcon: H,
  fileInfo: D,
  fileName: A,
  fileSize: Q,
  fileDownload: $
}, V = h.import("blots/block/embed"), N = h.import("ui/icons");
N.file = `
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
  <polyline points="14 2 14 8 20 8"></polyline>
  <line x1="12" y1="18" x2="12" y2="12"></line>
  <line x1="9" y1="15" x2="15" y2="15"></line>
</svg>
`;
class O extends V {
  static blotName = "file";
  static tagName = "div";
  static className = g.fileBlock;
  static create(l) {
    const i = super.create();
    i.setAttribute("contenteditable", "false"), i.classList.add(g.fileBlock), l.type && i.setAttribute("data-type", l.type);
    const t = document.createElement("div");
    t.classList.add(g.fileContainer);
    const d = document.createElement("div");
    d.classList.add(g.fileIcon), d.innerHTML = this.getFileIcon(l.type || l.name);
    const p = document.createElement("div");
    p.classList.add(g.fileInfo);
    const x = document.createElement("div");
    x.classList.add(g.fileName), x.textContent = l.name, x.setAttribute("title", l.name);
    const m = document.createElement("div");
    m.classList.add(g.fileSize), m.textContent = this.formatFileSize(l.size), p.appendChild(x), p.appendChild(m);
    const u = document.createElement("a");
    return u.classList.add(g.fileDownload), u.href = l.url, u.download = l.name, u.setAttribute("target", "_blank"), u.setAttribute("title", "Download file"), u.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    `, t.addEventListener("click", (b) => {
      b.preventDefault(), b.stopPropagation();
    }), t.appendChild(d), t.appendChild(p), t.appendChild(u), i.appendChild(t), i.dataset.name = l.name, i.dataset.size = l.size.toString(), i.dataset.url = l.url, l.type && (i.dataset.type = l.type), i;
  }
  static value(l) {
    return {
      name: l.dataset.name || "",
      size: parseInt(l.dataset.size || "0"),
      url: l.dataset.url || "",
      type: l.dataset.type
    };
  }
  static formatFileSize(l) {
    if (l === 0) return "0 Bytes";
    const i = 1024, t = ["Bytes", "KB", "MB", "GB", "TB"], d = Math.floor(Math.log(l) / Math.log(i));
    return Math.round(l / Math.pow(i, d) * 100) / 100 + " " + t[d];
  }
  static getFileIcon(l) {
    const i = l.toLowerCase();
    return i.includes("pdf") ? `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="9" y1="15" x2="15" y2="15"></line>
          <line x1="9" y1="18" x2="15" y2="18"></line>
        </svg>
      ` : i.includes("image") || /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(i) ? `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      ` : i.includes("video") || /\.(mp4|avi|mov|wmv|flv|mkv)$/i.test(i) ? `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polygon points="23 7 16 12 23 17 23 7"></polygon>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
        </svg>
      ` : i.includes("audio") || /\.(mp3|wav|ogg|m4a|flac)$/i.test(i) ? `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
      ` : i.includes("zip") || i.includes("rar") || i.includes("7z") || /\.(zip|rar|7z|tar|gz)$/i.test(i) ? `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="21 8 21 21 3 21 3 8"></polyline>
          <rect x="1" y="3" width="22" height="5"></rect>
          <line x1="10" y1="12" x2="14" y2="12"></line>
        </svg>
      ` : i.includes("text") || /\.(txt|md|json|xml|html|css|js|ts|py|java|c|cpp)$/i.test(i) ? `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ` : i.includes("spreadsheet") || i.includes("excel") || /\.(xls|xlsx|csv)$/i.test(i) ? `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="8" y1="13" x2="16" y2="13"></line>
          <line x1="8" y1="17" x2="16" y2="17"></line>
          <line x1="12" y1="9" x2="12" y2="21"></line>
        </svg>
      ` : i.includes("word") || i.includes("document") || /\.(doc|docx)$/i.test(i) ? `
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      ` : `
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
        <polyline points="13 2 13 9 20 9"></polyline>
      </svg>
    `;
  }
}
const j = "_vueQuillEditor_1vc7w_1", P = {
  vueQuillEditor: j
}, R = h.import("formats/image");
class W extends R {
  static sanitize(l) {
    return super.sanitize(l, ["http", "https", "data", "blob"]) ? l : "//:0";
  }
}
h.register("formats/image", W);
h.register(O);
h.register("modules/resize", L);
h.register({
  "modules/table-better": k
}, !0);
const le = /* @__PURE__ */ M({
  name: "VueQuill",
  props: {
    content: {
      type: String,
      default: ""
    },
    contentType: {
      type: String,
      default: "html"
    },
    enable: {
      type: Boolean,
      default: !0
    },
    readOnly: {
      type: Boolean,
      default: !1
    },
    placeholder: {
      type: String,
      default: ""
    },
    theme: {
      type: String,
      default: "snow"
    },
    toolbar: {
      type: [String, Array, Object, Boolean],
      default: !0
    },
    formats: {
      type: Array,
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
      type: Function,
      default: void 0
    },
    fileUploader: {
      type: Function,
      default: void 0
    },
    onUpdateContent: {
      type: Function,
      default: void 0
    },
    onTextChange: {
      type: Function,
      default: void 0
    },
    onSelectionChange: {
      type: Function,
      default: void 0
    },
    onEditorChange: {
      type: Function,
      default: void 0
    },
    onFocus: {
      type: Function,
      default: void 0
    },
    onBlur: {
      type: Function,
      default: void 0
    },
    onReady: {
      type: Function,
      default: void 0
    }
  },
  setup(n, {
    expose: l
  }) {
    const i = _();
    let t = null, d = !1;
    const p = () => {
      const e = document.createElement("input");
      e.setAttribute("type", "file"), e.setAttribute("accept", "image/*"), e.click(), e.onchange = async () => {
        const o = e.files?.[0];
        o && t && n.imageUploader && await m(o);
      };
    }, x = () => {
      const e = document.createElement("input");
      e.setAttribute("type", "file"), e.click(), e.onchange = async () => {
        const o = e.files?.[0];
        o && t && n.fileUploader && await u(o);
      };
    }, m = async (e) => {
      if (!t || !n.imageUploader) return;
      const o = t.getSelection(!0), a = `[Uploading "${e.name}"...]`;
      t.insertText(o.index, a, "user"), t.setSelection(o.index + a.length, 0);
      try {
        const c = await n.imageUploader(e);
        t.deleteText(o.index, a.length, "user"), t.insertEmbed(o.index, "image", c, "user"), t.setSelection(o.index + 1, 0);
      } catch {
        t.deleteText(o.index, a.length, "user"), t.insertText(o.index, `[Failed to upload "${e.name}"]`, "user");
      }
    }, u = async (e) => {
      if (!t || !n.fileUploader) return;
      const o = t.getSelection(!0), a = `[Uploading file "${e.name}"...]`;
      t.insertText(o.index, a, "user"), t.setSelection(o.index + a.length, 0);
      try {
        const c = await n.fileUploader(e);
        t.deleteText(o.index, a.length, "user");
        const r = {
          name: e.name,
          size: e.size,
          url: c,
          type: e.type
        };
        t.insertEmbed(o.index, "file", r, "user"), t.insertText(o.index + 1, `
`, "user"), t.setSelection(o.index + 2, 0);
      } catch {
        t.deleteText(o.index, a.length, "user"), t.insertText(o.index, `[Failed to upload file "${e.name}"]`, "user");
      }
    }, b = (e) => {
      if (!t) return;
      const o = e.clipboardData;
      if (!o) return;
      const a = o.items, c = o.files;
      for (let r = 0; r < a.length; r++) {
        const s = a[r];
        if (s && s.type.indexOf("image") !== -1 && n.imageUploader) {
          e.preventDefault(), e.stopPropagation();
          const f = s.getAsFile();
          f && setTimeout(() => {
            m(f);
          }, 0);
          return;
        }
      }
      if (c && c.length > 0 && n.fileUploader) {
        const r = c[0];
        if (!r) return;
        if (r.type.startsWith("image/") && n.imageUploader) {
          e.preventDefault(), e.stopPropagation(), setTimeout(() => {
            m(r);
          }, 0);
          return;
        }
        e.preventDefault(), e.stopPropagation(), setTimeout(() => {
          u(r);
        }, 0);
      }
    }, B = async () => {
      if (!i.value) return;
      n.theme === "bubble" && Promise.resolve({                 });
      const e = {
        toolbar: n.toolbar,
        ...n.modules
      }, o = {
        modules: ["DisplaySize", "Toolbar", "Resize", "Keyboard"],
        keyboardSelect: !0,
        selectedClass: "selected",
        activeClass: "active",
        embedTags: ["IMG", "VIDEO", "IFRAME"],
        tools: ["left", "center", "right", "full", "edit"],
        parchment: {
          image: {
            attribute: ["width"],
            limit: {
              minWidth: 100
            }
          },
          video: {
            attribute: ["width", "height"],
            limit: {
              minWidth: 200,
              ratio: 0.5625
              // 16:9
            }
          }
        }
      };
      e.resize = o;
      const a = {
        language: "zh_CN",
        menus: ["column", "row", "merge", "table", "cell", "wrap", "delete"],
        toolbarTable: !0
      };
      e.table = !1, e["table-better"] = a, e.keyboard ? e.keyboard.bindings ? e.keyboard.bindings = {
        ...e.keyboard.bindings,
        ...k.keyboardBindings
      } : e.keyboard.bindings = k.keyboardBindings : e.keyboard = {
        bindings: k.keyboardBindings
      };
      const c = {
        theme: n.theme,
        placeholder: n.placeholder,
        readOnly: n.readOnly,
        modules: e,
        formats: n.formats?.length ? n.formats : void 0,
        ...n.options
      };
      t = new h(i.value, c);
      const r = t.getModule("toolbar");
      (n.imageUploader || n.fileUploader) && t && t.root.addEventListener("paste", b, !0), n.imageUploader && r && r.addHandler("image", () => {
        p();
      }), n.fileUploader && r && r.addHandler("file", () => {
        x();
      }), w(n.content, n.contentType, !0), t.enable(n.enable), t.on("text-change", (s, f, y) => {
        if (!d) {
          const z = v(n.contentType);
          n.onUpdateContent?.(String(z)), n.onTextChange?.(s, f, y), n.onEditorChange?.("text-change", s, f, y);
        }
      }), t.on("selection-change", (s, f, y) => {
        n.onSelectionChange?.(s, f, y), n.onEditorChange?.("selection-change", s, f, y), s ? n.onFocus?.(s, y) : n.onBlur?.(f, y);
      }), n.onReady?.(t);
    }, v = (e = "html") => {
      if (!t) return "";
      switch (e) {
        case "html":
          return t.root.innerHTML;
        case "text":
          return t.getText();
        case "delta":
          return t.getContents();
        default:
          return t.root.innerHTML;
      }
    }, w = (e, o = "html", a = !1) => {
      if (t) {
        a || (d = !0);
        try {
          switch (o) {
            case "html":
              t.root.innerHTML = e;
              break;
            case "text":
              t.setText(e);
              break;
            case "delta":
              t.setContents(e);
              break;
            default:
              t.root.innerHTML = e;
          }
        } finally {
          a || T(() => {
            d = !1;
          });
        }
      }
    };
    return C(() => n.content, (e) => {
      !d && e !== v(n.contentType) && w(e, n.contentType);
    }), C(() => n.enable, (e) => {
      t && t.enable(e);
    }), C(() => n.readOnly, (e) => {
      t && t.enable(!e);
    }), l({
      getQuill: () => t,
      getHTML: () => v("html"),
      getText: () => v("text"),
      getContents: () => v("delta"),
      setHTML: (e) => w(e, "html"),
      setText: (e) => w(e, "text"),
      setContents: (e) => w(e, "delta")
    }), U(() => {
      T(() => {
        B();
      });
    }), F(() => {
      t && ((n.imageUploader || n.fileUploader) && t.root.removeEventListener("paste", b, !0), t = null);
    }), () => E("div", {
      ref: i,
      class: P.vueQuillEditor
    }, null);
  }
});
export {
  re as QuillTableBetter,
  le as VueQuill
};
