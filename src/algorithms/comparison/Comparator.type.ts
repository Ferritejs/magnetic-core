import { ComparisonType } from "./Comparison.type";

export type Comparator<T, TRet = ComparisonType> = (
  first: T,
  second: T,
) => TRet;
