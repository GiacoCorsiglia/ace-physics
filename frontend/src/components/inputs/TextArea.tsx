import React, { useEffect, useRef } from "react";
import * as s from "src/common/schema";
import { Field } from "src/state";
import { classes, useUniqueId } from "src/util";
import { useDisabled } from "./DisableInputs";
import styles from "./inputs.module.scss";

export default function TextArea({
  field,
  minRows = 2,
  maxRows = 8,
  label,
  ...props
}: {
  field: Field<s.StringSchema>;
  minRows?: number;
  maxRows?: number;
  label?: React.ReactNode;
} & JSX.IntrinsicElements["textarea"]) {
  const stylesRef = useRef<{
    lineHeight: number;
    padding: number;
  }>();
  const id = `textarea-${useUniqueId()}`;

  props.disabled = useDisabled(props);

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
  }, [field.value, maxRows, minRows]);

  return (
    <>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <textarea
        {...props}
        className={classes(
          styles.textArea,
          [styles.noLabel, !label],
          props.className
        )}
        id={id}
        ref={textareaRef}
        rows={rowsRef.current}
        value={field.value || ""}
        onChange={(e) => field.set(e.target.value)}
      />
    </>
  );
}
