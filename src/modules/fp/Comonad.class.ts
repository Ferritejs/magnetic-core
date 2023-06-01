import { Monad } from "./Monad.iface";

type Comonad<T, R> = (fn: (m: Monad<T>) => R) => Monad<R>;

export const createComonad =
  <T, R>(m: Monad<T>, Ctor: new (v: R) => Monad<R>): Comonad<T, R> =>
  (fn: (m: Monad<T>) => R): Monad<R> =>
    new Ctor(fn(m));
