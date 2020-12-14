import { asIndex } from "common/util";
import * as f from "schema/fields";

export interface Model<F extends f.Field> {
  readonly path: readonly (string | number)[];
  readonly field: F;

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
  path: readonly (string | number)[]
): Model<F> => {
  const f: f.Field = field;

  return {
    path,
    field,

    // Add a `properties` property to hold the model for each sub-property.
    properties:
      f.kind === "object"
        ? (Object.fromEntries(
            Object.entries(f.properties).map(([key, subField]) => [
              key,
              model(subField, path.concat(key)),
            ])
          ) as any)
        : (undefined as any),

    // If tuple: Add an `elements` property to hold the models for each element.
    // If array: Add a magic `elements` property that creates a new model for
    // each element on demand.
    elements:
      f.kind === "tuple"
        ? f.elements.map((subField, i) => model(subField, path.concat(i)))
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

              return (elementModels[i] = model(f.elements, path.concat(i)));
            },
          })
        : (undefined as any),

    // Add an `other` property to hold a model for the "other" field.
    other:
      f.kind === "chooseOne" || f.kind === "chooseAll"
        ? model(f.other, path.concat("other"))
        : (undefined as any),
  };
};
