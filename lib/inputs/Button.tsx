import { classes } from "@/util";
import Link from "next/link";
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

  const cs = classes(
    styles[kind],
    styles.noLabel,
    [styles.block, block],
    [styles.iconFirst, iconFirst],
    [styles.iconLast, !iconFirst],
    props.className
  );

  return !props.disabled && link ? (
    <Link href={link}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={cs}>{props.children}</a>
    </Link>
  ) : (
    <button {...props} type={props.type || "button"} className={cs} />
  );
}
