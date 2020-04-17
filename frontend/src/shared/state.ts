import { useEffect, useReducer } from "react";
import { Field, isValid, Schema } from "./schema";
import { Writeable } from "./util";

// STATE

export interface State {
  [key: string]: Model<any>;
}

export function stateFromSchema<S extends Schema>(
  schema: S
): {
  [K in keyof S]: Model<
    S[K] extends Field<infer ValueType> ? ValueType : never
  >;
} {
  const state: any = {};
  for (const key in schema) {
    if (!schema.hasOwnProperty(key)) {
      continue;
    }
    const field = schema[key];
    state[key] = Model(field);
  }
  return state;
}

// MODEL

type ModelSubscriber<ValueType> = (
  newValue: ValueType,
  oldValue: ValueType
) => void;

type Validity =
  | {
      valid: true;
    }
  | {
      valid: false;
      invalidMessage: string;
    };

export interface Model<ValueType> {
  readonly field: Field<ValueType>;
  readonly value: ValueType;
  readonly validity: Validity;
  set(newValue: ValueType): void;
  subscribe(callback: ModelSubscriber<ValueType>): () => void;
}

export function Model<ValueType>(field: Field<ValueType>): Model<ValueType> {
  const subscribers: Array<ModelSubscriber<ValueType>> = [];

  const model: Writeable<Model<ValueType>> = {
    field,
    value: field.default(),
    validity: { valid: true },

    set(newValue: ValueType) {
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

    subscribe(callback: ModelSubscriber<ValueType>) {
      subscribers.push(callback);
      return () => {
        subscribers.splice(subscribers.indexOf(callback), 1);
      };
    },
  };

  return model;
}

export function useModel<ValueType>(model: Model<ValueType>) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const unsubscribe = model.subscribe(forceUpdate);
    return unsubscribe;
  }, []);

  return model;
}

//

// function getModelForSchemaField<S extends Schema>(schema: S, key: keyof S): S[key]
//  {

// }

// const state = {};

// function getModelForSchemaField<ValueType>(
//   field: Field<ValueType>
// ): Model<ValueType> {
//   return state[field.schemaKey];
// }
