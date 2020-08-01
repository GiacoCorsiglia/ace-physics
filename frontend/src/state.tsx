import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import * as s from "./common/schema";
import { Children, mapDict, Writeable } from "./util";

// STORE.

interface Store<P extends s.Properties> {
  readonly schema: ProviderSchema<P>;
  readonly fields: Readonly<{ [K in keyof P]: Field<P[K]> }>;
}

const StoreContext = createContext<Store<any>>({} as any);

export type ProviderSchema<P extends s.Properties = any> = s.RecordSchema<P>;

export function Provider<P extends s.Properties>({
  schema,
  children,
}: { schema: ProviderSchema<P> } & Children) {
  const ref = useRef<Store<P> | null>(null);
  // Initialize it once.
  if (ref.current === null) {
    ref.current = {
      schema,
      fields: mapDict(schema.properties, Field) as any,
    };
  }

  return (
    <StoreContext.Provider value={ref.current}>
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

// FIELD.

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
  readonly schema: S;
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
}

function Field<S extends s.Schema>(schema: S): Field<S> {
  type T = s.TypeOf<S>;

  const subscribers: Array<FieldSubscriber<T>> = [];

  const field: Writeable<Field<S>> = {
    schema,
    value: schema.default(),
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
  };

  if (s.isRecordSchema(schema)) {
    const properties: { [p: string]: Field<s.Schema> } = {};
    field.properties = properties as any;

    for (const p in schema.properties) {
      if (schema.properties.hasOwnProperty(p)) {
        properties[p] = Field(schema.properties[p]);
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
  }

  return field;
}

export function useFields<P extends s.Properties>(
  schema: s.RecordSchema<P>
): Readonly<{ [K in keyof P]: Field<P[K]> }> {
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

  // Make sure we unsubscribe when the component dismounts.
  useEffect(() => unsubscribe.current, []);

  return proxy.current;
}

export function useField<P extends s.Properties, K extends keyof P>(
  schema: s.RecordSchema<P>,
  key: K
): Field<P[K]> {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const store = useStore<P>();

  if (store.schema !== schema) {
    throw new Error(
      "The current context is not set up for the Schema you provided." +
        "\nDid you accidentally pass a Schema for the wrong tutorial?"
    );
  }

  const field = store.fields[key];

  useEffect(() => {
    const unsubscribe = field.subscribe(forceUpdate);
    return unsubscribe;
  }, [field]);

  return field;
}

export function WithField<P extends s.Properties, K extends keyof P>({
  schema,
  name,
  children,
}: {
  schema: s.RecordSchema<P>;
  name: K;
  children: (field: Field<P[K]>) => React.ReactNode;
}) {
  const field = useField(schema, name);
  return <>{children(field)}</>;
}

export function isSet<S extends s.Schema>(
  field: Field<S>
): field is Field<S> & { value: NonNullable<Field<S>["value"]> } {
  const value = field.value;

  if (value === undefined) {
    return false;
  }

  switch (field.schema.kind) {
    case "choice":
      return value.selected !== undefined || !!value.other;
    default:
      return true;
  }
}

export function needsHelp(field: Field<s.BooleanSchema>): boolean {
  return !!field.value;
}
