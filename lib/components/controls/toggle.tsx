import { borderRadius, colors, spacing } from "@/design";
import { Html, useUniqueId } from "@/helpers/frontend";
import { css, cx } from "linaria";
import { ChoicesConfigUnion, validateChoices } from "./choice-helpers";
import { InputLabel } from "./labels";

export interface ToggleInputProps {
  label?: Html;
  layout?: "horizontal" | "vertical" | "grid";
  disabled?: boolean;
}

export const ToggleInput = <C,>({
  selected,
  choices,
  onSelect,
  onDeselect,
  label,
  layout = "horizontal",
  disabled = false,
}: {
  selected: C | undefined;
  choices: ChoicesConfigUnion<C>;
  onSelect: (choice: C) => void;
  onDeselect: (choice: C) => void;
} & ToggleInputProps) => {
  validateChoices(choices);

  const toggleId = `toggle-${useUniqueId()}`;
  // Use an underscore to not overlap with `{${toggleId}-${choice}}`.
  const labelId = `${toggleId}_legend`;

  const needsWrapper = layout === "vertical" || layout === "grid";

  const choicesEl = (
    <div
      className={cx(
        layout === "horizontal" &&
          css`
            display: flex;
          `,
        layout === "vertical" &&
          css`
            display: inline-flex;
            flex-direction: column;
            align-items: stretch;
          `,
        layout === "grid" &&
          css`
            display: inline-grid;
            grid-template-columns: 1fr 1fr;
          `
      )}
      role="group"
      aria-labelledby={label ? labelId : undefined}
    >
      {choices.map(([choiceId, choiceLabel]) => (
        <label
          key={choiceId + ""}
          htmlFor={`${toggleId}-${choiceId}`}
          data-selected={selected === choiceId || undefined}
          data-disabled={disabled || undefined}
          className={cx(
            css`
              display: block;
              background: ${colors.neutral.$50};
              color: ${colors.neutral.$900};
              border: 1px solid ${colors.neutral.$400};
              padding: ${spacing.$50} ${spacing.$100};
              text-align: center;
              transition: background-color 75ms ease-in-out,
                border-color 75ms ease-in-out, box-shadow 75ms ease-in-out,
                color 75ms ease-in-out;

              // TODO:
              :global(table) & {
                flex-grow: 1;
              }

              &:not([data-disabled]):not([data-selected]):hover,
              &:focus-within {
                border-color: ${colors.neutral.$500};
                background-color: ${colors.blue.$200};
              }

              &:not([data-disabled]):active,
              &[data-selected] {
                background-color: ${colors.blue.$500};
                color: ${colors.white};
                border-color: ${colors.blue.$500};
                position: relative;
                z-index: 2;
              }

              &:not([data-selected])[data-disabled] {
                color: ${colors.neutral.$700};
                background-color: ${colors.neutral.$200};
                border-color: ${colors.neutral.$300};
              }

              &[data-selected]:focus-within {
                box-shadow: 0 0 0 2px ${colors.blue.$400};
              }
            `,
            layout === "horizontal" &&
              css`
                margin-left: -1px;

                &:first-child {
                  margin-left: 0;
                  border-top-left-radius: ${borderRadius};
                  border-bottom-left-radius: ${borderRadius};
                }

                &:last-child {
                  border-top-right-radius: ${borderRadius};
                  border-bottom-right-radius: ${borderRadius};
                }
              `,
            layout === "vertical" &&
              css`
                margin-top: -1px;

                &:first-child {
                  margin-top: 0;
                  border-top-left-radius: ${borderRadius};
                  border-top-right-radius: ${borderRadius};
                }

                &:last-child {
                  border-bottom-left-radius: ${borderRadius};
                  border-bottom-right-radius: ${borderRadius};
                }
              `,
            layout === "grid" &&
              css`
                &:nth-child(2n) {
                  margin-left: -1px;
                }

                &:not(:first-child):not(:nth-child(2)) {
                  margin-top: -1px;
                }

                &:first-child {
                  border-top-left-radius: ${borderRadius};
                }

                &:nth-child(2) {
                  border-top-right-radius: ${borderRadius};
                }

                &:nth-last-child(2) {
                  border-bottom-left-radius: ${borderRadius};
                }

                &:last-child {
                  border-bottom-right-radius: ${borderRadius};
                }
              `
          )}
        >
          <input
            type="radio"
            disabled={disabled}
            className={css`
              position: absolute;
              clip: rect(0, 0, 0, 0);
              pointer-events: none;
            `}
            value={choiceId + ""}
            name={choiceId + ""}
            id={`${toggleId}-${choiceId}`}
            checked={selected === choiceId}
            onChange={(e) =>
              e.target.checked ? onSelect(choiceId) : onDeselect(choiceId)
            }
          />
          {choiceLabel}
        </label>
      ))}
    </div>
  );

  return (
    <>
      {label && (
        <InputLabel as="div" id={labelId}>
          {label}
        </InputLabel>
      )}

      {needsWrapper ? <div>{choicesEl}</div> : choicesEl}
    </>
  );
};
