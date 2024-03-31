import * as jsxDevRuntime from "react/jsx-dev-runtime";
import { customJsxAdapter } from "./custom_jsx_adapter.js";
export { Fragment } from "react";
export type { JsxExtendedCustomJsxNamespace as JSX } from "./jsx_namespace.js";

export function jsxDEV(
  tag: string | Function,
  props: object,
  key: string | undefined,
  ...jsxRestArgs: any[]
) {
  return customJsxAdapter(
    jsxDevRuntime.jsxDEV,
    tag,
    props,
    key,
    ...jsxRestArgs
  );
}
