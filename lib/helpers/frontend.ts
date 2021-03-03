import { useEffect, useReducer, useRef, useState } from "react";

export type Html = React.ReactNode;
export type Component<P = {}> = React.FunctionComponent<P>;
export type JsxElement = React.ReactElement<any, any> | null;

export interface Children<T = Html> {
  children?: T;
}

export type Props<T extends React.Component> = T extends React.Component<
  infer P
>
  ? P
  : never;

export const useToggle = <E extends Element = HTMLElement>(
  initial: boolean = false
) => {
  const ref = useRef<E>(null);
  const [toggled, setToggled] = useState(initial);

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

  return [toggled, setToggled, ref] as const;
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
 * Creates a unique Symbol that's self-contained to the lifetime of this
 * component but otherwise doesn't matter.
 */
export const useUniqueSymbol = () => {
  const symbol = useRef<symbol>();
  return symbol.current || (symbol.current = Symbol());
};

const tickReducer = (x: number) => x + 1;
export const useForceUpdate = () => useReducer(tickReducer, 0)[1];

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
    el.current.scrollIntoView({ behavior: "smooth" });
  });

  return el;
};
