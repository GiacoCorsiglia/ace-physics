import { useSyncedState } from "@/helpers/frontend";
import { Input, InputProps } from "./input";

export type NumericInputProps = Omit<InputProps, "value" | "type" | "onChange">;

export const NumericInput = ({
  type,
  value,
  onChange,
  ...props
}: {
  type: "integer" | "decimal";
  value: number | undefined;
  onChange: (newValue: number | undefined) => void;
} & NumericInputProps) => {
  const implementation = type === "integer" ? integer : decimal;

  const [raw, setRaw] = useSyncedState(
    value,
    (value) => (value !== undefined ? value.toString() : ""),
    (value, raw) =>
      value === implementation.parse(raw) ||
      (value === undefined && implementation.prefixPattern.test(raw))
  );

  return (
    <Input
      {...props}
      placeholder={
        props.placeholder !== undefined ? props.placeholder : "Number"
      }
      // NOTE: <input type="number" /> is kinda fucked.
      // SEE: https://github.com/facebook/react/issues/1549
      type="text"
      // This should nonetheless trigger the numeric keyboard on mobile.
      inputMode={type === "integer" ? "numeric" : "decimal"}
      value={raw}
      onChange={(e) => {
        const input = e.target.value;

        if (input === "") {
          // Well, it's empty.
          setRaw("");
          onChange(undefined);
        } else if (implementation.prefixPattern.test(input)) {
          // They're in the process of inputting or deleting a valid input.
          setRaw(input);
          // But they haven't gotten there yet.
          onChange(undefined);
        } else if (implementation.pattern.test(input)) {
          // They've input a valid number, potentially with trailing
          // characters (which is why we don't just test this with `parse()`).
          setRaw(input);
          onChange(implementation.parse(input));
        }
        // Otherwise ignore/block additional input, but don't delete anything.
      }}
    />
  );
};

// Implementations.

interface NumericImplementation {
  readonly parse: (raw: string) => number;
  readonly pattern: RegExp;
  readonly prefixPattern: RegExp;
}

// Decimal.

const decimal: NumericImplementation = {
  parse: parseFloat,
  // Matches decimal strings, with optional leading "+" or "-", trailing ".".
  pattern: /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/,
  // These strings must be allowed to let people type decimals or negatives.
  prefixPattern: /^(?:\+|-|\.|\+\.|-\.)$/,
};

// Integer.

const integer: NumericImplementation = {
  parse: parseInt,
  // Matches integer strings, with optional leading "+" or "-".
  pattern: /^[+-]?\d+$/,
  // These strings must be allowed to let people type negatives.
  prefixPattern: /^[+-]$/,
};
