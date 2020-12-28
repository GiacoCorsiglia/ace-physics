import * as s from "common/schema";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { Children, Writeable } from "./util";

////////////////////////////////////////////////////////////////////////////////
// Store.
////////////////////////////////////////////////////////////////////////////////

interface Store<P extends s.Properties> {
  readonly schema: ProviderSchema<P>;
  readonly fields: ProviderFields<P>;
}

const StoreContext = createContext<Store<any>>({} as any);
StoreContext.displayName = "StoreContext";

export type ProviderSchema<P extends s.Properties = any> = s.RecordSchema<P>;
export type ProviderFields<P extends s.Properties = any> = Readonly<
  { [K in keyof P]: Field<P[K]> }
>;

export function Provider<P extends s.Properties>({
  schema,
  initial,
  onChange,
  children,
}: {
  schema: ProviderSchema<P>;
  initial?: s.TypeOf<ProviderSchema<P>>;
  onChange?: (updated: s.TypeOf<ProviderSchema<P>>) => void;
} & Children) {
  const stateRef = useRef<Store<P>>();

  // Doing this allows us to create the callbacks once, but still always respect
  // the most up-to-date callback.
  const onChangeRef = useRef<(updated: s.TypeOf<ProviderSchema<P>>) => void>();
  onChangeRef.current = onChange;

  // Initialize it once.
  if (stateRef.current === undefined) {
    const changeHandler = () => {
      if (!onChangeRef.current) {
        return;
      }
      const values: any = {};
      const fields = stateRef.current!.fields;
      for (const key in fields) {
        // No hasOwnProperty check required since it has a `null` prototype.
        if (fields[key].value !== undefined) {
          values[key] = fields[key].value;
        }
      }
      onChangeRef.current(values);
    };

    const fields: Writeable<ProviderFields<P>> = Object.create(null);
    for (const key in schema.properties) {
      if (schema.properties.hasOwnProperty(key)) {
        const value = initial ? initial[key] : undefined;
        fields[key] = Field(key, schema.properties[key], value as any);
        fields[key].subscribe(changeHandler);
      }
    }

    stateRef.current = { schema, fields };
  }

  return (
    <StoreContext.Provider value={stateRef.current}>
      {children}
    </StoreContext.Provider>
  );
}

/**
 * @internal Exposed for testing.
 */
export function useStore<P extends s.Properties>() {
  return useContext(StoreContext) as Store<P>;
}

////////////////////////////////////////////////////////////////////////////////
// Field.
////////////////////////////////////////////////////////////////////////////////

type FieldSubscriber<T> = (
  newValue: T | undefined,
  oldValue: T | undefined
) => void;

type Validity =
  | {
      valid: true;
    }
  | {
      valid: false;
      invalidMessage: string;
    };

type T<S extends s.Schema> = s.TypeOf<S>;

export interface Field<S extends s.Schema> {
  readonly key: string;
  readonly schema: S;
  // TODO: This should be deep readonly but the choice field situation is too
  // messy :(
  readonly value: T<S> | undefined;
  readonly validity: Validity;
  clear(): void;
  set(newValue: T<S> | undefined): void;
  subscribe(callback: FieldSubscriber<T<S>>): () => void;
  readonly properties: S extends s.RecordSchema<infer P>
    ? {
        readonly [K in keyof P]: Field<P[K]>;
      }
    : never;
  readonly elements: S extends s.TupleSchema<infer E>
    ? {
        readonly [I in keyof E]: E[I] extends s.Schema ? Field<E[I]> : E[I];
      }
    : S extends s.ArraySchema<s.OptionalSchema<infer E>>
    ? ReadonlyArray<Field<E>>
    : never;
}

function Field<S extends s.Schema>(
  key: string,
  schema: S,
  initial: s.TypeOf<S> = undefined
): Field<S> {
  type T = s.TypeOf<S>;

  const subscribers: Array<FieldSubscriber<T>> = [];

  const field: Writeable<Field<S>> = {
    key,
    schema,
    value: initial,
    validity: { valid: true },

    set(newValue: T | undefined) {
      const oldValue = field.value;
      if (oldValue === newValue) {
        return;
      }

      field.value = newValue;

      if (newValue === undefined) {
        field.validity = { valid: true };
      } else {
        const validated = schema.validate(newValue);

        if (s.isOk(validated)) {
          field.validity = { valid: true };
        } else {
          field.validity = {
            valid: false,
            invalidMessage: "TODO",
          };
        }
      }

      subscribers.forEach((callback) => callback(newValue, oldValue));
    },

    clear() {
      field.set(undefined);
    },

    subscribe(callback) {
      subscribers.push(callback);
      return () => {
        subscribers.splice(subscribers.indexOf(callback), 1);
      };
    },

    properties: undefined as any,
    elements: undefined as any,
  };

  if (s.isRecordSchema(schema)) {
    const properties: { [p: string]: Field<s.Schema> } = {};
    field.properties = properties as any;

    for (const p in schema.properties) {
      if (schema.properties.hasOwnProperty(p)) {
        properties[p] = Field(`${key}.${p}`, schema.properties[p]);

        // Make sure that the value of the subField has its source of truth
        // in the parent field.
        Object.defineProperty(properties[p], "value", {
          enumerable: true,
          get() {
            return field.value === undefined
              ? undefined
              : (field as any).value[p];
          },
          // This setter will be by the assignment in `subField.set()`
          set(newValue) {
            const fv = field.value === undefined ? {} : (field.value as any);
            // Always set it to a clone. (This may be unnecessary.)
            field.set({ ...fv, [p]: newValue });
          },
        });
      }
    }
  } else if (s.isTupleSchema(schema)) {
    const tupleElements = schema.elements as s.Schema[];
    const tupleLength = tupleElements.length;

    field.elements = tupleElements.map((elementSchema, i) => {
      const elementField = Field(`${key}[${i}]`, elementSchema);

      // Make sure that the value of the elementField has its source of truth
      // in the parent field.
      Object.defineProperty(elementField, "value", {
        enumerable: true,
        get() {
          return field.value === undefined
            ? undefined
            : (field as any).value[i];
        },
        // This setter will be by the assignment in `elementField.set()`
        set(newValue) {
          const newTuple =
            field.value === undefined
              ? // Create an empty tuple.
                [...Array(tupleLength)]
              : // Otherwise set it to a clone. (This may be unnecessary.)
                [...(field.value as any)];
          newTuple[i] = newValue;
          field.set(newTuple);
        },
      });

      return elementField;
    }) as any;
  } else if (s.isArraySchema(schema)) {
    const optionalElementSchema = schema.elements;

    if (!s.isOptionalSchema(optionalElementSchema)) {
      throw new Error("Non-optional array elements are not supported...");
    }

    const elementSchema = optionalElementSchema.wrappedSchema;

    const asIndex = (i: number | string | symbol): number | null => {
      if (typeof i === "number") {
        return i;
      } else if (typeof i === "symbol") {
        return null;
      }
      const n = Number(i);
      return n !== Infinity && String(n) === i && n >= 0 ? n : null;
    };

    ((field as unknown) as Writeable<
      Field<s.ArraySchema<any>>
    >).elements = new Proxy([] as Field<s.Schema>[], {
      has(elementFields, property) {
        const i = asIndex(property);
        if (i === null) {
          return property in elementFields;
        }
        return true;
      },

      get(elementFields, property) {
        if (elementFields[property as any] !== undefined) {
          return elementFields[property as any];
        }

        const i = asIndex(property);
        if (i === null) {
          return undefined;
        }

        const elementField = Field(`${key}[${i}]`, elementSchema);

        Object.defineProperty(elementField, "value", {
          enumerable: true,
          get() {
            return field.value === undefined
              ? undefined
              : (field as any).value[i];
          },
          set(newValue) {
            const newArray = field.value === undefined ? [] : [...field.value];
            const oldLength = newArray.length;
            newArray[i] = newValue;
            // Handle array holes with Array.from() in case we're setting an
            // array element that's two or more past the old length.
            field.set(oldLength < i ? Array.from(newArray) : newArray);
          },
        });

        return (elementFields[i] = elementField);
      },
    });
  }

  return field;
}

////////////////////////////////////////////////////////////////////////////////
// Hooks + Components.
////////////////////////////////////////////////////////////////////////////////

export function useFields<P extends s.Properties>(
  schema: s.RecordSchema<P>
): ProviderFields<P> {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const proxy = useRef<Store<P>["fields"]>();
  const unsubscribe = useRef<() => void>();

  const store = useStore<P>();

  if (store.schema !== schema) {
    throw new Error(
      "The current context is not set up for the Schema you provided." +
        "\nDid you accidentally pass a Schema for the wrong tutorial?"
    );
  }

  if (!proxy.current) {
    const unsubscribers = new Map<string, () => void>();

    // The stable reference of `unsubscribers` allows us to just bind this
    // closure one time. The identify of the Map will be preserved for the
    // lifetime of this component, since it's only created on the first render.
    unsubscribe.current = () => unsubscribers.forEach((u) => u());

    proxy.current = new Proxy(store.fields, {
      get(target, property: string) {
        const field = target[property];
        if (!field) {
          return undefined;
        }

        if (!unsubscribers.has(property)) {
          unsubscribers.set(property, field.subscribe(forceUpdate));
        }

        return field;
      },
    });
  }

  // Make sure we unsubscribe when the component unmounts.
  useEffect(() => unsubscribe.current, []);

  return proxy.current;
}

export function WithFields<P extends s.Properties>({
  schema,
  children,
}: {
  schema: s.RecordSchema<P>;
  children: (fields: ProviderFields<P>) => React.ReactNode;
}) {
  return <>{children(useFields(schema))}</>;
}

////////////////////////////////////////////////////////////////////////////////
// Helpers.
////////////////////////////////////////////////////////////////////////////////

type NonEmpty<T> = T extends null | undefined
  ? never
  : T extends Array<any>
  ? {
      [K in keyof T]: NonEmpty<T[K]>;
    }
  : T;

type NonEmptyRecord<T> = {
  [K in keyof T]-?: NonEmpty<T[K]>;
};

export function isSet<S extends s.Schema>(
  field: Field<S>
): field is Omit<Field<S>, "value"> & {
  value: S extends s.RecordSchema<any>
    ? NonEmptyRecord<Field<S>["value"]>
    : NonEmpty<Field<S>["value"]>;
} {
  const value = field.value;

  if (value === undefined) {
    return false;
  }

  switch (field.schema.kind) {
    case "choice":
      const selected = value.selected;
      const hasSelection =
        selected !== undefined &&
        // If it's a multi-select, make sure it's not an empty array
        (!Array.isArray(selected) || !!selected.length);
      return hasSelection || !!value.other;
    case "string":
      return !!value;
    case "tuple":
      return field.elements.every(isSet);
    case "record":
      return Object.values(field.properties).every(isSet);
    case "array":
      // There should be at least one element in the array, and it shouldn't
      // have any empty slots.
      return (
        value.length &&
        value.map((_: any, i: number) => field.elements[i]).every(isSet)
      );
    default:
      return true;
  }
}

export function needsHelp(field: Field<s.BooleanSchema>): boolean {
  return !!field.value;
}

export function isVisible(field: Field<s.BooleanSchema>): boolean {
  return !!field.value;
}
