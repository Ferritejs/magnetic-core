import { IResult } from "./Result.iface";

/**
 * @todo add comments
 */
export class Result<T = unknown, E extends Error = Error>
  implements IResult<T, E>
{
  protected _value: T | null = null;
  protected _error: E | null = null;

  constructor(value: T | E) {
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

  get ok(): T | null {
    return this._value;
  }

  get error(): E | null {
    return this._error;
  }

  then(callback: (value: T) => void): IResult<T, E> {
    if (this.isOk()) {
      callback(this._value as T);
    }
    return this;
  }

  catch(callback: (error: E) => void): IResult<T, E> {
    if (this.isError()) {
      callback(this._error as E);
    }
    return this;
  }

  pipe<TReturn>(
    fn: (value: T) => TReturn,
  ): IResult<TReturn> | Promise<Result<TReturn>> | IResult<T> {
    return this.isOk() ? Result.Try(fn, this._value as T) : this;
  }

  unwrap(): [T | null, E | null] {
    return [this._value, this._error];
  }

  toJSON(): { ok: T | null; error: E | null } {
    return {
      ok: this._value,
      error: this._error,
    };
  }

  static Try<TArg, TReturn>(
    fn: (...arg: TArg[]) => TReturn | Promise<TReturn>,
    ...args: TArg[]
  ): Result<TReturn> | Promise<Result<TReturn>> {
    try {
      const ret = fn(...args);
      return !(ret instanceof Promise)
        ? new Result(ret)
        : new Promise((resolve) => {
            ret
              .then((res) => resolve(new Result(res)))
              .catch((err) => {
                const error =
                  err instanceof Error ? err : new Error(String(err));
                resolve(new Result<TReturn>(error));
              });
          });
    } catch (e) {
      return new Result<TReturn>(e instanceof Error ? e : new Error(String(e)));
    }
  }
}
