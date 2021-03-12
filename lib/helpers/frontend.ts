/**
 * Import helpers from this file when code should be able to run in the api, or
 * in scripts (i.e., anywhere that React shouldn't be imported).
 */
export * from "./css";
export * from "./function-helpers";
export * from "./react-helpers";
export * from "./result";
export * from "./type-helpers";

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
