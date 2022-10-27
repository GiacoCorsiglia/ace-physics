// Scrolling.
// Source: https://nicegist.github.io/d210786daa23fd57db59634dd231f341

// Polyfilled smooth scrolling for IE, Edge, and Safari.
const smoothScrollTo = (to: number, velocity: number = 1.2) => {
  const element = document.scrollingElement || document.documentElement;

  // Clamp `to` to the maximum scroll so the duration is calculated correctly.
  const maxScroll = element.scrollHeight - element.clientHeight;
  to = Math.min(to, maxScroll);

  const start = element.scrollTop;
  const change = to - start;
  // Adjust the velocity slightly for shorter changes to keep things smooth.
  const duration = change / (velocity - velocity * Math.exp(-change / 400));

  // t = current time
  // b = start value
  // c = change in value
  // d = duration
  const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) {
      return (c / 2) * t * t + b;
    }
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const startDate = +new Date();
  const animateScroll = () => {
    const currentDate = +new Date();
    const currentTime = currentDate - startDate;
    if (currentTime < duration) {
      element.scrollTop = Math.floor(
        easeInOutQuad(currentTime, start, change, duration)
      );
      requestAnimationFrame(animateScroll);
    } else {
      element.scrollTop = to;
    }
  };
  animateScroll();
};

// Detect support for the `behavior` property in `ScrollOptions`.
const supportsNativeSmoothScroll =
  typeof document !== "undefined" &&
  "scrollBehavior" in document.documentElement.style;

export const scrollTo = (to: number) => {
  if (supportsNativeSmoothScroll) {
    window.scroll({
      behavior: "smooth",
      left: 0,
      top: to,
    });
  } else {
    smoothScrollTo(to);
  }
};

export const scrollToElement = (element: HTMLElement, offset: number = 0) =>
  scrollTo(element.getBoundingClientRect().top + window.pageYOffset - offset);
