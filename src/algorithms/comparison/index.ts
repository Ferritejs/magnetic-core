export { Comparator } from "./Comparator.type";
export {
  ComparisonType,
  Less,
  LESS,
  NotLess,
  NOT_LESS,
  Equal,
  EQUAL,
  NotEqual,
  NOT_EQUAL,
  Greater,
  GREATER,
  NOT_GREATER,
  NotGreater,
  Incomparable,
  INCOMPARABLE,
} from "./Comparison.type";
export { CResult } from "./ComparisonResult.class";
export { IComparable } from "./Comparable.iface";
export { IComparableWrapper } from "./ComparableWrapper.iface";
export { ComparableWrapper } from "./ComparableWrapper.class";
export { IncomparableTypeError } from "./IncomparableTypeError.class";
export { createComparator } from "./Comparator.ctor";

export {
  isLess,
  isEqual,
  isGreater,
  isNotLess,
  isNotEqual,
  isNotGreater,
  isIncomparable,
  compare,
} from "./comparison.impl";

import * as comparison from "./comparison.module";
export default comparison;
