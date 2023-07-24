import {
  ComparisonType,
  LESS,
  EQUAL,
  GREATER,
  INCOMPARABLE,
} from "./Comparison.type";
import { CResult } from "./ComparisonResult.class";
import { ReflectType } from "../../reflect/ReflectType.class";
import { Integral } from "../../types";

export const isLess = (value: ComparisonType) => value === LESS;
export const isEqual = (value: ComparisonType) => value === EQUAL;
export const isGreater = (value: ComparisonType) => value === GREATER;
export const isIncomparable = (value: ComparisonType) => value === INCOMPARABLE;
export const isNotLess = (value: ComparisonType) => value !== LESS;
export const isNotEqual = (value: ComparisonType) => value !== EQUAL;
export const isNotGreater = (value: ComparisonType) => value !== GREATER;

/**
 *
 * @param f
 * @param s
 * @returns
 */
export const compareIntegral = <TNumber extends Integral = number>(
  f: TNumber,
  s: TNumber,
): CResult => {
  let compValue: ComparisonType;
  if (f < s) compValue = LESS;
  else if (f === s) compValue = EQUAL;
  else if (f > s) compValue = GREATER;
  else compValue = INCOMPARABLE;
  return new CResult(compValue);
};

export const compare = <T extends bigint | number | string | symbol>(
  f: T,
  s: T,
): CResult => {
  const rt1 = new ReflectType(f);
  const rt2 = new ReflectType(s);
  let result: CResult;
  if (rt1.isIntegral() && rt2.isIntegral()) {
    result = compareIntegral(f as number, s as number);
  } else {
    result = rt1.compare(rt2);
  }
  return result.isEqual() ? result : new CResult(INCOMPARABLE);
};
