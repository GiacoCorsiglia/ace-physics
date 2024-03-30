import { isIndex, isObject, Path, TypeAtPath } from "@/helpers/client";

/**
 * Safely get the value in `o` at `path`.
 */
export const get = <T, P extends [] | Path<T>>(
  o: T,
  path: P,
): TypeAtPath<T, P> => {
  for (let i = 0; i < path.length; i++) {
    if (!isObject(o)) {
      // If we get here, it means we have another key to read, but `o` doesn't
      // hold an object (array or {}), so we can't.
      return undefined as any;
    }
    // eslint-disable-next-line no-param-reassign
    o = (o as any)[path[i]];
  }
  return o as any;
};

/**
 * Immutably "set" the value in `o` at `path` to `newValue`.
 *
 * Returns a clone of `o` with every value at `path[0:-1]` cloned as well, but
 * returns `o` identically if no update was needed.
 */
export const set = <T, P extends Path<T>>(
  o: T,
  path: P,
  newValue:
    | TypeAtPath<T, P>
    | ((oldValue: TypeAtPath<T, P>) => TypeAtPath<T, P>),
): T => {
  // The implementation here is essentially recursion in two loops.  First, we
  // iterate through the path forwards to (a) find the old value at `path`; and
  // (b) build a stack of references to the values in `o` at `path[0:i-1]`
  // (including `o` itself at index `0`).  Then we iterate through the path
  // backward, cloning and updating the values in the stack of references to
  // include the new values, until we back out to cloning `o` itself.

  const pathLength = path.length;
  const referenceStack: any[] = [];
  let last: any = o;

  for (let i = 0; i < pathLength; i++) {
    const key = path[i];
    if (!isObject(last)) {
      last = isIndex(key) ? [] : {};
    }
    referenceStack.push(last);
    last = last[key];
  }

  // Now `last` holds the old value at `path`.

  if (typeof newValue === "function") {
    // eslint-disable-next-line no-param-reassign
    newValue = (newValue as any)(last);
  }

  if (newValue === last) {
    // Nothing needs to be updated, so no reason to make a clone.
    // TODO: Consider checking isShallowEqual (or even isDeepEqual) here.
    return o;
  }

  for (let i = pathLength - 1; i >= 0; i--) {
    last = referenceStack[i];
    if (Array.isArray(last)) {
      const newArray: any = last.slice();
      newArray[path[i]] = newValue;
      // Handle array holes with Array.from() in case we're setting an array
      // element that's 2 or more past the old length.
      // eslint-disable-next-line no-param-reassign
      newValue =
        newArray.length > last.length + 1 ? Array.from(newArray) : newArray;
    } else {
      // eslint-disable-next-line no-param-reassign
      newValue = { ...last, [path[i]]: newValue };
    }
  }

  return newValue as unknown as T;
};
