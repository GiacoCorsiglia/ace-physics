import * as s from "ace-common/src/schema";
import { useState } from "react";
import { Field } from "./state";

interface Input<ValueType> {
  toJs(raw: string): ValueType;
  toRaw(js: ValueType | undefined): string;
}

export function useInput<ValueType extends s.Data>(
  input: Input<ValueType>,
  field: Field<ValueType>
) {
  const [rawValue, setRawValue] = useState(input.toRaw(field.value));

  const bind = {
    value: rawValue,
    onChange(event: React.ChangeEvent<HTMLInputElement>) {
      const newRawValue = event.target.value;
      setRawValue(newRawValue);
      field.set(input.toJs(newRawValue));
    },
  };

  return bind;
}

export function StringInput(): Input<string> {
  return {
    toJs: (raw) => raw,
    toRaw: (string) => string || "",
  };
}

export function IntegerInput(): Input<number> {
  return {
    toJs: (raw) => parseInt(raw),
    toRaw: (int) => (int !== undefined ? int.toString() : ""),
  };
}

export function FloatInput(): Input<number> {
  return {
    toJs: (raw) => parseFloat(raw),
    toRaw: (float) => (float !== undefined ? float.toString() : ""),
  };
}
