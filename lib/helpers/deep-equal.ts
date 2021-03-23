export const deepEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) {
    return true;
  } else if (typeof a !== "object" || typeof b !== "object") {
    // Check if they're both NaN
    return a !== a && b !== b;
  } else if (!a || !b) {
    return false;
  } else if (Array.isArray(a)) {
    if (!Array.isArray(b)) {
      return false;
    }

    if (a.length !== b.length) {
      return false;
    }

    return a.every((v, i) => deepEqual(v, b[i]));
  } else if (a instanceof Map) {
    if (!(b instanceof Map)) {
      return false;
    }

    if (a.size !== b.size) {
      return false;
    }

    for (const el of a.entries()) {
      if (!b.has(el[0])) {
        return false;
      }
    }

    for (const el of a.entries()) {
      if (!deepEqual(el[1], b.get(el[0]))) {
        return false;
      }
    }

    return true;
  } else if (a instanceof Set) {
    if (!(b instanceof Set)) {
      return false;
    }

    if (a.size !== b.size) {
      return false;
    }

    for (const el of a.entries()) {
      if (!b.has(el[0])) {
        return false;
      }
    }

    return true;
  } else {
    // Treat them as plain objects.

    // We do not distinguish between missing keys and undefined values.  This is
    // unlike most deepEqual functions.

    const aKeys = notUndefinedKeys(a);
    const bKeys = notUndefinedKeys(b);
    if (aKeys.length !== bKeys.length) {
      return false;
    }

    // Compare sorted keys.
    aKeys.sort();
    bKeys.sort();
    for (let i = 0; i < aKeys.length; i++) {
      // eslint-disable-next-line eqeqeq
      if (aKeys[i] != bKeys[i]) {
        return false;
      }
    }

    for (let i = 0; i < aKeys.length; i++) {
      const key = aKeys[i];
      if (!deepEqual((a as any)[key], (b as any)[key])) {
        return false;
      }
    }

    return true;
  }
};

const hasOwnProperty = Object.prototype.hasOwnProperty;

const notUndefinedKeys = (o: any) => {
  const keys = [];
  for (const k in o) {
    if (hasOwnProperty.call(o, k) && o[k] !== undefined) {
      keys.push(k);
    }
  }
  return keys;
};
