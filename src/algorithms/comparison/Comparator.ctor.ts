import { Comparator } from "./Comparator.type";
import {
  NOT_LESS,
  NOT_EQUAL,
  NOT_GREATER,
  INCOMPARABLE,
  EQUAL,
  GREATER,
  LESS,
} from "./Comparison.type";

export const createComparator = <T>({
  less = undefined,
  equal = undefined,
  greater = undefined,
}: {
  less?: Comparator<T, boolean>;
  equal?: Comparator<T, boolean>;
  greater?: Comparator<T, boolean>;
  // eslint-disable-next-line sonarjs/cognitive-complexity
} = {}): Comparator<T> => {
  if (less && !equal && !greater) {
    return (f: T, s: T) => (less(f, s) ? LESS : NOT_LESS);
  } else if (!less && equal && !greater) {
    return (f: T, s: T) => (equal(f, s) ? EQUAL : NOT_EQUAL);
  } else if (less && equal && !greater) {
    return (f: T, s: T) => {
      if (less(f, s)) return LESS;
      else if (equal(f, s)) return EQUAL;
      else return GREATER;
    };
  } else if (!less && !equal && greater) {
    return (f: T, s: T) => (greater(f, s) ? GREATER : NOT_GREATER);
  } else if (less && !equal && greater) {
    return (f: T, s: T) => {
      if (less(f, s)) return LESS;
      else if (greater(f, s)) return GREATER;
      else return EQUAL;
    };
  } else if (less && equal && greater) {
    return (f: T, s: T) => {
      if (less(f, s)) return LESS;
      else if (equal(f, s)) return EQUAL;
      else if (greater(f, s)) return GREATER;
      else return INCOMPARABLE;
    };
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (f: T, s: T) => INCOMPARABLE;
  }
};
