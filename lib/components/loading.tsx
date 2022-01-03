import { cx, Html, range } from "@/helpers/frontend";
import styles from "./loading.module.scss";

export const LoadingAnimation = ({
  size = "medium",
  message = "Loading…",
}: {
  size?: "small" | "medium" | "large";
  message?: Html;
}) => (
  <div
    className={cx(
      styles.loadingAnimation,
      size === "small" && styles.sizeSmall,
      size === "medium" && styles.sizeMedium,
      size === "large" && styles.sizeLarge
    )}
  >
    {svg}
    {message && <p className={styles.message}>{message}</p>}
  </div>
);

const height = 48;
const cycleWidth = 60;
const viewBoxHeight = height + 12;
const viewBoxWidth = cycleWidth * 3;

const center = viewBoxHeight / 2;

const cycle = (x: number, amplitudeScale: number) => {
  const maxOffset = 32;
  const offset = amplitudeScale * maxOffset;
  return (
    `C ` +
    `${12 + x} ${center - offset} ` +
    `${18 + x} ${center - offset} ` +
    `${30 + x} ${center} ` +
    `C ` +
    `${42 + x} ${center + offset} ` +
    `${48 + x} ${center + offset} ` +
    `${60 + x} ${center}`
  );
};

const sineWave = (x: number, amplitudeScale: number) => {
  const cycles = 4;
  const d = range(cycles)
    .map((i) => cycle(i * cycleWidth + x, amplitudeScale))
    .join(" ");
  return `M ${x} ${center} ${d}`;
};

const real = sineWave(0, 1);
const realFlat = sineWave(0, 0);
const realReversed = sineWave(0, -1);

const imaginaryOffset = (-3 * cycleWidth) / 4;
const imaginary = sineWave(imaginaryOffset, 1);
const imaginaryFlat = sineWave(imaginaryOffset, 0);
const imaginaryReversed = sineWave(imaginaryOffset, -1);

const duration = "5s";

const svg = (
  <svg
    viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Loading…</title>

    <line
      stroke="rgb(203, 187, 169)"
      x1="0"
      y1={center}
      x2="180"
      y2={center}
    ></line>

    <path
      // Must use style or Chrome doesn't play the animation.
      style={{
        fill: "none",
        stroke: "hsl(11, 70.3%, 41%)",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "4px",
      }}
      d={imaginaryFlat}
    >
      <animate
        attributeName="d"
        attributeType="XML"
        repeatCount="indefinite"
        dur={duration}
        values={`${imaginaryFlat}; ${imaginary}; ${imaginaryFlat}; ${imaginaryReversed}; ${imaginaryFlat}`}
      />
    </path>

    <path
      style={{
        fill: "none",
        stroke: "hsl(221, 90.4%, 36.9%)",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "4px",
      }}
      d={real}
      values={`${real}; ${realFlat}; ${realReversed}; ${realFlat}; ${real}`}
    >
      <animate
        attributeName="d"
        attributeType="XML"
        repeatCount="indefinite"
        dur={duration}
        values={`${real}; ${realFlat}; ${realReversed}; ${realFlat}; ${real}`}
      />
    </path>
  </svg>
);
