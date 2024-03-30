import { cx, Html, useUniqueId } from "@/helpers/client";
import { forwardRef } from "react";
import { useDisabled } from "./disabled";
import styles from "./input.module.scss";
import { ControlLabel } from "./labels";

export type InputControlProps = {
  label?: Html;
  maxWidth?: boolean;
} & Omit<JSX.IntrinsicElements["input"], "ref">;

export const InputControl = forwardRef<HTMLInputElement, InputControlProps>(
  function InputControl({ label, maxWidth, id, ...props }, ref) {
    const autoId = `input-${useUniqueId()}`;
    const inputId = id ?? autoId;

    props.disabled = useDisabled(props);

    return (
      <>
        {label && <ControlLabel htmlFor={inputId}>{label}</ControlLabel>}

        <input
          {...props}
          className={cx(
            styles.input,
            maxWidth && styles.maxWidth,
            props.className,
          )}
          id={inputId}
          ref={ref}
        />
      </>
    );
  },
);
