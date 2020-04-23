import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { Data, ExtractFieldValue, Field, isValid } from "./schema";
import { Children, mapDict, Writeable } from "./util";

// STORE

interface Store<S extends any> {
  readonly schema: S;
  readonly models: Readonly<{ [K in keyof S]: ModelForField<S[K]> }>;
}

const StoreContext = createContext<Store<any>>({ schema: {}, models: {} });

export function Provider<S extends any>({
  schema,
  children,
}: { schema: S } & Children) {
  const ref = useRef<Store<S> | null>(null);
  // Initialize it once.
  if (ref.current === null) {
    ref.current = {
      schema,
      models: mapDict(schema, Model as any) as any,
    };
  }

  return (
    <StoreContext.Provider value={ref.current}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore<S extends any>() {
  return useContext(StoreContext) as Store<S>;
}

// MODEL

type ModelSubscriber<Value> = (newValue: Value, oldValue: Value) => void;

type Validity =
  | {
      valid: true;
    }
  | {
      valid: false;
      invalidMessage: string;
    };

export interface Model<Value extends Data> {
  readonly field: Field<Value>;
  readonly value: Value;
  readonly validity: Validity;
  set(newValue: Value): void;
  subscribe(callback: ModelSubscriber<Value>): () => void;
}

type ModelForField<F extends Field<any>> = Model<ExtractFieldValue<F>>;

function Model<Value extends Data>(field: Field<Value>): Model<Value> {
  const subscribers: Array<ModelSubscriber<Value>> = [];

  const model: Writeable<Model<Value>> = {
    field,
    value: field.default(),
    validity: { valid: true },

    set(newValue: Value) {
      const oldValue = model.value;
      if (oldValue === newValue) {
        return;
      }

      model.value = newValue;

      const validated = field.validate(newValue);

      if (isValid(validated)) {
        model.validity = { valid: true };
      } else {
        model.validity = {
          valid: false,
          invalidMessage: validated.message,
        };
      }

      subscribers.forEach((callback) => callback(newValue, oldValue));
    },

    subscribe(callback: ModelSubscriber<Value>) {
      subscribers.push(callback);
      return () => {
        subscribers.splice(subscribers.indexOf(callback), 1);
      };
    },
  };

  return model;
}

export function useModel<S extends any>(
  key: keyof S
): ModelForField<S[typeof key]> {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const store = useStore<S>();
  const model = store.models[key];

  useEffect(() => {
    const unsubscribe = model.subscribe(forceUpdate);
    return unsubscribe;
  }, [model]);

  return model;
}

export function WithModel<S extends any>({
  name,
  children,
}: {
  name: keyof S;
  children: (model: ModelForField<S[typeof name]>) => React.ReactNode;
}) {
  const model = useModel<S>(name);
  return <>{children(model)}</>;
}
