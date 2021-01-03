import { Html } from "@/helpers/frontend";
import { Model, useModel } from "@/reactivity";
import { StringField } from "@/schema/fields";
import { classes, useUniqueId } from "@/util";
import { useDisabled } from "./DisableInputs";
import styles from "./inputs.module.scss";

export default function Text({
  model,
  label = undefined,
  maxWidth = false,
  ...props
}: {
  model: Model<StringField>;
  label?: Html;
  maxWidth?: boolean;
} & JSX.IntrinsicElements["input"]) {
  const [value, setValue] = useModel(model);

  const id = `text-${useUniqueId()}`;

  props.disabled = useDisabled(props);

  return (
    <>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <input
        {...props}
        placeholder={
          props.placeholder !== undefined
            ? props.placeholder
            : maxWidth
            ? "Type here"
            : "Type your response here"
        }
        className={classes(
          styles.textInput,
          [styles.noLabel, !label],
          [styles.textInputMaxWidth, maxWidth],
          props.className
        )}
        id={id}
        type="text"
        value={value || ""}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
}
