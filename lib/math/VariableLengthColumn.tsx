import { Field } from "@/state";
import { PlusIcon, XIcon } from "@primer/octicons-react";
import * as s from "common/schema";
import { cloneElement, useRef } from "react";
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

  const addRow = () => {
    if (value.length >= maxRows) {
      return;
    }

    const latestValue = field.value || [];
    const latestExtra = extraRows(latestValue);
    const latestLength = latestValue.length + latestExtra.length;
    const newLength = latestLength + 1;
    const newValue = [...latestValue, undefined];
    const newExtra = extraRows(newValue, newLength);
    field.set(newValue.concat(newExtra));
  };

  const column = value
    .concat(extraRows(value))
    .map((_, i, fullArray) => {
      const removeRow = () => {
        if (value.length <= minRows) {
          return;
        }

        const newValue = [...(field.value || [])];
        newValue.splice(i, 1);
        spliceVersion.current++;
        field.set(newValue);
      };

      const elementField = field.elements[i];
      return (
        <div className={styles.row} key={`${spliceVersion.current}-${i}`}>
          {cloneElement(inputEl, {
            field: elementField,
            "aria-label": `Element ${i + 1} in the column vector`,
            autoFocus:
              i !== 0 &&
              elementField.value === undefined &&
              i === fullArray.length - 1,
            onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                addRow();
                e.preventDefault();
              }
            },
            onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
              // onKeyPress didn't detect this for some reason.
              if (
                (e.key === "Delete" || e.key === "Backspace") &&
                !elementField.value
              ) {
                removeRow();
                e.preventDefault();
              }
            },
          })}
          <button
            type="button"
            className={styles.removeRowButton}
            disabled={value.length <= minRows}
            onKeyPress={(e) => {}}
            onClick={removeRow}
            title={`Remove row ${i + 1}`}
          >
            <XIcon />
            <span className="visibly-hidden">
              Remove element {i + 1} from the column vector. You can also press
              the Delete or Backspace key.
            </span>
          </button>
        </div>
      );
    })
    .concat(
      <>
        <button
          type="button"
          className={styles.addRowButton}
          disabled={value.length >= maxRows}
          onClick={addRow}
          title="Add element"
          aria-label="Add another element at the bottom of the column vector"
        >
          <PlusIcon />
          <span>Add row</span>
        </button>

        <p
          className="text-smallest text-center opacity-faded"
          style={{ marginTop: ".4rem" }}
        >
          Click or press Enter
        </p>
      </>
    );

  return <Matrix column={column} {...matrixProps} />;
}
