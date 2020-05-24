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
  readonly fields: Readonly<{ [K in keyof P]: Field<s.TypeOf<P[K]>> }>;
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

export interface Field<T extends s.Data> {
  readonly schema: s.Schema<T>;
  readonly value: T | undefined;
  readonly validity: Validity;
  clear(): void;
  set(newValue: T | undefined): void;
  subscribe(callback: FieldSubscriber<T>): () => void;
  properties: T extends { [key: string]: s.Data }
    ? {
        // This transformation gives the sub-fields the correct types, despite
        // the fact that record fields are nullable.
        [K in keyof T]-?: Field<NonNullable<T[K]>>;
      }
    : never;
}

function Field<T extends s.Data>(schema: s.Schema<T>): Field<T> {
  const subscribers: Array<FieldSubscriber<T>> = [];

  const field: Writeable<Field<T>> = {
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
    const properties: { [p: string]: Field<any> } = {};
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

export function useField<P extends s.Properties, K extends keyof P>(
  schema: s.RecordSchema<P>,
  key: K
): Field<s.TypeOf<P[K]>> {
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
  children: (field: Field<s.TypeOf<P[K]>>) => React.ReactNode;
}) {
  const field = useField(schema, name);
  return <>{children(field)}</>;
}
