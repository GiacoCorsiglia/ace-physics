import { asIndex } from "@/helpers";
import type * as f from "@/schema/fields";
import { Infer } from "@/schema/types";
import type { ModelContext } from "./model-state-tree";

export interface Model<F extends f.Field = f.Field> {
  readonly path: readonly (string | number)[];
  readonly field: F;

  /** @internal */
  readonly Context: React.Context<ModelContext>;

  // Extra fields depending on the field type.  Using these conditionals is
  // probably better than a union type?

  // ObjectField.
  readonly properties: F extends f.ObjectField<infer P>
    ? {
        readonly [K in keyof P]: Model<P[K]>;
      }
    : never;

  // TupleField or ArrayField.
  readonly elements: F extends f.TupleField<infer Es>
    ? {
        readonly [I in keyof Es]: Es[I] extends f.Field ? Model<Es[I]> : Es[I];
      }
    : F extends f.ArrayField<infer E>
    ? ReadonlyArray<Model<E>>
    : never;

  // Choose.
  readonly other: F extends
    | f.ChooseOneField<any, infer O>
    | f.ChooseAllField<any, infer O>
    ? Model<O>
    : never;
}

export const model = <F extends f.Field>(
  field: F,
  path: readonly (string | number)[],
  Context: React.Context<ModelContext>
): Model<F> => {
  const f: f.Field = field;

  return {
    path,
    field,

    Context,

    // Add a `properties` property to hold the model for each sub-property.
    properties:
      f.kind === "object"
        ? (Object.fromEntries(
            Object.entries(f.properties).map(([key, subField]) => [
              key,
              model(subField, path.concat(key), Context),
            ])
          ) as any)
        : (undefined as any),

    // If tuple: Add an `elements` property to hold the models for each element.
    // If array: Add a magic `elements` property that creates a new model for
    // each element on demand.
    elements:
      f.kind === "tuple"
        ? f.elements.map((subField, i) =>
            model(subField, path.concat(i), Context)
          )
        : f.kind === "array"
        ? new Proxy([] as Model<f.Field>[], {
            has(elementModels, property) {
              const i = asIndex(property);
              if (i === null) {
                return property in elementModels;
              }
              return true;
            },

            get(elementModels, property) {
              if (elementModels[property as any] !== undefined) {
                return elementModels[property as any];
              }

              const i = asIndex(property);
              if (i === null) {
                return undefined;
              }

              return (elementModels[i] = model(
                f.elements,
                path.concat(i),
                Context
              ));
            },
          })
        : (undefined as any),

    // Add an `other` property to hold a model for the "other" field.
    other:
      f.kind === "chooseOne" || f.kind === "chooseAll"
        ? model(f.other, path.concat("other"), Context)
        : (undefined as any),
  };
};

export const isSet = <F extends f.Field>(
  model: Model<F>,
  value: Infer<F["type"]> | undefined
): boolean => {
  // Guard since this function is used dynamically.
  if (model === undefined) {
    return true; // Vacuously true.
  }

  if (value === undefined) {
    return false;
  }

  const v: any = value;
  switch (model.field.kind) {
    case "boolean":
    case "number":
    case "cases":
      return true;
    case "string":
      return !!v;
    case "chooseOne":
      return v.selected !== undefined || isSet(model.other, v.other);
    case "chooseAll":
      // If it's a multi-select, make sure it's not an empty array.
      return (
        (v.selected !== undefined && !!v.selected.length) ||
        isSet(model.other, v.other)
      );
    case "tuple":
      return model.elements.every((m, i) => isSet(m, v[i]));
    case "array":
      // There should be at least one element in the array, and it shouldn't
      // have any empty slots.
      return (
        !!v.length &&
        v.every((subValue: any, i: number) =>
          isSet(model.elements[i], subValue)
        )
      );
    case "object":
      return Object.entries(model.properties).every(([key, subModel]) =>
        isSet(subModel, v[key])
      );
  }
};
