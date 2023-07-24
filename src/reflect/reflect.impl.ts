/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TResult } from "../fp";
import {
  CResult,
  IComparable,
  EQUAL,
  NOT_EQUAL,
  ComparableWrapper,
  Comparator,
  ComparisonType,
  GREATER,
  INCOMPARABLE,
  LESS,
} from "../algorithms/comparison";
import {
  IIdentifiableWrapper,
  IdentifiableWrapper,
  Key,
} from "../algorithms/identification";
import { BuiltInTypeName } from "./BuiltInTypeName.type";
import { Type } from "./Type.enum";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ReflectType<T = any> implements IComparable<ReflectType<T>> {
  protected _type: string;
  protected _builtInType: string;
  protected _typeOf: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected _constructor?: new (...args: any[]) => T = undefined;
  protected _value: T;

  constructor(value: T) {
    this._value = value;
    this._typeOf = typeof value;
    this._type = Object.prototype.toString
      .call(value)
      .replace(/\[object |]/g, "");

    if (value === null) {
      this._builtInType = Type.Null;
    } else if (value === undefined) {
      this._builtInType = Type.Undefined;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this._constructor = (value as any).constructor;
      if (this._typeOf === "function" || this._typeOf === "object") {
        this._builtInType = Type.Object;
      } else if (this._typeOf === "string") {
        this._builtInType = Type.String;
      } else if (this._typeOf === "number") {
        this._builtInType = Type.Number;
      } else if (this._typeOf === "bigint") {
        this._builtInType = Type.BigInt;
      } else {
        this._builtInType = Type.Symbol;
      }
    }
  }

  /**
   * typeof value
   */
  get typeOf(): string {
    return this._typeOf;
  }

  /**
   * extended type
   */
  get type(): string {
    return this._type;
  }

  /**
   * Javascript types:
   *  Undefined | Boolean | Number | String | BigInt | Symbol | Null | Object
   */
  get builtInType(): string {
    return this._builtInType;
  }

  /**
   * A constructor of a value T
   */
  get constructorOf(): (new (...args: any[]) => T) | undefined {
    return this._constructor;
  }

  /**
   * Constructs an item of ReflectValue<T>
   * If T is Object it will returns ReflectObject which extends ReflectValue
   */
  get reflectValue():
    | ReflectObject<T extends object ? T : object>
    | ReflectValue<T> {
    return this.isObject()
      ? new ReflectObject<T extends object ? T : object>(
          this._value as T extends object ? T : object,
        )
      : new ReflectValue(this._value);
  }

  /**
   * Compares two items of ReflectType
   * @param other
   * @returns `comparison.CResult` with a value of `comparison.ComparisonType`: `comparison.EQUAL` | `comparison.NOT_EQUAL`
   */
  compare(other: ReflectType<T>): CResult {
    return new CResult(this._type === other._type ? EQUAL : NOT_EQUAL);
  }

  /**
   * Returns true if a type is one of primitives
   * @returns `boolean`
   */
  isPrimitive(): boolean {
    return (
      this._builtInType === Type.Null ||
      this._builtInType === Type.Undefined ||
      this._builtInType === Type.Boolean ||
      this._builtInType === Type.Number ||
      this._builtInType === Type.BigInt ||
      this._builtInType === Type.String ||
      this._builtInType === Type.Symbol
    );
  }

  isObject(): boolean {
    return this._builtInType === Type.Object;
  }

  isAsyncFunction(): boolean {
    return this._type === Type.AsyncFunction;
  }

  isFunction(): boolean {
    return this._type === Type.Function || this._type === Type.AsyncFunction;
  }

  isArray(): boolean {
    return this._type === Type.Array;
  }

  isNull(): boolean {
    return this._type === Type.Null;
  }

  isBoolean(): boolean {
    return this._type === Type.Boolean;
  }

  isNumber(): boolean {
    return this._type === Type.Number;
  }

  isBigInt(): boolean {
    return this._type === Type.BigInt;
  }

  isIntegral(): boolean {
    return this.isNumber() || this.isBigInt();
  }

  isUndefined(): boolean {
    return this._type === Type.Undefined;
  }

  isMap(): boolean {
    return this._type === Type.Map;
  }

  isSet(): boolean {
    return this._type === Type.Set;
  }

  isWeakSet(): boolean {
    return this._type === Type.WeakSet;
  }

  isWeakMap(): boolean {
    return this._type === Type.WeakMap;
  }

  isPromise(): boolean {
    return this._type === Type.Promise;
  }

  isString(): boolean {
    return this._type === Type.String;
  }

  isSymbol(): boolean {
    return this._type === Type.Symbol;
  }

  isComparableType(): boolean {
    return (
      this.isComparable() ||
      this._builtInType === Type.Number ||
      this._builtInType === Type.String ||
      this._builtInType === Type.Symbol ||
      this._builtInType === Type.BigInt
    );
  }

  isComparable(): boolean {
    return (
      this._value instanceof ComparableWrapper ||
      (this._builtInType === Type.Object &&
        typeof (this._value as any).compare === "function")
    );
  }

  isIdentifiable(): boolean {
    let is: boolean;
    if (this._value instanceof IdentifiableWrapper) {
      is = true;
    } else if (this._builtInType === Type.Object) {
      const typeOf = typeof (this._value as any).key;
      is =
        typeOf === "number" ||
        typeOf === "bigint" ||
        typeOf === "string" ||
        typeOf === "symbol";
    } else {
      is = false;
    }
    return is;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isInstanceOf<T = any>(ctor: new (...args: any[]) => T): boolean {
    return this._constructor?.name === ctor.name;
  }

  isTypeOf(
    typeOf:
      | "bigint"
      | "boolean"
      | "function"
      | "number"
      | "object"
      | "string"
      | "symbol"
      | "undefined",
  ): boolean {
    return this._typeOf === typeOf;
  }

  isBuiltInTypeOf(typeName: BuiltInTypeName): boolean {
    return this._builtInType === typeName;
  }

  toString(): string {
    return this._type;
  }

  valueOf(): string {
    return this._type;
  }

  toJSON(): string {
    return this._type;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ReflectValue<T = any> implements IComparable<T> {
  protected _value: T;
  protected _type: ReflectType<T> | undefined = undefined;

  constructor(value: T) {
    this._value = value;
  }

  /**
   *
   * @param n1
   * @param n2
   * @returns
   */
  protected _compareNumbers(n1: number, n2: number): CResult {
    let compValue: ComparisonType;
    if (n1 < n2) compValue = LESS;
    else if (n1 === n2) compValue = EQUAL;
    else if (n1 > n2) compValue = GREATER;
    else compValue = INCOMPARABLE;
    return new CResult(compValue);
  }

  /**
   *
   * @param other
   * @param comparator
   * @returns
   */
  compare(
    other: T | ReflectValue<T>,
    comparator?: Comparator<T | IComparable<T>> | undefined,
  ): CResult {
    let result: CResult;
    const value = other instanceof ReflectValue ? other._value : other;

    if (comparator) {
      // optional comparator is set and it will compare two values
      result = new CResult(comparator(this._value, value));
    } else if (this.reflectType.isComparable()) {
      // the property is a comparable object
      result = (this._value as IComparable<T>).compare(value);
    } else if (
      this.reflectType.isIdentifiable() &&
      typeof value === "object" &&
      (value as any).key !== undefined
    ) {
      // if objects are comparable it will try to compare keys of objects
      result = new CResult(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (value as any).key === (this._value as any).key ? EQUAL : NOT_EQUAL,
      );
    } else {
      // try to compare numbers
      if (this.reflectType.isNumber()) {
        result = this._compareNumbers(
          (this._value as number).valueOf(),
          (value as number).valueOf(),
        );
      } else {
        // a simple comparison, this is the default case
        result = new CResult(this._value === value ? EQUAL : NOT_EQUAL);
      }
    }
    return result;
  }

  /**
   * Wraps a value `T` in `ComparableWrapper<T>` and returns a new reflect value
   * @param comparator `Comparator<T>`
   * @returns `Reflect<ComparableWrapper<T>>`
   */
  toComparable(comparator: Comparator<T>): ReflectValue<ComparableWrapper<T>> {
    return new ReflectValue(new ComparableWrapper(this._value, comparator));
  }

  /**
   * Wraps a value `T` in `IdentifiableWrapper<Key, T>` and returns a new reflect value
   * @param key `Key`
   * @returns `Reflect<IdentifiableWrapper<T>>`
   */
  toIdentifiable(key: Key): ReflectValue<IdentifiableWrapper<Key, T>> {
    return new ReflectValue(new IdentifiableWrapper<Key, T>(key, this._value));
  }

  /**
   * Try to convert the reflect value to a reflect object
   * @return `TResult<ReflectObject<T>>`
   */
  get reflectObject(): TResult<ReflectObject<T extends object ? T : object>> {
    if (this.reflectType.isObject()) {
      return new TResult(
        new ReflectObject<T extends object ? T : object>(
          this._value as T extends object ? T : object,
        ),
      );
    } else {
      return new TResult<ReflectObject<T extends object ? T : object>>(
        new TypeError(
          `Type ${this.reflectType} is not assignable ot type ${Type.Object}`,
        ),
      );
    }
  }

  /**
   * A raw value
   * @type `T`
   */
  get value(): T {
    return this._value;
  }

  /**
   * A reflect type of the reflect value
   * @type `ReflectType<T>`
   */
  get reflectType(): ReflectType<T> {
    if (!this._type) {
      this._type = new ReflectType<T>(this._value);
    }
    return this._type;
  }

  valueOf(): T {
    return this._value;
  }

  toString(): string {
    return String(this._value);
  }

  toJSON(): T {
    return this._value;
  }
}

export class ReflectObject<T extends object> {
  protected _item: T;

  constructor(item: T) {
    this._item = item;
  }

  *[Symbol.iterator](): Generator<
    IIdentifiableWrapper<string | symbol, ReflectValue<any>>
  > {
    const keys = this.allKeys();
    for (const key of keys) {
      yield { key, value: new ReflectValue((this._item as any)[key]) };
    }
  }

  static construct<A extends readonly any[], R>(
    ctor: new (...args: A) => R,
    args: Readonly<A>,
    proto?: (new (...args: any) => any) | undefined,
  ) {
    return Reflect.construct(ctor, args, proto);
  }

  static apply<T, A extends readonly any[], R>(
    callee: (this: T, ...args: A) => R,
    thisArgument: T,
    args: Readonly<A>,
  ) {
    return Reflect.apply(callee, thisArgument, args);
  }

  get reflectObject(): ReflectObject<T> {
    return this;
  }

  defineProperty(
    propertyKey: PropertyKey,
    attributes: PropertyDescriptor,
  ): boolean {
    return Reflect.defineProperty(this._item, propertyKey, attributes);
  }

  deleteProperty(propertyKey: PropertyKey): boolean {
    return Reflect.deleteProperty(this._item, propertyKey);
  }

  get(
    propertyKey: PropertyKey,
    receiver?: any,
  ):
    | (string extends keyof T ? T[keyof T & string] : any)
    | (number extends keyof T ? T[keyof T & number] : any)
    | (symbol extends keyof T ? T[keyof T & symbol] : any) {
    return Reflect.get(this._item, propertyKey, receiver);
  }

  set(
    propertyKey: PropertyKey,
    value:
      | (string extends keyof T ? T[keyof T & string] : any)
      | (number extends keyof T ? T[keyof T & number] : any)
      | (symbol extends keyof T ? T[keyof T & symbol] : any),
    receiver?: any,
  ) {
    return Reflect.set(this._item, propertyKey, value, receiver);
  }

  getOwnPropertyDescriptor(
    propertyKey: PropertyKey,
  ):
    | TypedPropertyDescriptor<
        | (string extends keyof T ? T[keyof T & string] : any)
        | (number extends keyof T ? T[keyof T & number] : any)
        | (symbol extends keyof T ? T[keyof T & symbol] : any)
      >
    | undefined {
    return Reflect.getOwnPropertyDescriptor(this._item, propertyKey);
  }

  getPrototypeOf(): object | null {
    return Reflect.getPrototypeOf(this._item);
  }

  setPrototypeOf(proto: object | null): boolean {
    return Reflect.setPrototypeOf(this._item, proto);
  }

  has(propertyKey: PropertyKey): boolean {
    return Reflect.has(this._item, propertyKey);
  }

  isExtensible(): boolean {
    return Reflect.isExtensible(this._item);
  }

  preventExtensions(): boolean {
    return Reflect.preventExtensions(this._item);
  }

  ownKeys(): (string | symbol)[] {
    return Reflect.ownKeys(this._item);
  }

  allKeys(): (string | symbol)[] {
    let obj = this._item as { __proto__: any };
    let keys: (string | symbol)[] = [];
    while (obj.__proto__ !== null) {
      keys = keys.concat(Reflect.ownKeys(obj));
      obj = obj.__proto__;
    }
    return keys;
  }

  isComparable(): boolean {
    return (this._item as any).compare === "function";
  }

  isIdentifiable(): boolean {
    const type = (this._item as any).key;
    return type === "number" || type === "symbol" || type === "string";
  }
}
