import { Monad } from "./Monad.iface";
import { Option } from "./Option.class";
import { Null } from "./Null.class";

export const Some = <T>(value: T): Monad<T> => {
  return Null.IsNull(value) || Null.IsNullable(value)
    ? new Null()
    : new Option(value);
};
