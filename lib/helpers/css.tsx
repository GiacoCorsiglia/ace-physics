import isPropValid from "@emotion/is-prop-valid";
import {
  Children,
  cloneElement,
  createElement,
  forwardRef,
  ReactElement,
} from "react";
import { Html } from "./frontend";

// Class name concatenation.
type ClassName = string | false | void | null | 0;
export const cx = (...classNames: ClassName[]): string =>
  classNames.filter(Boolean).join(" "); // Thanks, Linaria.

// Components to apply classes to their children.

interface StyledChildComponent<P> {
  (props: { children?: Html } & P): ReactElement<any, any> | null;
  displayName?: string;
}

export const styledChild: {
  (classes: ClassName | readonly ClassName[]): StyledChildComponent<{}>;
  <P>(classes: (props: P) => readonly ClassName[]): StyledChildComponent<P>;
} = (classes: any) => {
  const classesFn = classes instanceof Function ? classes : null;
  if (!classesFn && !Array.isArray(classes)) {
    classes = [classes];
  }

  const component = forwardRef(
    ({ children, className, ...props }: any, ref) => {
      Children.only(children);
      const cs = classesFn ? classesFn(props) : classes;
      return cloneElement(children, {
        className: cx(children.props.className, className, ...cs),
        ref,
      });
    }
  );

  component.displayName = `styledChild${devDisplayName(classes)}`;

  return component;
};

// Simple styled components without inline CSS.
type Tag = keyof JSX.IntrinsicElements;

interface StyledComponent<DefaultTag extends Tag, P> {
  <T extends Tag = DefaultTag>(
    props: {
      as?: T;
    } & P &
      JSX.IntrinsicElements[T]
  ): ReactElement<any, any> | null;

  displayName?: string;
}

interface StyledConstructor<DefaultTag extends Tag> {
  (
    classes: ClassName | readonly ClassName[],
    renderChildren?: (children: Html) => Html
  ): StyledComponent<DefaultTag, {}>;
  <P>(
    classes: (props: P) => readonly ClassName[],
    renderChildren?: (children: Html) => Html
  ): StyledComponent<DefaultTag, P>;
}

export const styled: {
  [Tag in keyof JSX.IntrinsicElements]: StyledConstructor<Tag>;
} = {
  // See loop below.
} as any;

const styledConstructor =
  (tag: Tag) =>
  (classes: any, renderChildren?: (children: Html) => Html): any => {
    const classesFn = classes instanceof Function ? classes : null;
    if (!classesFn && !Array.isArray(classes)) {
      classes = [classes];
    }

    const component = forwardRef((props: any, ref) => {
      const As = props.as || tag;
      const cs = classesFn ? classesFn(props) : classes;

      const newProps: any = {};
      for (const key in props) {
        if (key !== "as" && isPropValid(key)) {
          newProps[key] = props[key];
        }
      }
      newProps.ref = ref;
      newProps.className = cx(props.className, ...cs);
      // Let's just fix HTML real quick.
      if (As === "button" && !newProps.type) {
        newProps.type = "button";
      }

      if (renderChildren) {
        newProps.children = renderChildren(props.children);
      }

      return createElement(As, newProps);
    });

    component.displayName = `styled.${tag}${devDisplayName(classes)}`;

    return component;
  };

// The compiled function will include references to class names like:
// _${filename}_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.${className};
// or
// _${filename}_module_scss__WEBPACK_IMPORTED_MODULE_1___default().${className};
const classesFnX = /([a-z0-9]+)_\w*__default\(?\)?\.?\w*\.([a-z0-9]+)/i;
// The CSS module classnames themselves look like:
// ${filename}_${className} __${hash}
const classesStrX = /^([a-z0-9]+)_([a-z0-9]+)_/i;
const devDisplayName = (classes: (() => any) | readonly string[]): string => {
  if (process.env.NODE_ENV !== "development") {
    return "";
  }

  const isFn = classes instanceof Function;
  const string = isFn ? classes.toString() : (classes as string[])[0];
  const pattern = isFn ? classesFnX : classesStrX;
  // We always just match the first occurrence.
  const match = string && string.match(pattern);

  const fileName = match && match[1];
  const className = match && match[2];

  if (!className) {
    return "";
  }

  const upperClassName = className.charAt(0).toUpperCase() + className.slice(1);
  return `(${fileName}.${upperClassName})`;
};

// Copied right from the JSX.IntrinsicElements type definition.
const domElements: Tag[] = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noindex",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "slot",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "template",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "webview",

  // SVG.
  "svg",
  "animate",
  "animateMotion",
  "animateTransform",
  "circle",
  "clipPath",
  "defs",
  "desc",
  "ellipse",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "filter",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "marker",
  "mask",
  "metadata",
  "mpath",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "switch",
  "symbol",
  "text",
  "textPath",
  "tspan",
  "use",
  "view",
];

for (const tag of domElements) {
  styled[tag] = styledConstructor(tag);
}
