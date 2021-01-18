import { isObject } from "@/helpers";

export interface Tracker<T extends object> {
  readonly original: T;
  readonly proxy: T;
  resetTracking(): Set<string>;
  track<T>(func: () => T): [T, Set<string>];
}

export const tracker = <T extends object>(
  original: T,
  recursive: boolean = true
): Tracker<T> => {
  let accessed = new Set<string>();
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

        return recursive && shouldTrack(value)
          ? proxify(value, subPath)
          : value;
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
    original,

    proxy: proxify(original),

    resetTracking() {
      const prevAccessed = accessed;
      accessed = new Set<string>();
      proxyCache = new WeakMap<object, object>();
      return prevAccessed;
    },

    track(func) {
      tracker.resetTracking();
      return [func(), tracker.resetTracking()];
    },
  };

  return tracker;
};

const hasOwnProperty = Object.prototype.hasOwnProperty;

const shouldTrack = isObject;
