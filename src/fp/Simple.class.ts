import { AMonad } from "./AMonad.class";
import { Monad } from "./Monad.iface";

export class Simple<T> extends AMonad<T> {
  constructor(value: T) {
    super(value);
  }

  get value(): T {
    return this._value as T;
  }

  bind<U>(callback: (value: T) => Monad<U>): Monad<U> {
    return callback(this._value as T);
  }
}

export default Simple;
