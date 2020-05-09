import * as s from "ace-common/src/schema";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { Children, mapDict, Writeable } from "./util";

// STORE.

interface Store<P extends s.Properties> {
  readonly schema: s.RecordSchema<P>;
  readonly fields: Readonly<{ [K in keyof P]: Field<s.TypeOf<P[K]>> }>;
}

const StoreContext = createContext<Store<any>>({} as any);

export function Provider<P extends s.Properties>({
  schema,
  children,
}: { schema: s.RecordSchema<P> } & Children) {
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

type FieldSubscriber<T> = (newValue: T | null, oldValue: T | null) => void;

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
  readonly value: T | null;
  readonly validity: Validity;
  set(newValue: T): void;
  subscribe(callback: FieldSubscriber<T>): () => void;
}

function Field<T extends s.Data>(schema: s.Schema<T>): Field<T> {
  const subscribers: Array<FieldSubscriber<T>> = [];

  const field: Writeable<Field<T>> = {
    schema,
    value: schema.default(),
    validity: { valid: true },

    set(newValue: T) {
      const oldValue = field.value;
      if (oldValue === newValue) {
        return;
      }

      field.value = newValue;

      const validated = schema.validate(newValue);

      if (s.isOk(validated)) {
        field.validity = { valid: true };
      } else {
        field.validity = {
          valid: false,
          invalidMessage: "TODO",
        };
      }

      subscribers.forEach((callback) => callback(newValue, oldValue));
    },

    subscribe(callback) {
      subscribers.push(callback);
      return () => {
        subscribers.splice(subscribers.indexOf(callback), 1);
      };
    },
  };

  return field;
}

export function useField<P extends s.Properties, K extends keyof P>(
  schema: s.RecordSchema<P>,
  key: K
): Field<s.TypeOf<P[K]>> {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const store = useStore<any>();

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

  return field as any;
}

export function WithField<P extends s.Properties>({
  schema,
  name,
  children,
}: {
  schema: s.RecordSchema<P>;
  name: keyof P;
  children: (field: Field<s.TypeOf<P[typeof name]>>) => React.ReactNode;
}) {
  const field = useField(schema, name);
  return <>{children(field)}</>;
}
