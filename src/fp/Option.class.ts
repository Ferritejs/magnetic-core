import { Monad } from "./Monad.iface";
import { AMonad } from "./AMonad.class";
import { Null } from "./Null.class";

/**
 * @implements AMonad<T>
 */
export class Option<T> extends AMonad<T> {
  bind<U>(fn: (v: T) => Monad<U>): Monad<U> {
    return this._value === null ? new Null() : fn(this._value);
  }

  isEmpty(): boolean {
    return this._value === null;
  }
}
