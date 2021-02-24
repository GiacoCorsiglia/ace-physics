import { Html, useUniqueId } from "@/helpers/frontend";
import { css, cx } from "linaria";
import React, { useEffect, useRef } from "react";
import { Input, inputCss, InputProps } from "./input";
import { InputLabel } from "./labels";

export type TextInputProps = Omit<InputProps, "type" | "value" | "onChange">;

export const TextInput = ({
  value,
  onChange,
  ...props
}: {
  value: string | undefined;
  onChange: (newValue: string) => void;
} & TextInputProps) => {
  return (
    <Input
      {...props}
      type="text"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={props.placeholder ?? "Type here"}
    />
  );
};

export type MultiLineTextInputProps = {
  label?: Html;
  minRows?: number;
  maxRows?: number;
} & Omit<JSX.IntrinsicElements["textarea"], "value" | "onChange" | "ref">;

export const MultiLineTextInput = ({
  value,
  onChange,
  label,
  minRows = 2,
  maxRows = 8,
  ...props
}: {
  value: string | undefined;
  onChange: (newValue: string) => void;
} & MultiLineTextInputProps) => {
  const id = `textarea-${useUniqueId()}`;

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
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}

      <textarea
        {...props}
        ref={textareaRef}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        id={id}
        className={cx(inputCss, textAreaCss, props.className)}
        placeholder={props.placeholder ?? "Type your response here"}
        rows={rowsRef.current}
      />
    </>
  );
};

const textAreaCss = css`
  width: 100%;
  resize: vertical;
  min-height: 3rem;
  // FireFox made the textarea too tall by default; apparently it tries to leave
  // room for a horizontal scroll bar, which we shouldn't ever have.  This rule
  // targets Firefox only.
  // https://stackoverflow.com/a/22700700
  @-moz-document url-prefix() {
    overflow-x: hidden;
  }
`;
