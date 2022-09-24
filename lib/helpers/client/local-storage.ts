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
