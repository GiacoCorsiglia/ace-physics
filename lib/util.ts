import { useEffect, useRef, useState } from "react";

export type Writeable<T> = {
  -readonly [K in keyof T]: T[K];
};

///

export function classes(
  ...classes: (string | undefined | [string | undefined, boolean | undefined])[]
) {
  return (
    classes
      .filter((c) => (Array.isArray(c) ? c[1] && !!c[0] : !!c))
      .map((c) => (Array.isArray(c) ? c[0] : c))
      .join(" ") || undefined
  );
}

///

export function range(n: number): number[] {
  return [...(Array(Math.floor(n)) as any).keys()];
}

///

export interface Children<T = React.ReactNode> {
  children?: T;
}

/** @deprecated */
export interface OptionalChildren<T = React.ReactNode> {
  children?: T;
}

export type Props<T extends React.Component> = T extends React.Component<
  infer P
>
  ? P
  : never;

///

let uniqueId = 1;
/**
 * Creates a unique ID that's self-contained to the lifetime of this component
 * but otherwise doesn't matter.
 */
export function useUniqueId() {
  const idRef = useRef<number>();
  return idRef.current || (idRef.current = ++uniqueId);
}

///

export function arraysEqual(a1?: any[], a2?: any[]): boolean {
  if (!a1 || !a2 || a1.length !== a2.length) {
    return false;
  }

  a1 = a1.concat().sort();
  a2 = a2.concat().sort();

  for (let i = 0; i < a1.length; i++) {
    if (a1[i] !== a2[i]) {
      return false;
    }
  }

  return true;
}

///

export function approxEquals<
  T extends
    | number
    | (number | undefined)[]
    | ((number | undefined)[] | undefined)[]
>(n1: T | undefined, n2: T | undefined, forgiveness: number = 0.02): boolean {
  if (n1 === undefined || n2 === undefined) {
    return false;
  }

  if (Array.isArray(n1) && Array.isArray(n2)) {
    if (n1.length !== n2.length) {
      return false;
    }
    for (let i = 0; i < n1.length; i++) {
      if (!approxEquals(n1[i], n2[i])) {
        return false;
      }
    }
    return true;
  }

  if (Number.isNaN(n1) || Number.isNaN(n2)) {
    return false;
  }
  return Math.abs((n1 as number) - (n2 as number)) <= forgiveness;
}

export function norm(...ns: (number | undefined)[]): number | undefined {
  const squared = ns.reduce(
    (norm, n) =>
      norm === undefined || n === undefined ? undefined : norm + n ** 2,
    0
  );
  return squared === undefined ? undefined : Math.sqrt(squared);
}

export function roundToNearest(number: number, nearest: number): number {
  return nearest * Math.round(number / nearest);
}

///

export function useToggle<E extends Element = HTMLElement>(
  initial: boolean = false
) {
  const ref = useRef<E>(null);
  const [toggled, setToggled] = useState(initial);

  useEffect(() => {
    if (!toggled) {
      return;
    }

    function clickHandler(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setToggled(false);
      }
    }

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [toggled]);

  return [toggled, setToggled, ref] as const;
}

// Scrolling
// Source: https://nicegist.github.io/d210786daa23fd57db59634dd231f341

// function nativeSmoothScrollTo(elem: HTMLElement) {
//   window.scroll({
//     behavior: "smooth",
//     left: 0,
//     top: elem.getBoundingClientRect().top + window.pageYOffset,
//   });
// }

// polyfilled smooth scrolling for IE, Edge & Safari
function smoothScrollTo(to: number, duration: number) {
  const element = document.scrollingElement || document.documentElement,
    start = element.scrollTop,
    change = to - start,
    startDate = +new Date();

  // t = current time
  // b = start value
  // c = change in value
  // d = duration
  const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const animateScroll = () => {
    const currentDate = +new Date();
    const currentTime = currentDate - startDate;
    element.scrollTop = parseInt(
      easeInOutQuad(currentTime, start, change, duration) + ""
    );
    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    } else {
      element.scrollTop = to;
    }
  };
  animateScroll();
}

// detect support for the behavior property in ScrollOptions
const supportsNativeSmoothScroll =
  typeof document !== "undefined" &&
  "scrollBehavior" in document.documentElement.style;

export function scrollTo(to: number, duration: number) {
  if (supportsNativeSmoothScroll) {
    window.scroll({
      behavior: "smooth",
      left: 0,
      top: to,
    });
  } else {
    smoothScrollTo(to, duration);
  }
}

// smooth scrolling stub
// const scrollToElem = (elemSelector: string) => {
//   if (!elemSelector) {
//     return;
//   }

//   const elem = document.querySelector(elemSelector);
//   if (elem) {
//     if (supportsNativeSmoothScroll) {
//       nativeSmoothScrollTo(elem);
//     } else {
//       smoothScrollTo(elem.offsetTop, 600);
//     }
//   }
// };
