import { Comparator } from "./Comparator.type";
import {
  ComparisonType,
  LESS,
  EQUAL,
  GREATER,
  INCOMPARABLE,
  NOT_EQUAL,
  NOT_GREATER,
  NOT_LESS,
} from "./Comparison.type";

export const isLess = (value: ComparisonType) => value === LESS;
export const isEqual = (value: ComparisonType) => value === EQUAL;
export const isGreater = (value: ComparisonType) => value === GREATER;
export const isIncomparable = (value: ComparisonType) => value === INCOMPARABLE;
