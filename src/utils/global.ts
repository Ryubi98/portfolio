export const prefixBase = import.meta.env.BASE_URL === '/' ? '/' : import.meta.env.BASE_URL.slice(0, -1);

export function isObjKey<T extends Object>(key: PropertyKey, obj: T): key is keyof T {
  return key in obj;
}
