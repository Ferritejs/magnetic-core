import { Comparator } from "./Comparator.type";
import { CResult } from "./ComparisonResult.class";

export interface IComparable<T = unknown> {
  compare(
    other: T | IComparable<T>,
    comparator?: Comparator<T | IComparable<T>>,
  ): CResult;
}
