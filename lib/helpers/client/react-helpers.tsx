import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { scrollToElement } from ".";

const subDomain =
  process.env.NEXT_PUBLIC_ACE_ENV === "development"
    ? "local."
    : process.env.NEXT_PUBLIC_ACE_ENV === "staging"
    ? "beta."
    : "";
export const htmlTitle = (title: string) =>
  `${title} | ${subDomain}ACEPhysics.net`;

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
  <T,>(...refs: React.Ref<T>[]): React.Ref<T> =>
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

let uniqueId = 0;
/**
 * Creates a unique ID that's self-contained to the lifetime of this component
 * but otherwise doesn't matter.
 */
export const useUniqueId = () => {
  const idRef = useRef<number>();
  return idRef.current || (idRef.current = ++uniqueId);
};

/**
 * Resets the unique ID counter. Used for SSR.
 * SEE: https://github.com/downshift-js/downshift#faq
 */
export const resetUniqueIds = () => {
  uniqueId = 0;
};

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
