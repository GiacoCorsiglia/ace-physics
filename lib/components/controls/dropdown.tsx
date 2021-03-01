import { borderRadius, colors, shadows, spacing } from "@/design";
import {
  castWriteable,
  Html,
  useIsomorphicLayoutEffect,
  useUniqueId,
} from "@/helpers/frontend";
import { ChevronDownIcon } from "@primer/octicons-react";
import { useSelect } from "downshift";
import { css, cx } from "linaria";
import { useRef, useState } from "react";
import { visiblyHiddenStyles } from "../style-helpers";
import { ChoicesConfigUnion, validateChoices } from "./choice-helpers";
import { useDisabled } from "./disabled";
import { ControlLabel } from "./labels";

export interface DropdownControlProps {
  label?: Html;
  placeholder?: Html;
  disabled?: boolean;
  className?: string;
}

// Things that have been styled:
// - Border color
// - Width.
// - Made things more compact
// - Table version.

export const DropdownControl = <C,>({
  choices,
  value,
  onChange,
  label,
  placeholder,
  disabled = false,
  className,
}: {
  choices: ChoicesConfigUnion<C>;
  value: C | undefined;
  onChange: (value: C | undefined) => void;
} & DropdownControlProps) => {
  validateChoices(choices);

  const uniqueId = useUniqueId();
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [openAbove, setOpenAbove] = useState(false);

  disabled = useDisabled(disabled);

  const selectedChoice = choices.find(([id]) => id === value);

  const ds = useSelect({
    id: `dropdown-${uniqueId}`,

    items: castWriteable(choices),
    // Pass `null` instead of `undefined` so downshift knows that it's always
    // controlled (it assumes it's uncontrolled when `undefined`).
    selectedItem: selectedChoice ?? null,

    onSelectedItemChange(changes) {
      onChange(changes.selectedItem?.[0]);
    },
  });

  // This could be done in a useMemo() but then the menu wouldn't actually be
  // open yet, so we couldn't measure its height.
  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    const menu = menuRef.current;
    if (!ds.isOpen || !container || !menu) {
      return;
    }
    const menuHeight = menu.offsetHeight;

    // Visibly hide it while we toggle and measure the space.
    menu.style.height = "1px";
    menu.style.clip = "rect(0 0 0 0)";
    menu.style.clipPath = "inset(50%)";

    const bottomRelativeToViewport = container.getBoundingClientRect().bottom;
    const bottomRelativeToDocument =
      window.pageYOffset + bottomRelativeToViewport;
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    ); // https://javascript.info/size-and-scroll-window
    const spaceBelow = scrollHeight - bottomRelativeToDocument;

    setOpenAbove(spaceBelow < menuHeight); // see max-height below

    menu.style.height = "";
    menu.style.clip = "";
    menu.style.clipPath = "";
  }, [ds.isOpen]);

  // Allow pressing delete to clear the selected value.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      onChange(undefined);
      e.preventDefault();
    }
  };

  return (
    <>
      {label && (
        <ControlLabel
          {...ds.getLabelProps({
            disabled,
          })}
        >
          {label}
        </ControlLabel>
      )}

      <div
        className={cx(containerCss, "ace-control", className)}
        ref={containerRef}
      >
        <button
          {...ds.getToggleButtonProps({
            disabled,
            className: cx(toggleButtonCss, ds.isOpen && toggleButtonOpenCss),
            onKeyDown,
          })}
        >
          {!selectedChoice && <span>{placeholder ?? "Select…"}</span>}

          {selectedChoice && (
            <span className={selectedPlaceholderCss}>{selectedChoice[1]}</span>
          )}

          <div className={buttonIconContainerCss}>
            <ChevronDownIcon
              className={cx(
                ds.isOpen &&
                  openAbove &&
                  css`
                    transform: rotateZ(180deg);
                  `
              )}
            />
          </div>
        </button>

        <ul
          {...ds.getMenuProps({
            disabled,
            ref: menuRef,
            className: cx(
              !ds.isOpen && menuClosedCss,
              ds.isOpen && menuOpenCss,
              ds.isOpen && openAbove && menuOpenedAboveCss,
              ds.isOpen && !openAbove && menuOpenedBelowCss
            ),
            onKeyDown,
          })}
        >
          {ds.isOpen &&
            choices.map((choice, index) => {
              const [choiceId, choiceLabel] = choice;
              const props = ds.getItemProps({
                item: choice,
                index,
                key: choiceId + "",
                className: cx(
                  menuItemCss,
                  index === ds.highlightedIndex && menuItemHighlightedCss,
                  choiceId === value && menuItemSelectedCss
                ),
                disabled,
              });
              return <li {...props}>{choiceLabel}</li>;
            })}
        </ul>
      </div>
    </>
  );
};

const containerCss = css`
  position: relative;
  background: ${colors.neutral.$50};
  border: 1px solid ${colors.neutral.$400};
  border-radius: ${borderRadius};
  color: ${colors.neutral.$500};

  &:focus-within {
    border-color: ${colors.blue.$500};
    box-shadow: 0 0 0 1px ${colors.blue.$500},
      0 1px 6px ${colors.alpha(colors.blue.$500, 0.3)};
    color: ${colors.neutral.$700};
  }
`;

const selectedPlaceholderCss = css`
  color: ${colors.neutral.$900};
`;

const toggleButtonOpenCss = css``;
const toggleButtonCss = css`
  display: flex;
  width: 100%; // Stupid buttons.
  align-items: stretch;
  text-align: left;
  padding: ${spacing.$50} ${spacing.$75}; // Needs to be the thing with the padding.
  border-radius: inherit;

  transition: border-color 75ms, color 75ms, box-shadow 75ms;

  &:focus,
  &.${toggleButtonOpenCss} {
    outline: none;
  }

  &:hover {
    color: ${colors.neutral.$700};
  }

  &:disabled {
    background: ${colors.neutral.$200};
    border-color: ${colors.neutral.$300};
    color: ${colors.neutral.$400};

    > .${selectedPlaceholderCss} {
      color: ${colors.neutral.$700};
    }
  }

  > span {
    display: block;
    padding-right: ${spacing.$75};
  }
`;

const buttonIconContainerCss = css`
  margin-left: auto;
  padding-left: ${spacing.$75};

  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid ${colors.neutral.$400};

  svg {
    width: 1em;
    height: 1em;
  }

  &:hover {
  }
`;

const menuClosedCss = css`
  ${visiblyHiddenStyles}
`;

const menuOpenedBelowCss = css`
  top: calc(100% + ${spacing.$25});
`;

const menuOpenedAboveCss = css`
  bottom: calc(100% + ${spacing.$25});
`;

const menuOpenCss = css`
  position: absolute;
  z-index: 10000;
  width: 100%;

  background: ${colors.neutral.$50};
  color: ${colors.neutral.$900};
  border: 1px solid ${colors.neutral.$400};

  padding: ${spacing.$50} 0;
  max-height: 15rem;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;

  // Match the border-radius if we're in a control group or something.
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  border-bottom-right-radius: ${borderRadius};
  border-bottom-left-radius: ${borderRadius};

  box-shadow: ${shadows.inputFocused};
  outline: none;
`;

const menuItemHighlightedCss = css``;
const menuItemSelectedCss = css``;

const menuItemCss = css`
  padding: ${spacing.$50} ${spacing.$75};

  transition: background-color 75ms, color 75ms;

  &:not(.${menuItemSelectedCss}).${menuItemHighlightedCss} {
    background-color: ${colors.blue.$200};
  }

  &.${menuItemSelectedCss} {
    background-color: ${colors.blue.$500};
    color: ${colors.white};
  }
`;
