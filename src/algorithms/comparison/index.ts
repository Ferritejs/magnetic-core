export { IComparable } from "./Comparable.iface";
export { CResult } from "./ComparisonResult.class";
export { ComparisonType, LESS, EQUAL, GREATER } from "./Comparison.type";
export { IComparableWrapper } from "./ComparableWrapper.iface";
export { ComparableWrapper } from "./ComparableWrapper.class";
export { IncomparableTypeError } from "./IncomparableTypeError.class";
export { createComparator } from "./Comparator.ctor";

export { isLess, isEqual, isGreater } from "./comparison.impl";

import * as comparison from "./comparison.module";
export default comparison;
