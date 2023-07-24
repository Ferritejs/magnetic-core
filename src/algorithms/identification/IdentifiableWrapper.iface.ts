import { IIdentifiable } from "./Identifiable.iface";
import { Key } from "./Key.type";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IIdentifiableWrapper<TKey extends Key, T = any>
  extends IIdentifiable<TKey> {
  value: T;
}
