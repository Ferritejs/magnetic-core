/* eslint-disable @typescript-eslint/no-explicit-any */
import { IComparableWrapper } from "./ComparableWrapper.iface";
import { Comparator } from "./Comparator.type";
import { CResult } from "./ComparisonResult.class";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ComparableWrapper<T = any>
  // extends AMonad<T>
  implements IComparableWrapper<T>
{
  protected _cmp: Comparator<T>;
  protected _value: T;

  constructor(value: T, comparator: Comparator<T>) {
    this._value = value;
    this._cmp = comparator;
  }

  get value(): T {
    return this._value;
  }

  compare(
    other: T | IComparableWrapper<T>,
    comparator?: Comparator<T> | undefined,
  ): CResult {
    const value =
      other &&
      typeof other !== "object" &&
      typeof (other as any).compare === "function"
        ? ((other as any).value as T)
        : (other as T);
    return comparator
      ? new CResult(comparator(this._value, value))
      : new CResult(this._cmp(this._value, value));
  }
}
