import {
  castWriteable,
  cx,
  Html,
  useIsomorphicLayoutEffect,
  useUniqueId,
} from "@/helpers/client";
import { ChevronDownIcon } from "@primer/octicons-react";
import { useSelect } from "downshift";
import { useRef, useState } from "react";
import { autoProse } from "../typography";
import { ChoicesConfigUnion, validateChoices } from "./choice-helpers";
import { useDisabled } from "./disabled";
import styles from "./dropdown.module.scss";
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
      document.documentElement.clientHeight,
    ); // https://javascript.info/size-and-scroll-window
    const spaceBelow = scrollHeight - bottomRelativeToDocument;

    setOpenAbove(spaceBelow < menuHeight); // see max-height below

    menu.style.height = "";
    menu.style.clip = "";
    menu.style.clipPath = "";

    const selectedLi = menu.querySelector<HTMLLIElement>(
      `.${styles.menuItemSelected}`,
    );
    if (selectedLi) {
      // TODO: I can't figure out how to get this to scroll far enough for the
      // last element in FireFox, but at least this makes the top visible.
      menu.scrollTop = selectedLi.offsetTop;
    }
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
        className={cx(styles.container, disabled && styles.disabled, className)}
        ref={containerRef}
      >
        <button
          {...ds.getToggleButtonProps({
            disabled,
            className: cx(
              styles.toggleButton,
              ds.isOpen && styles.toggleButtonOpen,
            ),
            onKeyDown,
            type: "button",
          })}
        >
          {!selectedChoice && (
            <span className={styles.placeholder}>
              {autoProse(placeholder) ?? "Select…"}
            </span>
          )}

          {selectedChoice && (
            <span className={styles.selectedLabel}>
              {autoProse(selectedChoice[1])}
            </span>
          )}

          <div className={styles.buttonIconContainer}>
            <ChevronDownIcon
              className={cx(ds.isOpen && openAbove && styles.invertedIcon)}
            />
          </div>
        </button>

        <ul
          {...ds.getMenuProps({
            disabled,
            ref: menuRef,
            className: cx(
              styles.menu,
              !ds.isOpen && styles.menuClosed,
              ds.isOpen && styles.menuOpen,
              ds.isOpen && openAbove && styles.menuOpenedAbove,
              ds.isOpen && !openAbove && styles.menuOpenedBelow,
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
                  styles.menuItem,
                  index === ds.highlightedIndex && styles.menuItemHighlighted,
                  choiceId === value && styles.menuItemSelected,
                ),
                disabled,
              });
              return <li {...props}>{autoProse(choiceLabel)}</li>;
            })}
        </ul>
      </div>
    </>
  );
};
