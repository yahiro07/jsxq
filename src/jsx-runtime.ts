import * as jsxRuntime from "react/jsx-runtime";
import { customJsxAdapter } from "./custom_jsx_adapter";
export { Fragment } from "react";
export type { JsxExtendedCustomJsxNamespace as JSX } from "./jsx_namespace";

export function jsx(tag: string | Function, props: object, key?: string) {
  return customJsxAdapter(jsxRuntime.jsx, tag, props, key);
}

export function jsxs(tag: string | Function, props: object, key?: string) {
  return customJsxAdapter(jsxRuntime.jsxs, tag, props, key);
}
