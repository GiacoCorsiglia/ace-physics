import { cx } from "@/helpers/css";
import NextImage, { ImageProps } from "next/image";
import styles from "./image.module.scss";
import { useActualSiblingCheck } from "./typography";

// This is a simple wrapper around the Next.js Image component that  facilitates
// styling (sadly we need more divs).
export const Image = ({
  maxWidth,
  inline,
  ...props
}: ImageProps & {
  maxWidth?: string;
  inline?: boolean;
}) => {
  const [wrapperRef, wrapperClasses] = useActualSiblingCheck(
    () => !inline,
    [inline]
  );

  const theImage = <NextImage {...props} />;

  if (inline) {
    // If the image is inline, it's fine the way it is (the NextImage wrapper
    // already has `display: inline-block;`).
    return theImage;
  } else if (props.layout === "responsive") {
    // If the `layout` is "responsive", then the image is supposed to fill the
    // width of the container, and will never need the centering.  Moreover, the
    // "responsive" layout *does not work* if the parent is `display:
    // inline-block`.  We still want one wrapper to facilitate styling (the
    // NextImage wrapper has margins set to 0 in inline styles).
    return (
      <div ref={wrapperRef} className={cx(styles.image, wrapperClasses)}>
        {theImage}
      </div>
    );
  }

  // Otherwise we want an image that is essentially `display: block` and is
  // centered up to its max width (which may either be defined explicitly, or
  // determined by the size of the image.)  Then we need two wrappers.
  return (
    <div
      ref={wrapperRef}
      className={cx("text-center", styles.image, wrapperClasses)}
    >
      <div className={styles.ib} style={maxWidth ? { maxWidth } : undefined}>
        {theImage}
      </div>
    </div>
  );
};
