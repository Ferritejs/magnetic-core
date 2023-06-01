export interface Monad<T> {
  bind: <U>(fn: (v: T) => Monad<U>) => Monad<U>;
  is: (Ctor: new <T>(v: T) => Monad<T>) => boolean;
}
