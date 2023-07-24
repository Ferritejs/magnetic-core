import { Key } from "./Key.type";

export interface IIdentifiable<TKey extends Key> {
  key: TKey;
}
