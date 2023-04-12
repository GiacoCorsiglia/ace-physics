import {
  Children,
  Fragment,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useInsertionEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { cx } from "./css";
import { scrollToElement } from "./scroll";

const titleEnv =
  process.env.NEXT_PUBLIC_ACE_ENV === "development"
    ? " (local)"
    : process.env.NEXT_PUBLIC_ACE_ENV === "staging"
    ? " (beta)"
    : "";
const titleBase = `ACE Physics${titleEnv}`;
export const htmlTitle = (title: string) =>
  title ? `${title} | ${titleBase}` : titleBase;

export type Css = React.CSSProperties & {
  [key: string]: string | number | Css;
};
export type Html = React.ReactNode;
export type Component<P = {}> = React.FunctionComponent<P>;
export type JsxElement = React.ReactElement<any, any> | null;

export type Props<T extends React.Component | React.FunctionComponent> =
  T extends React.Component<infer P>
    ? P
    : T extends React.FunctionComponent<infer P>
    ? P
    : never;

export const isReactElement = (o: any): o is React.ReactElement =>
  !!o &&
  (typeof o.type === "string" || typeof o.type === "function") &&
  !!o.props;

export const combineRefs =
  <T,>(...refs: (React.Ref<T> | undefined)[]): React.Ref<T> =>
  (node: T | null): void => {
    // https://stackoverflow.com/questions/62238716/using-ref-current-in-react-forwardref
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  };

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const useIsomorphicInsertionEffect =
  typeof window !== "undefined" ? useInsertionEffect : useEffect;

export const useToggle = <E extends Element = HTMLElement>(
  initial: boolean = false
) => {
  const ref = useRef<E>(null);
  const [toggled, setToggled] = useState(initial);

  const toggleHandler = useCallback((e: React.MouseEvent) => {
    // Ensure the document handler doesn't run!  I don't understand why this bug
    // happens, it seems bizarre that a click handler added *during* a click
    // event would fire, but it seems to (sometimes).
    e.stopPropagation();
    // Actually toggle.
    setToggled((t) => !t);
  }, []);

  useEffect(() => {
    if (!toggled) {
      return;
    }

    const clickHandler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setToggled(false);
      }
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [toggled]);

  return [toggled, toggleHandler, ref] as const;
};

/**
 * Creates a unique ID that's self-contained to the lifetime of this component
 * but otherwise doesn't matter.
 */
export const useUniqueId = useId;

/**
 * Creates a unique Symbol that's self-contained to the lifetime of this
 * component but otherwise doesn't matter.
 */
export const useUniqueSymbol = () => {
  const symbol = useRef<symbol>();
  return symbol.current || (symbol.current = Symbol());
};

const tickReducer = (x: number) => x + 1;
export const useForceUpdate = () => useReducer(tickReducer, 0)[1];

export const useSyncedState = <T, V>(
  prop: T,
  fromProp: (prop: T) => V,
  skipSync: (prop: T, state: V, propAsState: V) => boolean
) => {
  const propAsState = fromProp(prop);
  const tuple = useState(propAsState);
  const [state, setState] = tuple;

  if (state !== propAsState && !skipSync(prop, state, propAsState)) {
    setState(propAsState);
  }

  return tuple;
};

export const useScrollIntoView = (when = true): React.RefObject<any> => {
  // We return `RefObject<any>` because the variance for ref generics isn't what
  // it should be.
  const el = useRef<HTMLElement>(null);
  const alreadyScrolled = useRef(false);

  useEffect(() => {
    const condition = when === undefined || when;
    if (!condition || !el.current || alreadyScrolled.current) {
      return;
    }
    alreadyScrolled.current = true;
    scrollToElement(el.current, 16 * 3); // Offset for header (3rem).
  });

  return el;
};

export const useBoolean = (
  initial: boolean = false
): readonly [
  value: boolean,
  setTrue: () => void,
  setFalse: () => void,
  toggle: () => void
] => {
  const [value, setValue] = useState(initial);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((v) => !v), []);

  return [value, setTrue, setFalse, toggle];
};

export const useActualSiblingCheck = <
  Element extends HTMLElement = HTMLDivElement
>(
  when: () => boolean,
  deps: any[]
) => {
  const elRef = useRef<Element>(null);
  const classesRef = useRef("");

  useIsomorphicLayoutEffect(() => {
    const el = elRef.current;
    if (!el || !when()) {
      return;
    }
    // If this is display math, determine if this element is the first/last
    // child of its parent *including text nodes* (which CSS is incapable of).
    const firstChild = !el.previousSibling;
    const lastChild = !el.nextSibling;
    classesRef.current = cx(
      firstChild && "prose-actual-first-child",
      lastChild && "prose-actual-last-child"
    );
    el.className += " " + classesRef.current;
  }, deps);

  return [elRef, classesRef.current] as const;
};

export const useTimeout = (action: () => void, timeoutMs: number) => {
  const actionRef = useRef<() => void>();
  useEffect(() => {
    actionRef.current = action;
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      actionRef.current!();
    }, timeoutMs);

    return () => clearTimeout(timeoutId);
  }, [timeoutMs]);
};

export const useBodyScrollLock = (enabled: boolean = true) => {
  useLayoutEffect(() => {
    if (!enabled) {
      return;
    }

    const body = document.body;
    const scrollPosition = window.pageYOffset;
    const scrollbarWidth = window.innerWidth - body.offsetWidth;

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollPosition}px`;
    body.style.left = "0";
    body.style.right = `${scrollbarWidth}px`;

    return () => {
      body.style.removeProperty("overflow");
      body.style.removeProperty("position");
      body.style.removeProperty("top");
      body.style.removeProperty("left");
      body.style.removeProperty("right");

      // Temporarily disable smooth scrolling smdh.  Setting `behavior` in the
      // `scrollTo` options doesn't do the trick.
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, scrollPosition);
      document.documentElement.style.removeProperty("scroll-behavior");
    };
  }, [enabled]);
};

let emptyBackgroundColor: string | null = null;
/**
 * Creates a test element and temporarily adds it to the DOM to determine what
 * `getComputedStyle(element).backgroundColor` will be when the element doesn't
 * actually have a background color set.  In FireFox, at least, this turns out
 * to be "rgba(0,0,0,0)".
 */
const getEmptyBackgroundColor = () => {
  if (emptyBackgroundColor !== null) {
    return emptyBackgroundColor;
  }
  const element = document.createElement("div");
  // Have to add it to the DOM for `getComputedStyle` to be realistic.
  document.body.appendChild(element);

  const style = getComputedStyle(element);
  // Cache the value.
  emptyBackgroundColor = style.backgroundColor;
  // Remove it from the DOM again.
  element.remove();

  return emptyBackgroundColor;
};

/**
 * Walks up the DOM tree until it finds an element with a background color.
 */
export const useAncestorBackgroundColor = <
  E extends Element = HTMLElement
>() => {
  const ref = useRef<E>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>("");

  useEffect(() => {
    if (!ref.current) {
      console.error("useComputedBackgroundColor: ref not set");
      return;
    }

    let element = ref.current.parentElement;
    while (element) {
      const color = getComputedStyle(element).backgroundColor;
      if (
        color &&
        color !== "transparent" &&
        color !== getEmptyBackgroundColor()
      ) {
        setBackgroundColor(color);
        break;
      }
      element = element.parentElement;
    }
  }, []);

  return [ref, backgroundColor] as const;
};

/**
 * Like React's `Children.forEach` but recurses into Fragments in a depth-first
 * manner.  The `fn` will *not* be called with the Fragments themselves.
 */
export const forEachChild = (children: Html, fn: (child: Html) => void): void =>
  Children.forEach(children, (child) => {
    if (isValidElement<{ children?: Html }>(child) && child.type === Fragment) {
      forEachChild(child.props.children, fn);
    } else {
      fn(child);
    }
  });

export const useConstant = <T,>(init: () => T): T => {
  const [value] = useState(init);
  return value;
};
