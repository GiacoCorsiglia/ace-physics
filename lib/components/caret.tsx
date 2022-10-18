import { forwardRef } from "react";

export const Caret = forwardRef<
  SVGSVGElement,
  {
    size?: number;
    className?: string;
  }
>(function Caret({ size = 16, className }, ref) {
  // It's useful to keep the svg a square with the caret at the bottom; this
  // makes rotating it with CSS work well.
  return (
    <svg width={size} height={size} className={className} ref={ref}>
      <polyline points={`0,${size} ${size / 2},${size / 2} ${size},${size}`} />
    </svg>
  );
});
