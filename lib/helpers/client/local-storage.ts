import { Dispatch, SetStateAction, useState } from "react";

const createSafeStorage = (storage: Storage): Storage => ({
  clear() {
    try {
      storage.clear();
    } catch (e) {
      console.warn("Unable to access storage", e);
    }
  },

  getItem(key: string): string | null {
    try {
      return storage.getItem(key);
    } catch (e) {
      console.warn("Unable to access storage", e);
      return null;
    }
  },

  get length(): number {
    try {
      return storage.length;
    } catch (e) {
      console.warn("Unable to access storage", e);
      return 0;
    }
  },

  key(index: number): string | null {
    try {
      return storage.key(index);
    } catch (e) {
      console.warn("Unable to access storage", e);
      return null;
    }
  },

  removeItem(key: string): void {
    try {
      storage.removeItem(key);
    } catch (e) {
      console.warn("Unable to access storage", e);
    }
  },

  setItem(key: string, value: string) {
    try {
      storage.setItem(key, value);
    } catch (e) {
      console.warn("Unable to access storage", e);
    }
  },
});

/**
 * Access localStorage safely, suppressing errors if it's unsupported, out of
 * space, or otherwise unavailable.
 *
 * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
 */
export const safeLocalStorage = createSafeStorage(
  typeof localStorage === "object"
    ? localStorage
    : (undefined as unknown as Storage),
);
/**
 * Access sessionStorage safely, suppressing errors if it's unsupported, out of
 * space, or otherwise unavailable.
 *
 * [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)
 */
export const safeSessionStorage = createSafeStorage(
  typeof sessionStorage === "object"
    ? sessionStorage
    : (undefined as unknown as Storage),
);

//
// JSON storage.
//

type JsonStorage = ReturnType<typeof createJsonStorage>;

const createJsonStorage = (safeStorage: Storage) => ({
  // This spread works because safeLocalStorage and safeSessionStorage are plain
  // JavaScript objects; it wouldn't work for window.localStorage.
  ...safeStorage,

  /**
   * Reads an item from storage and tries to parse it as JSON.
   */
  getItem(key: string): unknown {
    const item = safeStorage.getItem(key);
    if (item === null) {
      return null;
    }
    try {
      return JSON.parse(item);
    } catch (e) {
      console.warn("Malformed JSON in storage", e);
      return null;
    }
  },

  /**
   * Saves `value` in storage as JSON.
   */
  setItem(key: string, value: unknown): void {
    // Throw if stringify fails because that's a programming error.
    safeStorage.setItem(key, JSON.stringify(value));
  },
});
/**
 * Safely store and read values from localStorage as JSON.
 */
export const jsonLocalStorage = createJsonStorage(safeLocalStorage);
/**
 * Safely store and read values from sessionStorage as JSON.
 */
export const jsonSessionStorage = createJsonStorage(safeSessionStorage);

//
// React hook.
//

const id = (item: unknown) => item;

const createUseStorage =
  (jsonStorage: JsonStorage) =>
  <T>(
    key: string,
    initialValue: T | (() => T),
    parse: (item: unknown) => T | null = id as (item: unknown) => T | null,
  ) => {
    const [state, setState] = useState<T>(() => {
      const item = jsonStorage.getItem(key);

      let parsed: T | null;
      try {
        parsed = parse(item);
      } catch {
        parsed = null;
      }

      if (parsed !== null) {
        return parsed;
      }

      return initialValue instanceof Function ? initialValue() : initialValue;
    });

    const setAndStoreState: Dispatch<SetStateAction<T>> = (value) => {
      let newValue: T;
      if (value instanceof Function) {
        setState((oldValue) => (newValue = value(oldValue)));
      } else {
        setState((newValue = value));
      }

      jsonStorage.setItem(key, newValue!);
    };

    return [state, setAndStoreState] as const;
  };

/**
 * Like React's useState but also persists the value in local storage.
 */
export const useLocalStorage = createUseStorage(jsonLocalStorage);
/**
 * Like React's useState but also persists the value in sessionStorage.
 */
export const useSessionStorage = createUseStorage(jsonSessionStorage);
