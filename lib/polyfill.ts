// Source: https://gitlab.com/moongoal/js-polyfill-object.fromentries/-/blob/master/index.js
export const polyfill = () => {
  if (!Object.fromEntries) {
    Object.defineProperty(Object, "fromEntries", {
      value(entries: any) {
        if (!entries || !entries[Symbol.iterator]) {
          throw new Error(
            "Object.fromEntries() requires a single iterable argument",
          );
        }

        const o: any = {};

        Object.keys(entries).forEach((key) => {
          const [k, v] = entries[key];
          o[k] = v;
        });

        return o;
      },
    });
  }
};
