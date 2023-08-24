import { cx, useActualSiblingCheck } from "@/helpers/client";
import NextImage, { ImageProps } from "next/image";
import styles from "./image.module.scss";

// This is a simple wrapper around the Next.js Image component that facilitates
// styling (sadly we need more wrapping elements).
export const Image = ({
  maxWidth,
  inline,
  responsive,
  ...props
}: ImageProps & {
  maxWidth?: string;
  inline?: boolean;
  responsive?: boolean;
}) => {
  const [wrapperRef, wrapperClasses] = useActualSiblingCheck(
    () => !inline,
    [inline]
  );

  if (responsive) {
    props.sizes = "100vw";
    props.className = cx(props.className, styles.responsive);
  } else {
    props.className = cx(props.className, styles.maxWidth);
  }

  const theImage = <NextImage {...props} />;

  if (inline) {
    // If the image is inline, it's fine the way it is (the NextImage wrapper
    // already has `display: inline-block;`).
    return <span className={styles.ib}>{theImage}</span>;
  } else if (responsive) {
    // If the `layout` is "responsive", then the image is supposed to fill the
    // width of the container, and will never need the centering.  Moreover, the
    // "responsive" layout *does not work* if the parent is `display:
    // inline-block`.  We still want one wrapper to facilitate styling (the
    // NextImage wrapper has margins set to 0 in inline styles).
    return (
      <span ref={wrapperRef} className={cx(styles.image, wrapperClasses)}>
        {theImage}
      </span>
    );
  }

  // Otherwise we want an image that is essentially `display: block` and is
  // centered up to its max width (which may either be defined explicitly, or
  // determined by the size of the image.)  Then we need two wrappers.
  return (
    <span
      ref={wrapperRef}
      className={cx("text-center", styles.image, wrapperClasses)}
    >
      <span className={styles.ib} style={maxWidth ? { maxWidth } : undefined}>
        {theImage}
      </span>
    </span>
  );
};
