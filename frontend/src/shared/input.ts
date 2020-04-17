import { useState } from "react";
import { Model } from "./state";

interface Input<ValueType> {
  toJs(raw: string): ValueType;
  toRaw(js: ValueType): string;
}

export function useInput<ValueType>(
  input: Input<ValueType>,
  model: Model<ValueType>
) {
  const [rawValue, setRawValue] = useState(input.toRaw(model.value));

  const bind = {
    value: rawValue,
    onChange(event: React.ChangeEvent<HTMLInputElement>) {
      const newRawValue = event.target.value;
      setRawValue(newRawValue);
      model.set(input.toJs(newRawValue));
    },
  };

  return bind;
}

export function StringInput(): Input<string> {
  return {
    toJs: (raw) => raw,
    toRaw: (string) => string,
  };
}

export function IntegerInput(): Input<number> {
  return {
    toJs: (raw) => parseInt(raw),
    toRaw: (int) => int.toString(),
  };
}

export function FloatInput(): Input<number> {
  return {
    toJs: (raw) => parseFloat(raw),
    toRaw: (float) => float.toString(),
  };
}
