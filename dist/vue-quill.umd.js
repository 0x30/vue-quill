(function(c,s){typeof exports=="object"&&typeof module<"u"?s(exports,require("vue"),require("quill"),require("quill-resize-module"),require("quill-table-better")):typeof define=="function"&&define.amd?define(["exports","vue","quill","quill-resize-module","quill-table-better"],s):(c=typeof globalThis<"u"?globalThis:c||self,s(c.VueQuill={},c.Vue,c.Quill,c.QuillResizeModule,c.QuillTableBetter))})(this,(function(c,s,m,z,v){"use strict";const y={fileBlock:"_fileBlock_gicnx_1",fileContainer:"_fileContainer_gicnx_8",fileIcon:"_fileIcon_gicnx_24",fileInfo:"_fileInfo_gicnx_42",fileName:"_fileName_gicnx_47",fileSize:"_fileSize_gicnx_57",fileDownload:"_fileDownload_gicnx_63"},B=m.import("blots/block/embed"),M=m.import("ui/icons");M.file=`
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
  <polyline points="14 2 14 8 20 8"></polyline>
  <line x1="12" y1="18" x2="12" y2="12"></line>
  <line x1="9" y1="15" x2="15" y2="15"></line>
</svg>
`;class _ extends B{static blotName="file";static tagName="div";static className=y.fileBlock;static create(l){const n=super.create();n.setAttribute("contenteditable","false"),n.classList.add(y.fileBlock),l.type&&n.setAttribute("data-type",l.type);const t=document.createElement("div");t.classList.add(y.fileContainer);const u=document.createElement("div");u.classList.add(y.fileIcon),u.innerHTML=this.getFileIcon(l.type||l.name);const b=document.createElement("div");b.classList.add(y.fileInfo);const w=document.createElement("div");w.classList.add(y.fileName),w.textContent=l.name,w.setAttribute("title",l.name);const p=document.createElement("div");p.classList.add(y.fileSize),p.textContent=this.formatFileSize(l.size),b.appendChild(w),b.appendChild(p);const g=document.createElement("a");return g.classList.add(y.fileDownload),g.href=l.url,g.download=l.name,g.setAttribute("target","_blank"),g.setAttribute("title","Download file"),g.innerHTML=`
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    `,t.addEventListener("click",k=>{k.preventDefault(),k.stopPropagation()}),t.appendChild(u),t.appendChild(b),t.appendChild(g),n.appendChild(t),n.dataset.name=l.name,n.dataset.size=l.size.toString(),n.dataset.url=l.url,l.type&&(n.dataset.type=l.type),n}static value(l){return{name:l.dataset.name||"",size:parseInt(l.dataset.size||"0"),url:l.dataset.url||"",type:l.dataset.type}}static formatFileSize(l){if(l===0)return"0 Bytes";const n=1024,t=["Bytes","KB","MB","GB","TB"],u=Math.floor(Math.log(l)/Math.log(n));return Math.round(l/Math.pow(n,u)*100)/100+" "+t[u]}static getFileIcon(l){const n=l.toLowerCase();return n.includes("pdf")?`
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="9" y1="15" x2="15" y2="15"></line>
          <line x1="9" y1="18" x2="15" y2="18"></line>
        </svg>
      `:n.includes("image")||/\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i.test(n)?`
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      `:n.includes("video")||/\.(mp4|avi|mov|wmv|flv|mkv)$/i.test(n)?`
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polygon points="23 7 16 12 23 17 23 7"></polygon>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
        </svg>
      `:n.includes("audio")||/\.(mp3|wav|ogg|m4a|flac)$/i.test(n)?`
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
      `:n.includes("zip")||n.includes("rar")||n.includes("7z")||/\.(zip|rar|7z|tar|gz)$/i.test(n)?`
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="21 8 21 21 3 21 3 8"></polyline>
          <rect x="1" y="3" width="22" height="5"></rect>
          <line x1="10" y1="12" x2="14" y2="12"></line>
        </svg>
      `:n.includes("text")||/\.(txt|md|json|xml|html|css|js|ts|py|java|c|cpp)$/i.test(n)?`
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      `:n.includes("spreadsheet")||n.includes("excel")||/\.(xls|xlsx|csv)$/i.test(n)?`
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="8" y1="13" x2="16" y2="13"></line>
          <line x1="8" y1="17" x2="16" y2="17"></line>
          <line x1="12" y1="9" x2="12" y2="21"></line>
        </svg>
      `:n.includes("word")||n.includes("document")||/\.(doc|docx)$/i.test(n)?`
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      `:`
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
        <polyline points="13 2 13 9 20 9"></polyline>
      </svg>
    `}}const S={vueQuillEditor:"_vueQuillEditor_1vc7w_1"},U=m.import("formats/image");class E extends U{static sanitize(l){return super.sanitize(l,["http","https","data","blob"])?l:"//:0"}}m.register("formats/image",E),m.register(_),m.register("modules/resize",z),m.register({"modules/table-better":v},!0);const F=s.defineComponent({name:"VueQuill",props:{content:{type:String,default:""},contentType:{type:String,default:"html"},enable:{type:Boolean,default:!0},readOnly:{type:Boolean,default:!1},placeholder:{type:String,default:""},theme:{type:String,default:"snow"},toolbar:{type:[String,Array,Object,Boolean],default:!0},formats:{type:Array,default:()=>[]},modules:{type:Object,default:()=>({})},options:{type:Object,default:()=>({})},imageUploader:{type:Function,default:void 0},fileUploader:{type:Function,default:void 0},onUpdateContent:{type:Function,default:void 0},onTextChange:{type:Function,default:void 0},onSelectionChange:{type:Function,default:void 0},onEditorChange:{type:Function,default:void 0},onFocus:{type:Function,default:void 0},onBlur:{type:Function,default:void 0},onReady:{type:Function,default:void 0}},setup(i,{expose:l}){const n=s.ref();let t=null,u=!1;const b=()=>{const e=document.createElement("input");e.setAttribute("type","file"),e.setAttribute("accept","image/*"),e.click(),e.onchange=async()=>{const o=e.files?.[0];o&&t&&i.imageUploader&&await p(o)}},w=()=>{const e=document.createElement("input");e.setAttribute("type","file"),e.click(),e.onchange=async()=>{const o=e.files?.[0];o&&t&&i.fileUploader&&await g(o)}},p=async e=>{if(!t||!i.imageUploader)return;const o=t.getSelection(!0),a=`[Uploading "${e.name}"...]`;t.insertText(o.index,a,"user"),t.setSelection(o.index+a.length,0);try{const f=await i.imageUploader(e);t.deleteText(o.index,a.length,"user"),t.insertEmbed(o.index,"image",f,"user"),t.setSelection(o.index+1,0)}catch{t.deleteText(o.index,a.length,"user"),t.insertText(o.index,`[Failed to upload "${e.name}"]`,"user")}},g=async e=>{if(!t||!i.fileUploader)return;const o=t.getSelection(!0),a=`[Uploading file "${e.name}"...]`;t.insertText(o.index,a,"user"),t.setSelection(o.index+a.length,0);try{const f=await i.fileUploader(e);t.deleteText(o.index,a.length,"user");const r={name:e.name,size:e.size,url:f,type:e.type};t.insertEmbed(o.index,"file",r,"user"),t.insertText(o.index+1,`
`,"user"),t.setSelection(o.index+2,0)}catch{t.deleteText(o.index,a.length,"user"),t.insertText(o.index,`[Failed to upload file "${e.name}"]`,"user")}},k=e=>{if(!t)return;const o=e.clipboardData;if(!o)return;const a=o.items,f=o.files;for(let r=0;r<a.length;r++){const d=a[r];if(d&&d.type.indexOf("image")!==-1&&i.imageUploader){e.preventDefault(),e.stopPropagation();const h=d.getAsFile();h&&setTimeout(()=>{p(h)},0);return}}if(f&&f.length>0&&i.fileUploader){const r=f[0];if(!r)return;if(r.type.startsWith("image/")&&i.imageUploader){e.preventDefault(),e.stopPropagation(),setTimeout(()=>{p(r)},0);return}e.preventDefault(),e.stopPropagation(),setTimeout(()=>{g(r)},0)}},I=async()=>{if(!n.value)return;i.theme==="bubble"&&Promise.resolve().then(()=>L);const e={toolbar:i.toolbar,...i.modules},o={modules:["DisplaySize","Toolbar","Resize","Keyboard"],keyboardSelect:!0,selectedClass:"selected",activeClass:"active",embedTags:["IMG","VIDEO","IFRAME"],tools:["left","center","right","full","edit"],parchment:{image:{attribute:["width"],limit:{minWidth:100}},video:{attribute:["width","height"],limit:{minWidth:200,ratio:.5625}}}};e.resize=o;const a={language:"zh_CN",menus:["column","row","merge","table","cell","wrap","delete"],toolbarTable:!0};e.table=!1,e["table-better"]=a,e.keyboard?e.keyboard.bindings?e.keyboard.bindings={...e.keyboard.bindings,...v.keyboardBindings}:e.keyboard.bindings=v.keyboardBindings:e.keyboard={bindings:v.keyboardBindings};const f={theme:i.theme,placeholder:i.placeholder,readOnly:i.readOnly,modules:e,formats:i.formats?.length?i.formats:void 0,...i.options};t=new m(n.value,f);const r=t.getModule("toolbar");(i.imageUploader||i.fileUploader)&&t&&t.root.addEventListener("paste",k,!0),i.imageUploader&&r&&r.addHandler("image",()=>{b()}),i.fileUploader&&r&&r.addHandler("file",()=>{w()}),T(i.content,i.contentType,!0),t.enable(i.enable),t.on("text-change",(d,h,x)=>{if(!u){const H=C(i.contentType);i.onUpdateContent?.(String(H)),i.onTextChange?.(d,h,x),i.onEditorChange?.("text-change",d,h,x)}}),t.on("selection-change",(d,h,x)=>{i.onSelectionChange?.(d,h,x),i.onEditorChange?.("selection-change",d,h,x),d?i.onFocus?.(d,x):i.onBlur?.(h,x)}),i.onReady?.(t)},C=(e="html")=>{if(!t)return"";switch(e){case"html":return t.root.innerHTML;case"text":return t.getText();case"delta":return t.getContents();default:return t.root.innerHTML}},T=(e,o="html",a=!1)=>{if(t){a||(u=!0);try{switch(o){case"html":t.root.innerHTML=e;break;case"text":t.setText(e);break;case"delta":t.setContents(e);break;default:t.root.innerHTML=e}}finally{a||s.nextTick(()=>{u=!1})}}};return s.watch(()=>i.content,e=>{!u&&e!==C(i.contentType)&&T(e,i.contentType)}),s.watch(()=>i.enable,e=>{t&&t.enable(e)}),s.watch(()=>i.readOnly,e=>{t&&t.enable(!e)}),l({getQuill:()=>t,getHTML:()=>C("html"),getText:()=>C("text"),getContents:()=>C("delta"),setHTML:e=>T(e,"html"),setText:e=>T(e,"text"),setContents:e=>T(e,"delta")}),s.onMounted(()=>{s.nextTick(()=>{I()})}),s.onUnmounted(()=>{t&&((i.imageUploader||i.fileUploader)&&t.root.removeEventListener("paste",k,!0),t=null)}),()=>s.createVNode("div",{ref:n,class:S.vueQuillEditor},null)}}),L=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));c.QuillTableBetter=v,c.VueQuill=F,Object.defineProperty(c,Symbol.toStringTag,{value:"Module"})}));
