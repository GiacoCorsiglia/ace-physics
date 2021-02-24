import { borderRadius, colors, shadows, spacing } from "@/design";
import { Html } from "@/helpers/frontend";
import { useUniqueId } from "@/util";
import { css, cx } from "linaria";
import { forwardRef } from "react";
import { useDisabled } from "./disabled";
import { InputLabel } from "./labels";

export type InputProps = { label?: Html } & Omit<
  JSX.IntrinsicElements["input"],
  "ref"
>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, id, ...props },
  ref
) {
  const autoId = `input-${useUniqueId()}`;
  const inputId = id ?? autoId;

  props.disabled = useDisabled(props);

  return (
    <>
      {label && <InputLabel htmlFor={inputId}>{label}</InputLabel>}

      <input
        {...props}
        className={cx(inputCss, inputWidthCss, props.className)}
        id={inputId}
        ref={ref}
      />
    </>
  );
});

const inputWidthCss = css`
  width: 100%; // inputs are stupid.
`;

export const inputCss = css`
  display: block;
  padding: ${spacing.$50} ${spacing.$75};
  background: ${colors.neutral.$50};
  color: ${colors.neutral.$900};
  border: 1px solid ${colors.neutral.$400};
  border-radius: ${borderRadius};
  line-height: inherit;
  /* box-shadow: ${shadows.input.neutral}; */
  transition: box-shadow 75ms ease-in-out, border-color 75ms ease-in-out;

  &::placeholder {
    color: ${colors.neutral.$600};
  }

  &:focus {
    outline: none;
    border-color: ${colors.blue.$500};
    box-shadow: 0 0 0 1px ${colors.blue.$500},
      0 1px 6px ${colors.alpha(colors.blue.$500, 0.3)};
  }

  &:disabled {
    background: ${colors.neutral.$200};
    border-color: ${colors.neutral.$300};
    color: ${colors.neutral.$700};
  }
`;
