import { IComparable } from "./Comparable.iface";
import { Comparator } from "./Comparator.type";
import { CResult } from "./ComparisonResult.class";

export interface IComparableWrapper<T> extends IComparable<T> {
  value: T;
  compare(other: T, comparator?: Comparator<T>): CResult;
}
