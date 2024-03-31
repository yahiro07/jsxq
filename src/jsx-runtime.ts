import * as jsxRuntime from "react/jsx-runtime";
import { customJsxAdapter } from "./custom_jsx_adapter.js";
export { Fragment } from "react";
export type { JsxExtendedCustomJsxNamespace as JSX } from "./jsx_namespace.js";

export function jsx(tag: string | Function, props: object, key?: string) {
  return customJsxAdapter(jsxRuntime.jsx, tag, props, key);
}

export function jsxs(tag: string | Function, props: object, key?: string) {
  return customJsxAdapter(jsxRuntime.jsxs, tag, props, key);
}
