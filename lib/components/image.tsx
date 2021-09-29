import NextImage, { ImageProps } from "next/image";

// This is a simple wrapper around the Next.js Image component; wrapping it in
// another div facilitates styling.
export const Image = ({
  maxWidth,
  ...props
}: ImageProps & { maxWidth?: string }) => (
  <div className="text-center">
    {maxWidth ? (
      <div style={{ display: "inline-block", maxWidth }}>
        <NextImage {...props} />
      </div>
    ) : (
      <NextImage {...props} />
    )}
  </div>
);
