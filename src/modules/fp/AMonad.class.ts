import { Monad } from "./Monad.iface";

/**
 * An abstract monad
 */
export abstract class AMonad<T> implements Monad<T> {
  protected _value: T | null = null;

  constructor(value: T | null = null) {
    this._value = value;
  }

  is(Ctor: new <T>(v: T) => Monad<T>): boolean {
    return this instanceof Ctor;
  }

  type(): new <T>(value: T | null) => Monad<T> {
    return (
      this as unknown as { constructor: new <T>(value: T | null) => Monad<T> }
    ).constructor;
  }

  get value(): T | null {
    return this._value;
  }

  abstract bind<U>(fn: (v: T) => Monad<U>): Monad<U>;
}
