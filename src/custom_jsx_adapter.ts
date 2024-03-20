type IDestJsxFn = any;
type IComponentFn = Function;
type IVNodeTag = string | IComponentFn;
type IKey = string | undefined;
type IClassName = string | false | undefined;

type IPropsIfValue = object | any[] | string | boolean | undefined;
type IPropsQValue = string | false | (string | false | undefined)[];

type IComponentPropsExtra = {
  if?: IPropsIfValue;
  q?: IPropsQValue;
};

const enclose = <T>(item: T | T[]): T[] =>
  Array.isArray(item) ? item : [item];

function cx(...classNames: IClassName[]) {
  return classNames.filter((it) => !!it).join(" ");
}

function addClassNamesToProps(props: any, ...classNames: IClassName[]) {
  return { ...props, className: cx(props.className, ...classNames) };
}

function serializePropsQSignature(propsQ: IPropsQValue) {
  if (Array.isArray(propsQ)) {
    return propsQ.map((it) => it?.toString()).join("_");
  } else {
    return propsQ.toString();
  }
}

const symbolFcAttachment = Symbol("props-q-fc-attachment");
type IOriginalFunctionComponent = Function & {
  [symbolFcAttachment]?: Record<string, Function>;
};

export function customJsxAdapter(
  destJsxFn: IDestJsxFn,
  tag: IVNodeTag,
  props: IComponentPropsExtra,
  key: IKey,
  ...jsxRestArgs: any[]
) {
  if ("if" in props && !props.if) return null;
  const { q: propsQ, if: _, ...restProps } = props;
  let modProps = { ...restProps };
  if (propsQ) {
    if (typeof tag === "function") {
      //For function components, create a wrapper function
      //that patches the returned JSX element of original component.
      const originalFunctionComponent = tag as IOriginalFunctionComponent;
      const sig = serializePropsQSignature(propsQ);
      const attachment = (originalFunctionComponent[symbolFcAttachment] ??= {});
      tag = attachment[sig] ??= (innerProps: object) => {
        const jsxNode = originalFunctionComponent(innerProps);
        if (jsxNode === null) return null;
        return {
          ...jsxNode,
          props: addClassNamesToProps(jsxNode.props, ...enclose(propsQ)),
        };
      };
    } else {
      //For intrinsic elements, just append q props to className
      modProps = addClassNamesToProps(restProps, ...enclose(propsQ));
    }
  }

  return destJsxFn(tag, modProps, key, ...jsxRestArgs);
}
