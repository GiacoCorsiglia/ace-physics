export const Caret = ({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) => {
  // It's useful to keep the svg a square with the caret at the bottom; this
  // makes rotating it with CSS work well.
  return (
    <svg width={size} height={size} className={className}>
      <polyline points={`0,${size} ${size / 2},${size / 2} ${size},${size}`} />
    </svg>
  );
};
