import { borderRadius, colors, fonts, spacing } from "@/design";
import { Html, isReactElement } from "@/helpers/frontend";
import { Model, useModel } from "@/reactivity";
import { ArrayField, Field } from "@/schema/fields";
import { PlusIcon, XIcon } from "@primer/octicons-react";
import { styled } from "linaria/react";
import { cloneElement, useRef } from "react";
import { VisiblyHidden } from "../style-helpers";
import { Matrix, MatrixDisplayProps } from "./matrix";

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
            onKeyPress={(e) => {}}
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

const ColumnVectorRow = styled.div`
  display: flex;
  align-items: center;

  input {
    max-width: 10rem;
  }
`;

const ColumnVectorButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  ${fonts.ui};
  border-radius: ${borderRadius};
  border-width: 1px;
  border-style: solid;
  border-color: ${colors.neutral.$400};
  background: none;
  color: inherit;
  opacity: 0.5;
  transition: opacity 75ms ease-in-out, color 75ms ease-in-out;

  &:not(:disabled) {
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.25;
  }

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    opacity: 1;
    color: ${colors.blue.$500};
  }

  &:active,
  &:focus {
    outline: none;
  }

  &:active {
    transition-duration: 150ms;
  }

  & :global(.octicon) {
    display: block !important;
    height: ${fonts.ui.fontSize};
    width: auto;
  }
`;

const RemoveRowButton = styled(ColumnVectorButton)`
  margin-left: ${spacing.$50};
  padding: 0 ${spacing.$25};
`;

const AddRowButton = styled(ColumnVectorButton)`
  width: 100%;
  padding: 0 ${spacing.$100};

  span {
    ${fonts.uiSmall};
    padding-left: ${spacing.$50};
    position: relative;
    top: -0.1rem;
  }
`;

const AddRowMessage = styled.p`
  margin-top: ${spacing.$25};
  ${fonts.smallest};
  text-align: center;
  color: ${colors.neutral.$700};
`;
