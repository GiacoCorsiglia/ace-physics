import { Html } from "@/helpers/frontend";
import { Model, useModel } from "@/reactivity";
import { BooleanField } from "@/schema/fields";
import ToggleCore, { ToggleCoreProps } from "./ToggleCore";

export default function BooleanToggle({
  model,
  yes = "Yes",
  no = "No",
  ...props
}: {
  model: Model<BooleanField>;
  yes?: Html;
  no?: Html;
} & ToggleCoreProps) {
  const [value, setValue] = useModel(model);

  return (
    <ToggleCore
      selected={value}
      choices={[
        // I think True/False or Yes/No is better than the reversed order.
        { value: true, label: yes },
        { value: false, label: no },
      ]}
      onSelect={setValue}
      onDeselect={(newValue) =>
        setValue((oldValue) => (oldValue === newValue ? undefined : oldValue))
      }
      {...props}
    />
  );
}
