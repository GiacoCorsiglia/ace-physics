import { PlusIcon, XIcon } from "@primer/octicons-react";
import React, { useRef } from "react";
import * as s from "src/common/schema";
import { Field } from "src/state";
import Matrix, { MatrixDisplayProps } from "./Matrix";
import styles from "./VariableLengthColumn.module.scss";

export default function VariableLengthColumn({
  field,
  inputEl,
  minRows = 1,
  maxRows = Infinity,
  ...matrixProps
}: {
  field: Field<s.ArraySchema<s.OptionalSchema<any>>>;
  inputEl: React.ReactElement;
  minRows?: number;
  maxRows?: number;
} & MatrixDisplayProps) {
  const value = field.value || [];

  // Increment this every time we splice the array so we can generate a unique
  // React key for the element, but as infrequently as possible.
  const spliceVersion = useRef(0);

  const extraRows = (v: any[], desiredLength = minRows) =>
    Array(Math.max(desiredLength - v.length, 0)).fill(undefined);

  const column = value
    .concat(extraRows(value))
    .map((_, i) => (
      <div className={styles.row} key={`${spliceVersion.current}-${i}`}>
        {React.cloneElement(inputEl, {
          field: field.elements[i],
          "aria-label": `Element ${i + 1} in the column vector`,
        })}
        <button
          type="button"
          className={styles.removeRowButton}
          disabled={value.length <= minRows}
          onClick={() => {
            const newValue = [...(field.value || [])];
            newValue.splice(i, 1);
            spliceVersion.current++;
            field.set(newValue);
          }}
          title={`Remove row ${i + 1}`}
        >
          <XIcon />
          <span className="visibly-hidden">{`Remove element ${
            i + 1
          } from the column vector`}</span>
        </button>
      </div>
    ))
    .concat(
      <button
        type="button"
        className={styles.addRowButton}
        disabled={value.length >= maxRows}
        onClick={() => {
          const latestValue = field.value || [];
          const latestExtra = extraRows(latestValue);
          const latestLength = latestValue.length + latestExtra.length;
          const newLength = latestLength + 1;
          const newValue = [...latestValue, undefined];
          const newExtra = extraRows(newValue, newLength);
          field.set(newValue.concat(newExtra));
        }}
        title="Add element"
        aria-label="Add another element at the bottom of the column vector"
      >
        <PlusIcon />
        <span>Add row</span>
      </button>
    );

  return <Matrix column={column} {...matrixProps} />;
}
