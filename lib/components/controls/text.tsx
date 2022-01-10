import { combineRefs, cx, Html, useUniqueId } from "@/helpers/client";
import { forwardRef, useEffect, useRef } from "react";
import { useDisabled } from "./disabled";
import { InputControl, InputControlProps } from "./input";
import { ControlLabel } from "./labels";
import styles from "./text.module.scss";

export type TextInputControlProps = Omit<
  InputControlProps,
  "type" | "value" | "onChange"
>;

export const TextInputControl = forwardRef<
  HTMLInputElement,
  {
    value: string | undefined;
    onChange: (newValue: string) => void;
  } & TextInputControlProps
>(function TextInputControl({ value, onChange, ...props }, ref) {
  return (
    <InputControl
      {...props}
      type="text"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={props.placeholder ?? "Type here"}
      ref={ref}
    />
  );
});

export type TextAreaControlProps = {
  label?: Html;
  minRows?: number;
  maxRows?: number;
} & Omit<JSX.IntrinsicElements["textarea"], "value" | "onChange" | "ref">;

export const TextBoxControl = forwardRef<
  HTMLTextAreaElement,
  {
    value: string | undefined;
    onChange: (newValue: string) => void;
  } & TextAreaControlProps
>(function TextAreaControl(
  { value, onChange, label, minRows = 2, maxRows = 8, ...props },
  forwardedRef
) {
  const id = `textarea-${useUniqueId()}`;

  const disabled = useDisabled(props);

  const stylesRef = useRef<{
    lineHeight: number;
    padding: number;
  }>();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const rowsRef = useRef(minRows);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) {
      return;
    }
    if (stylesRef.current === undefined) {
      const computed = window.getComputedStyle(el);

      stylesRef.current = {
        lineHeight: parseFloat(computed.lineHeight),
        padding:
          computed.boxSizing === "border-box"
            ? parseFloat(computed.paddingTop) +
              parseFloat(computed.paddingBottom)
            : 0,
      };
    }

    const styles = stylesRef.current;
    if (isNaN(styles.lineHeight) || isNaN(styles.padding)) {
      return;
    }

    // Reset so we can measure the height needed.
    el.rows = minRows;
    // Measure the height
    const currentHeight = el.scrollHeight - styles.padding;
    // Calculate the number of rows we need
    const idealRows = Math.ceil(currentHeight / styles.lineHeight);
    const newRows = Math.max(Math.min(idealRows, maxRows), minRows);
    // Imperatively set the number of rows to what we need right now
    el.rows = newRows;
    // Make sure we're scrolled all the way to the bottom if necessary.
    if (newRows <= idealRows) {
      el.scrollTop = currentHeight + styles.padding;
    }
    // Also store this in a ref for the next render.
    rowsRef.current = newRows;
  }, [value, maxRows, minRows]);

  return (
    <>
      {label && <ControlLabel htmlFor={id}>{label}</ControlLabel>}

      <textarea
        {...props}
        ref={combineRefs(textareaRef, forwardedRef)}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        id={id}
        className={cx(styles.textArea, props.className)}
        placeholder={props.placeholder ?? "Type your response here"}
        rows={rowsRef.current}
        disabled={disabled}
      />
    </>
  );
});
