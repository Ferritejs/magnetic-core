/* eslint-disable @typescript-eslint/no-explicit-any */
import { Monad } from "./Monad.iface";
import { AMonad } from "./AMonad.class";
import { Option } from "./Option.class";

export class Result<T = any, E extends Error = Error>
  extends AMonad<T>
  implements Monad<T>
{
  protected _error: E | null = null;

  constructor(value: T | E) {
    super();
    if (value instanceof Error) {
      this._error = value;
    } else {
      this._value = value;
    }
  }

  isOk(): boolean {
    return this._error === null;
  }

  isError(): boolean {
    return this._error !== null;
  }

  get ok(): Option<T> {
    return new Option<T>(this._value);
  }

  get error(): Option<E> {
    return new Option<E>(this._error);
  }

  promisify(): Promise<T> {
    return new Promise((resolve, reject) => {
      if (this.isOk()) {
        resolve(this._value as T);
      } else {
        reject(this._error as E);
      }
    });
  }

  toThenable(): TResult<T, E> {
    const arg = this.isOk() ? (this._value as T) : (this._error as E);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return new TResult<T, E>(arg);
  }

  bind<U>(fn: (v: T) => Monad<U>): Monad<U> {
    return this.isOk() ? fn(this._value as T) : new Option<U>();
  }

  pipe<U, TReturn extends Promise<U> | U = U>(
    fn: (value: T) => TReturn,
  ): TReturn extends Promise<U> ? Promise<Result<U>> : Result<U> {
    return (
      this.isOk()
        ? Result.Try(fn, this._value as T)
        : new Result<U>(this._error as E)
    ) as TReturn extends Promise<U> ? Promise<Result<U>> : Result<U>;
  }

  unwrap(): T {
    if (this._error) {
      throw this._error;
    }
    return this._value as T;
  }

  toTuple(): [T | null, E | null] {
    return [this._value, this._error];
  }

  toJSON(): { ok: T | null; error: E | null } {
    return {
      ok: this._value,
      error: this._error,
    };
  }

  static createFrom<T = any, E extends Error = Error>({
    ok = undefined,
    error = undefined,
  }: {
    ok?: T | null;
    error?: E | null;
  }): Result<T, E> | Result<Option<T>, E> {
    let result: Result<T, E> | Result<Option<T>, E>;
    if (error instanceof Error) {
      result = new Result<T, E>(error);
    } else if (ok !== null && ok !== undefined) {
      result = new Result<T, E>(ok);
    } else {
      result = new Result<Option<T>, E>(new Option());
    }
    return result;
  }

  static Try<T, TReturn extends Promise<T> | T = T>(
    fn: (...arg: any[]) => TReturn,
    ...args: any[]
  ): TReturn extends Promise<T> ? Promise<Result<T>> : Result<T> {
    try {
      const ret = fn(...args);
      return !(ret instanceof Promise)
        ? (new Result<T>(ret as T) as TReturn extends Promise<T>
            ? Promise<Result<T>>
            : Result<T>)
        : (new Promise((resolve) => {
            ret
              .then((res) => resolve(new Result(res)))
              .catch((err) => {
                const error =
                  err instanceof Error ? err : new Error(String(err));
                resolve(new Result<T>(error));
              });
          }) as TReturn extends Promise<T> ? Promise<Result<T>> : Result<T>);
    } catch (e) {
      return new Result<T>(
        e instanceof Error ? e : new Error(String(e)),
      ) as TReturn extends Promise<T> ? Promise<Result<T>> : Result<T>;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class TResult<T = any, E extends Error = Error> extends Result<T, E> {
  then(
    onFulfilled: (value: T) => void,
    onRejected?: (error: E) => void,
  ): TResult<T, E> {
    if (this.isOk()) {
      onFulfilled(this._value as T);
    } else {
      onRejected?.(this._error as E);
    }
    return this;
  }

  toResult(): Result<T, E> {
    const value = this._value ?? this._error;
    return new Result<T, E>(value as T | E);
  }

  catch(onRejected: (error: E) => void): TResult<T, E> {
    if (this.isError()) {
      onRejected(this._error as E);
    }
    return this;
  }

  finally(onFinally: () => void): TResult {
    onFinally();
    return this;
  }
}
