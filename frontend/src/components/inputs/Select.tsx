import React, { useMemo, useState } from "react";
import ReactSelect, { components, StylesConfig } from "react-select";
import Creatable from "react-select/creatable";
import * as s from "src/common/schema";
import { Field } from "src/state";
import { classes, Props, useUniqueId } from "src/util";
import { useDisabled } from "./DisableInputs";
import styles from "./inputs.module.scss";

type SelectChoice<T> = T extends Array<infer U> ? U : T;

export type SelectChoices<
  V extends undefined | { selected?: s.Literal } | { selected?: s.Literal[] }
> = Array<{
  value: SelectChoice<NonNullable<NonNullable<V>["selected"]>>;
  label: React.ReactNode;
}>;

export default function Select<
  C extends readonly s.Literal[],
  M extends boolean
>({
  field,
  choices: originalChoices,
  allowOther = true,
  label,
  ...props
}: {
  field: Field<s.ChoiceSchema<C, M, string>>;
  choices: ReadonlyArray<{
    value: C[number];
    label: React.ReactNode;
  }>;
  allowOther?: boolean;
  label?: React.ReactNode;
} & Props<ReactSelect<{ value: C[number]; label: React.ReactNode }>>) {
  const id = `select-${useUniqueId()}`;
  props.ACE_labelId = id;

  props.isDisabled = useDisabled(!!props.isDisabled);

  // If the schema supports multiple selections then so should the select!
  props.isMulti = field.schema.isMulti;

  // We don't support the "other" choice for multi-selects.
  if (props.isMulti) {
    allowOther = false;
  }

  // The "other" value associated with this select, if any.  We only consider
  // this value actually chosen if `field.value.selected === undefined`
  const other = field.value?.other;

  // Tracks the value of the text input associated with the select.  This is the
  // value that becomes "other" (depending on the user's actions).
  const [inputValue, setInputValue] = useState(
    (field.value?.selected === undefined ? other : "") || ""
  );

  // This tracks the open/closed status of the dropdown, to fix the behavior of
  // the `onMenuOpen` event which was called repeatedly.
  const [wasMenuOpen, setWasMenuOpen] = useState(false);

  // These are the choices the user can pick from in the select dropdown.  They
  // have to include the `other` option when it's a thing.
  const choices = useMemo(() => {
    if (allowOther && other !== undefined && other !== "") {
      return originalChoices.concat([
        { value: other, label: `Other: “${other}”` },
      ]);
    }
    return originalChoices;
  }, [originalChoices, other, allowOther]);

  // This is identically the object in the choices array representing the
  // "other" choice.  It's always the next element, which may be undefined.
  const otherChoice = choices[originalChoices.length];

  // Now we get to the business of setting the props to pass to react-select,
  // starting with the set of choices for the dropdown!
  props.options = choices;

  // Now we set the value prop of the select, which tells it which option is
  // actually selected.  React-select tracks options by object identity, whereas
  // we track options by the `value` property (string or number).
  if (field.value === undefined) {
    props.value = undefined;
  } else if (props.isMulti) {
    const selected = field.value.selected as C[number][] | undefined;
    if (selected === undefined) {
      props.value = undefined;
    } else {
      const value = choices.filter((choice) => selected.includes(choice.value));
      props.value = value.length === 0 ? undefined : value;
    }
  } else {
    const selected = field.value.selected as C[number] | undefined;
    if (selected !== undefined) {
      props.value = choices.find((choice) => choice.value === selected);
    } else if (other !== undefined) {
      // Take the "other" choice only if something else isn't explicitly
      // suggested.  The "other" choice will always be tacked onto the end.
      props.value = otherChoice;
    }
  }

  // The complement to `props.value`, this lets us set the actual field value
  // when the user selects a new option (or clears it.)
  props.onChange = (selected, meta) => {
    // Always preserve `other` unless the user has explicitly "cleared" the
    // select (via the "X" button). `selected` will always take precedence as
    // the user's choice if its set, but this way they won't lose their "Other"
    // option immediately.
    const other =
      allowOther && meta.action !== "clear" ? field.value?.other : undefined;

    if (allowOther) {
      setInputValue("");
    }

    if (selected === null || selected === undefined) {
      // Nothing's selected or something was deselected, so we just clear the
      // value of the `selected` property in the field.
      field.set({
        selected: undefined,
        other,
      });
    } else if (props.isMulti) {
      // In this case, `selected` is an array of choice objects, and we don't
      // support the Other choice.
      field.set({
        selected: (selected as any).map((s: { value: C[number] }) => s.value),
        other,
      });
    } else if (selected === otherChoice) {
      // In this case, `selected` is a single choice object.  If that object is
      // actually the Other choice, then we clear the other selection
      field.set({
        selected: undefined,
        other,
      });
    } else {
      // Otherwise we've actually selected an real choice, so set that.
      field.set({
        selected: (selected as any).value,
        other,
      });
    }
  };

  // Clearable by default.
  props.isClearable =
    props.isClearable !== undefined ? props.isClearable : true;

  // Sets the custom components we use to modify react-select.
  props.components = {
    Input: SelectInput,
  };
  props.ACE_unHideInput = false;

  const labelEl = label && (
    <label className={styles.label} htmlFor={id}>
      {label}
    </label>
  );

  props.styles = applyDefaultStyles(props.styles, {
    container: (styles) => ({ ...styles, minWidth: "12rem" }),
    // The menu needs to be above other things that have a z-index!
    menu: (styles) => ({ ...styles, zIndex: 10_000 }),
  });

  props.className = classes([styles.noLabel, !label], props.className);

  // If we're not allowing the user to input an "other" option, things are easy!
  if (!allowOther) {
    // So nice and simple.
    return (
      <>
        {labelEl}

        <ReactSelect {...props} />
      </>
    );
  }

  // The remaining code is only for the `allowOther` case.

  // Stop hiding the input when it has a value.
  props.ACE_unHideInput = true;

  // The value of the select's text input. This is normally used for searching
  // through the options, but when we `allowOther` it instead becomes the input
  // field for the "Other" option (and searching is disabled).
  props.inputValue = inputValue;

  // The complement to the `inputValue` prop, so we can update the value when
  // the user types.
  props.onInputChange = (input, meta) => {
    // This event was triggered on other actions as well...
    if (meta.action === "input-change") {
      setInputValue(input);
    }
  };

  // The following two events essentially act as onFocus/Blur for the input.
  props.onMenuOpen = () => {
    if (wasMenuOpen || inputValue) {
      return;
    }
    // This handler gets called repeatedly for some reason...
    setWasMenuOpen(true);
    if (field.value?.selected === undefined) {
      setInputValue(field.value?.other || "");
    }
  };
  props.onMenuClose = () => {
    setWasMenuOpen(false);
  };

  // Meanwhile this is `onFocus` for the whole select.
  props.onFocus = () => {
    if (field.value?.selected === undefined && !inputValue) {
      setInputValue(field.value?.other || "");
    }
  };

  // And this is `onBlur` for the whole select.
  props.onBlur = () => {
    // We still save your value if you start typing then click away.
    if (inputValue) {
      field.set({
        selected: undefined,
        other: inputValue,
      });
    }
    setInputValue("");
  };

  // Here's where we select the actual "Other" value.  This happens when the
  // user has stopped typing and has explicitly chosen the "Other" option from
  // the list (e.g., by hitting return/enter).
  props.onCreateOption = (newValue: string) => {
    // Clearing `selected` is how we actually select "Other".
    field.set({
      selected: undefined,
      other: newValue,
    });
    setInputValue("");
  };

  // This presents the option
  props.formatCreateLabel = (inputValue: string) => `Other: “${inputValue}”`;

  // Hide all options when anything is typed in the input. (Returning `false`
  // hides the option.)
  props.filterOption = (option, rawInput) => {
    if (!rawInput) {
      // Show everything when there's no input.
      return true;
    }
    if (option.value === rawInput) {
      // Show the "Other" choice.
      return true;
    }
    // Hide everything else.
    return false;
  };

  // Also modify the menu list in this case.
  props.components.MenuList = SelectMenuList;

  // We pass this value down for use in the SelectMenuList component.
  if (inputValue) {
    props.ACE_menuListMessage = "Delete to see the list of choices";
  } else {
    props.ACE_menuListMessage = "Type to input another option";
  }

  return (
    <>
      {labelEl}

      <Creatable {...props} />
    </>
  );
}

function SelectInput(props: any) {
  // Force the Input in react-select to show itself if it has a value.  This
  // feels like a total hack, but I appreciate that react-select supports this.
  const isHidden = props.selectProps.ACE_unHideInput
    ? props.isHidden && !props.value
    : props.isHidden;
  return (
    <components.Input
      {...props}
      id={props.selectProps.ACE_labelId}
      isHidden={isHidden}
    />
  );
}

function SelectMenuList(props: any) {
  // We set this above in our `Select` component.
  const message = props.selectProps.ACE_menuListMessage;
  // The theme prop is a react-select thing.
  const theme = props.theme;

  return (
    <components.MenuList {...props}>
      {props.children}
      {message && (
        <div
          style={{
            paddingTop: theme.spacing.baseUnit,
            paddingBottom: theme.spacing.baseUnit,
            paddingLeft: theme.spacing.menuGutter,
            paddingRight: theme.spacing.menuGutter,
            color: theme.colors.neutral50,
          }}
        >
          {message}
        </div>
      )}
    </components.MenuList>
  );
}

function applyDefaultStyles(
  inputs: StylesConfig | undefined,
  defaults: StylesConfig
) {
  const outputs: StylesConfig = { ...inputs };

  for (const [k, defaultStyles] of Object.entries(defaults)) {
    const property = k as keyof StylesConfig;

    const inputStyles = inputs && inputs[property];
    outputs[property] =
      inputStyles && defaultStyles
        ? (styles, state) => inputStyles(defaultStyles(styles, state), state)
        : defaultStyles || inputStyles;
  }

  return outputs;
}
