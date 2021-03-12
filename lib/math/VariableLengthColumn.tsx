import { Model, useModel } from "@/reactivity";
import { ArrayField } from "@/schema/fields";
import { PlusIcon, XIcon } from "@primer/octicons-react";
import { cloneElement, useRef } from "react";
import Matrix, { MatrixDisplayProps } from "./Matrix";
import styles from "./VariableLengthColumn.module.scss";

export default function VariableLengthColumn({
  model,
  inputEl,
  minRows = 1,
  maxRows = Infinity,
  ...matrixProps
}: {
  model: Model<ArrayField<any>>;
  inputEl: React.ReactElement;
  minRows?: number;
  maxRows?: number;
} & MatrixDisplayProps) {
  const [mValue, setValue] = useModel(model);
  const value = mValue || [];

  // Increment this every time we splice the array so we can generate a unique
  // React key for the element, but as infrequently as possible.
  const spliceVersion = useRef(0);

  const extraRows = (v: any[], desiredLength = minRows) =>
    Array(Math.max(desiredLength - v.length, 0)).fill(undefined);

  const addRow = () =>
    setValue((oldValue) => {
      if (oldValue && oldValue.length >= maxRows) {
        return oldValue;
      }

      const latestValue = oldValue || [];
      const latestExtra = extraRows(latestValue);
      const latestLength = latestValue.length + latestExtra.length;
      const newLength = latestLength + 1;
      const newValue = [...latestValue, undefined];
      const newExtra = extraRows(newValue, newLength);
      return newValue.concat(newExtra);
    });

  const column = value
    .concat(extraRows(value))
    .map((_, i, fullArray) => {
      const removeRow = () =>
        setValue((oldValue) => {
          if (oldValue && oldValue.length <= minRows) {
            return oldValue;
          }

          const newValue = oldValue ? [...oldValue] : [];
          newValue.splice(i, 1);
          spliceVersion.current++;
          return newValue;
        });

      const elementModel = model.elements[i];
      return (
        <div className={styles.row} key={`${spliceVersion.current}-${i}`}>
          {cloneElement(inputEl, {
            model: elementModel,
            "aria-label": `Element ${i + 1} in the column vector`,
            autoFocus:
              i !== 0 && value[i] === undefined && i === fullArray.length - 1,
            onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                addRow();
                e.preventDefault();
              }
            },
            onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
              // onKeyPress didn't detect this for some reason.
              if ((e.key === "Delete" || e.key === "Backspace") && !value[i]) {
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
