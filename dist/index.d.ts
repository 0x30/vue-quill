import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { default as default_2 } from 'quill';
import { DefineComponent } from 'vue';
import { ExtractPropTypes } from 'vue';
import { JSX } from 'vue/jsx-runtime';
import { PublicProps } from 'vue';
import { default as QuillTableBetter } from 'quill-table-better';

export { QuillTableBetter }

export declare const VueQuill: DefineComponent<ExtractPropTypes<    {
content: {
type: StringConstructor;
default: string;
};
contentType: {
type: () => "delta" | "html" | "text";
default: string;
};
enable: {
type: BooleanConstructor;
default: boolean;
};
readOnly: {
type: BooleanConstructor;
default: boolean;
};
placeholder: {
type: StringConstructor;
default: string;
};
theme: {
type: () => "snow" | "bubble" | string;
default: string;
};
toolbar: {
type: (StringConstructor | BooleanConstructor | ArrayConstructor | ObjectConstructor)[];
default: boolean;
};
formats: {
type: () => string[];
default: () => never[];
};
modules: {
type: ObjectConstructor;
default: () => {};
};
options: {
type: ObjectConstructor;
default: () => {};
};
imageUploader: {
type: () => (file: File) => Promise<string>;
default: undefined;
};
fileUploader: {
type: () => (file: File) => Promise<string>;
default: undefined;
};
onUpdateContent: {
type: () => (content: string) => void;
default: undefined;
};
onTextChange: {
type: () => (delta: any, oldDelta: any, source: string) => void;
default: undefined;
};
onSelectionChange: {
type: () => (range: any, oldRange: any, source: string) => void;
default: undefined;
};
onEditorChange: {
type: () => (eventName: string, ...args: any[]) => void;
default: undefined;
};
onFocus: {
type: () => (range: any, source: string) => void;
default: undefined;
};
onBlur: {
type: () => (previousRange: any, source: string) => void;
default: undefined;
};
onReady: {
type: () => (quill: default_2) => void;
default: undefined;
};
}>, () => JSX.Element, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ExtractPropTypes<    {
content: {
type: StringConstructor;
default: string;
};
contentType: {
type: () => "delta" | "html" | "text";
default: string;
};
enable: {
type: BooleanConstructor;
default: boolean;
};
readOnly: {
type: BooleanConstructor;
default: boolean;
};
placeholder: {
type: StringConstructor;
default: string;
};
theme: {
type: () => "snow" | "bubble" | string;
default: string;
};
toolbar: {
type: (StringConstructor | BooleanConstructor | ArrayConstructor | ObjectConstructor)[];
default: boolean;
};
formats: {
type: () => string[];
default: () => never[];
};
modules: {
type: ObjectConstructor;
default: () => {};
};
options: {
type: ObjectConstructor;
default: () => {};
};
imageUploader: {
type: () => (file: File) => Promise<string>;
default: undefined;
};
fileUploader: {
type: () => (file: File) => Promise<string>;
default: undefined;
};
onUpdateContent: {
type: () => (content: string) => void;
default: undefined;
};
onTextChange: {
type: () => (delta: any, oldDelta: any, source: string) => void;
default: undefined;
};
onSelectionChange: {
type: () => (range: any, oldRange: any, source: string) => void;
default: undefined;
};
onEditorChange: {
type: () => (eventName: string, ...args: any[]) => void;
default: undefined;
};
onFocus: {
type: () => (range: any, source: string) => void;
default: undefined;
};
onBlur: {
type: () => (previousRange: any, source: string) => void;
default: undefined;
};
onReady: {
type: () => (quill: default_2) => void;
default: undefined;
};
}>> & Readonly<{}>, {
content: string;
contentType: "delta" | "html" | "text";
enable: boolean;
readOnly: boolean;
placeholder: string;
theme: string;
toolbar: string | boolean | Record<string, any> | unknown[];
formats: string[];
modules: Record<string, any>;
options: Record<string, any>;
imageUploader: (file: File) => Promise<string>;
fileUploader: (file: File) => Promise<string>;
onUpdateContent: (content: string) => void;
onTextChange: (delta: any, oldDelta: any, source: string) => void;
onSelectionChange: (range: any, oldRange: any, source: string) => void;
onEditorChange: (eventName: string, ...args: any[]) => void;
onFocus: (range: any, source: string) => void;
onBlur: (previousRange: any, source: string) => void;
onReady: (quill: default_2) => void;
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;

export declare interface VueQuillInstance {
    getQuill: () => default_2 | null;
    getHTML: () => string;
    getText: () => string;
    getContents: () => any;
    setHTML: (html: string) => void;
    setText: (text: string) => void;
    setContents: (delta: any) => void;
}

export { }
