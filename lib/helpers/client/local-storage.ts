import { Dispatch, SetStateAction, useState } from "react";

export const safeLocalStorage: Storage = {
  clear() {
    try {
      localStorage.clear();
    } catch (e) {
      console.log("Couldn't access localStorage", e);
    }
  },
  getItem(...args) {
    try {
      return localStorage.getItem(...args);
    } catch (e) {
      console.log("Couldn't access localStorage", e);
      return null;
    }
  },
  get length(): number {
    try {
      return localStorage.length;
    } catch (e) {
      console.log("Couldn't access localStorage", e);
      return 0;
    }
  },
  key(...args) {
    try {
      return localStorage.key(...args);
    } catch (e) {
      console.log("Couldn't access localStorage", e);
      return null;
    }
  },
  removeItem(...args) {
    try {
      localStorage.removeItem(...args);
    } catch (e) {
      console.log("Couldn't access localStorage", e);
    }
  },
  setItem(...args) {
    try {
      localStorage.setItem(...args);
    } catch (e) {
      console.log("Couldn't access localStorage", e);
    }
  },
};

/**
 * Like React's useState but also persists the value in local storage.
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    const item = safeLocalStorage.getItem(key);

    try {
      return item ? JSON.parse(item) : initialValue;
    } catch (e) {
      console.error("useLocalStorage: unable to parse", item, e);
      return initialValue;
    }
  });

  const setAndStoreState: Dispatch<SetStateAction<T>> = (value) => {
    let newValue: T;
    if (value instanceof Function) {
      setState((oldValue) => (newValue = value(oldValue)));
    } else {
      setState((newValue = value));
    }

    if (typeof window !== "undefined") {
      try {
        safeLocalStorage.setItem(key, JSON.stringify(newValue!));
      } catch (e) {
        console.error("useLocalStorage: unable to stringify", newValue!, e);
      }
    }
  };

  return [state, setAndStoreState] as const;
};
