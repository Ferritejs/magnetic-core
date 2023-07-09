import { IIdentifiable } from "./Identifiable.iface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IIdentifiableWrapper<TKey extends number | string, T = any>
  extends IIdentifiable<TKey> {
  value: T;
}
