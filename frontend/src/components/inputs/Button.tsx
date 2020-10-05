import React from "react";
import { Link } from "react-router-dom";
import { classes } from "src/util";
import { useDisabled } from "./DisableInputs";
import styles from "./inputs.module.scss";

export default function Button({
  kind = "primary",
  block = false,
  link,
  iconFirst,
  ...props
}: JSX.IntrinsicElements["button"] & {
  kind?: "primary" | "secondary" | "tertiary";
  block?: boolean;
  link?: string;
  iconFirst?: boolean;
}) {
  props.disabled = useDisabled(props);
  const As = !props.disabled && link ? Link : "button";

  return (
    <As
      {...(props as any)}
      to={link}
      type={props.type || "button"}
      className={classes(
        styles[kind],
        styles.noLabel,
        [styles.block, block],
        [styles.iconFirst, iconFirst],
        [styles.iconLast, !iconFirst],
        props.className
      )}
    />
  );
}
