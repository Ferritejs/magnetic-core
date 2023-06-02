import { AMonad } from "./AMonad.class";
import { Monad } from "./Monad.iface";
import { Nullable } from "./Nullable.iface";

export class Null<T> extends AMonad<T> implements Nullable {
  constructor() {
    super();
  }

  get value(): null {
    return null;
  }

  bind<U>(): Monad<U> {
    return new Null<U>();
  }

  static IsNull(value: unknown): boolean {
    return value === null || value instanceof Null;
  }

  static IsNullable(value: unknown): boolean {
    return (
      typeof value === "object" && (value as { value: unknown }).value === null
    );
  }
}
