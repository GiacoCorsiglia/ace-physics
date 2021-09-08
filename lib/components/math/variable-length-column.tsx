import { Html, isReactElement, styled } from "@/helpers/frontend";
import { Model, useModel } from "@/reactivity";
import { ArrayField, Field } from "@/schema/fields";
import { PlusIcon, XIcon } from "@primer/octicons-react";
import { cloneElement, useRef } from "react";
import { VisiblyHidden } from "../style-helpers";
import { Matrix, MatrixDisplayProps } from "./matrix";
import styles from "./variable-length-column.module.scss";

export const VariableLengthColumn = <E extends Field>({
  model,
  component,
  minRows = 1,
  maxRows = Infinity,
  ...matrixProps
}: {
  model: Model<ArrayField<E>>;
  component: (
    componentModel: Model<E>,
    row: number,
    inputProps: JSX.IntrinsicElements["input"]
  ) => Html;
  minRows?: number;
  maxRows?: number;
} & MatrixDisplayProps) => {
  const [mValue, setValue] = useModel(model);
  const value = mValue || [];

  // Increment this every time we splice the array so we can generate a unique
  // React key for the element, but as infrequently as possible.
  const spliceVersion = useRef(0);

  const extraRows = (v: readonly any[], desiredLength = minRows) =>
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

      const inputProps: JSX.IntrinsicElements["input"] = {
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
      };

      let element = component(elementModel, i, inputProps);
      if (isReactElement(element) && component.length < 3) {
        // If the function didn't take the inputProps, let's apply them
        // automatically here.
        element = cloneElement(element, inputProps);
      }

      return (
        <ColumnVectorRow key={`${spliceVersion.current}-${i}`}>
          {element}

          <RemoveRowButton
            type="button"
            disabled={value.length <= minRows}
            // onKeyPress={() => {}}
            onClick={removeRow}
            title={`Remove element ${i + 1}`}
          >
            <XIcon />

            <VisiblyHidden>
              Remove element {i + 1} from the column vector. You can also press
              the Delete or Backspace key.
            </VisiblyHidden>
          </RemoveRowButton>
        </ColumnVectorRow>
      );
    })
    .concat(
      <>
        <AddRowButton
          type="button"
          disabled={value.length >= maxRows}
          onClick={addRow}
          title="Add element"
          aria-label="Add another element at the bottom of the column vector"
        >
          <PlusIcon />
          <span>Add row</span>
        </AddRowButton>

        <AddRowMessage>Click or press Enter</AddRowMessage>
      </>
    );

  return <Matrix column={column} {...matrixProps} />;
};

const ColumnVectorRow = styled.div(styles.columnVectorRow);
const RemoveRowButton = styled.button(styles.removeRowButton);
const AddRowButton = styled.button(styles.addRowButton);
const AddRowMessage = styled.p(styles.addRowMessage);
