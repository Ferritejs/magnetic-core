export type Incomparable = -3;
export type Less = -1;
export type Equal = 0;
export type Greater = 1;

export type NotLess = 2;
export type NotEqual = 3;
export type NotGreater = 4;

export const INCOMPARABLE: Incomparable = -3;
export const LESS: Less = -1;
export const EQUAL: Equal = 0;
export const GREATER: Greater = 1;
export const NOT_LESS: NotLess = 2;
export const NOT_EQUAL: NotEqual = 3;
export const NOT_GREATER: NotGreater = 4;

export type ComparisonType =
  | Incomparable
  | Less
  | Equal
  | Greater
  | NotLess
  | NotEqual
  | NotGreater;
