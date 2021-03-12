import { forwardRef, ReactElement } from "react";

// Class name concatenation.
type ClassName = string | false | void | null | 0;
export const cx = (...classNames: ClassName[]): string =>
  classNames.filter(Boolean).join(" "); // Thanks, Linaria.

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
  (...classes: readonly ClassName[]): StyledComponent<DefaultTag, {}>;
  <P>(classes: (props: P) => readonly ClassName[]): StyledComponent<
    DefaultTag,
    P
  >;
}

export const styled: {
  [Tag in keyof JSX.IntrinsicElements]: StyledConstructor<Tag>;
} = {
  // See loop below.
} as any;

const styledConstructor = (tag: Tag) => (...classes: any[]): any => {
  const classesFn = classes[0] instanceof Function ? classes[0] : null;

  const component = forwardRef((props: any, ref) => {
    const As = props.as || tag;
    const cs = classesFn ? classesFn(props) : classes;
    return <As {...props} ref={ref} className={cx(props.className, ...cs)} />;
  });

  component.displayName = `styled.${tag}${devDisplayName(classes)}`;

  return component;
};

// The compiled function will include references to class names like:
// _${filename}_module_scss__WEBPACK_IMPORTED_MODULE_1___default.a.${className};
const classesFnX = /([a-z0-9]+)_\w*__default\.\w+\.([a-z0-9]+)/i;
// The CSS module classnames themselves look like:
// ${filename}_${className} __${hash}
const classesStrX = /^([a-z0-9]+)_([a-z0-9]+)_/i;
const devDisplayName = (classes: [() => any] | readonly string[]): string => {
  if (process.env.NODE_ENV !== "development") {
    return "";
  }

  const isFn = classes[0] instanceof Function;
  const string = isFn ? classes[0].toString() : (classes[0] as string);
  const pattern = isFn ? classesFnX : classesStrX;
  // We always just match the first occurence.
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
