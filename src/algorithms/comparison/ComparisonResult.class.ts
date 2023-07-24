import { Result } from "../../fp";
import {
  ComparisonType,
  Equal,
  Greater,
  Less,
  LESS,
  EQUAL,
  GREATER,
  INCOMPARABLE,
  NOT_EQUAL,
  NOT_GREATER,
  NOT_LESS,
  NotEqual,
  NotGreater,
  NotLess,
} from "./Comparison.type";
import { IncomparableTypeError } from "./IncomparableTypeError.class";

export class CResult extends Result<ComparisonType> {
  static readonly INCOMPARABLE = INCOMPARABLE;
  static readonly LESS: Less = LESS;
  static readonly EQUAL: Equal = EQUAL;
  static readonly GREATER: Greater = GREATER;
  static readonly NOT_LESS: NotLess = NOT_LESS;
  static readonly NOT_EQUAL: NotEqual = NOT_EQUAL;
  static readonly NOT_GREATER: NotGreater = NOT_GREATER;

  constructor(value: ComparisonType) {
    value !== INCOMPARABLE ? super(value) : super(new IncomparableTypeError());
  }

  isIncomparable(): boolean {
    return Boolean(this._error);
  }

  isLess(): boolean {
    return this._value === CResult.LESS;
  }

  isEqual(): boolean {
    return this._value === CResult.EQUAL;
  }

  isGreater(): boolean {
    return this._value === CResult.GREATER;
  }

  IsNotLess(): boolean {
    return this._value !== CResult.LESS;
  }

  IsNotEqual(): boolean {
    return this._value !== CResult.EQUAL;
  }

  IsNotGreater(): boolean {
    return this._value !== CResult.GREATER;
  }

  static createAsEqual(): CResult {
    return new CResult(CResult.EQUAL);
  }

  static createAsLess(): CResult {
    return new CResult(CResult.LESS);
  }

  static createAsGreater(): CResult {
    return new CResult(CResult.GREATER);
  }

  static createAsNotEqual(): CResult {
    return new CResult(CResult.NOT_EQUAL);
  }

  static createAsNotLess(): CResult {
    return new CResult(CResult.NOT_LESS);
  }

  static createAsNotGreater(): CResult {
    return new CResult(CResult.NOT_GREATER);
  }

  static createAsIncomparable(): CResult {
    return new CResult(CResult.INCOMPARABLE);
  }
}
