import { isObject } from "services/helpers";

interface Tracker<T extends object> {
  readonly proxy: T;
  resetTracking(): Set<PropertyKey>;
  track(func: () => void): Set<PropertyKey>;
}

export const tracker = <T extends object>(o: T): Tracker<T> => {
  let accessed = new Set<PropertyKey>();
  let proxyCache = new WeakMap<object, object>();

  const proxify = <T extends object>(o: T, rootPath: string = ""): T => {
    const cached = proxyCache.get(o);
    if (cached) {
      return cached as T;
    }

    const isArray = Array.isArray(o);
    const prefixPath = `${rootPath}${rootPath === "" ? "" : "/"}`;

    let shouldTrackSelf = false;

    const proxy = new Proxy(o, {
      get(target, key) {
        const subPath = `${prefixPath}${String(key)}`;
        const value: unknown = (target as any)[key];

        if (!shouldTrackSelf) {
          if (isArray && key === "length") {
            shouldTrackSelf = true;
          } else if (key === "hasOwnProperty" && value === hasOwnProperty) {
            shouldTrackSelf = true;
          } else {
            accessed.delete(rootPath);
          }
        }

        accessed.add(shouldTrackSelf ? rootPath : subPath);

        return shouldTrack(value) ? proxify(value, subPath) : value;
      },

      has(target, key) {
        accessed.add(`${prefixPath}${String(key)}`);
        if (!shouldTrackSelf) {
          accessed.delete(rootPath);
        }
        return key in target;
      },

      ownKeys(target) {
        accessed.add(rootPath);
        shouldTrackSelf = true;
        return Reflect.ownKeys(target);
      },
    });

    proxyCache.set(o, proxy);
    return proxy;
  };

  const tracker: Tracker<T> = {
    proxy: proxify(o),

    resetTracking() {
      const prevAccessed = accessed;
      accessed = new Set<PropertyKey>();
      proxyCache = new WeakMap<object, object>();
      return prevAccessed;
    },

    track(func) {
      tracker.resetTracking();
      func();
      return tracker.resetTracking();
    },
  };

  return tracker;
};

const hasOwnProperty = Object.prototype.hasOwnProperty;

const shouldTrack = isObject;
