import { IIdentifiableWrapper } from "./IdentifiableWrapper.iface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class IdentificationWrapper<TKey extends number | string, T = any>
  implements IIdentifiableWrapper<TKey, T>
{
  protected _key: TKey;
  protected _value: T;
  constructor(key: TKey, value: T) {
    this._key = key;
    this._value = value;
  }

  get key(): TKey {
    return this._key;
  }

  get value(): T {
    return this._value;
  }
}
