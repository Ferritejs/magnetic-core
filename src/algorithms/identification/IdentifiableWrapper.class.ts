import {
  CResult,
  Comparator,
  ComparisonType,
  EQUAL,
  IComparable,
  IComparableWrapper,
  NOT_EQUAL,
} from "../comparison";
import { IIdentifiableWrapper } from "./IdentifiableWrapper.iface";
import { Key } from "./Key.type";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class IdentifiableWrapper<TKey extends Key, T = any>
  implements
    IIdentifiableWrapper<TKey, T>,
    IComparable<IdentifiableWrapper<TKey, T>>
{
  protected _key: TKey;
  protected _value: T;
  constructor(key: TKey, value: T) {
    this._key = key;
    this._value = value;
  }

  compare(
    other:
      | IdentifiableWrapper<TKey, T>
      | IComparableWrapper<IdentifiableWrapper<TKey, T>>,
    comparator?:
      | Comparator<
          | IdentifiableWrapper<TKey, T>
          | IComparableWrapper<IdentifiableWrapper<TKey, T>>
        >
      | undefined,
  ): CResult {
    let cmpValue: ComparisonType = NOT_EQUAL;
    if (comparator) {
      cmpValue = comparator(this, other);
    } else {
      if (other && typeof other === "object") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cmpValue = this._key === (other as any).key ? EQUAL : NOT_EQUAL;
      }
    }
    return new CResult(cmpValue);
  }

  get key(): TKey {
    return this._key;
  }

  get value(): T {
    return this._value;
  }
}
