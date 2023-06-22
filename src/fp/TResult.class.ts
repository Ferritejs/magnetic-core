import { Result } from "./Result.class";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class TResult<T = any, E extends Error = Error> extends Result<T, E> {
  then(callback: (value: T) => void): TResult<T, E> {
    if (this.isOk()) {
      callback(this._value as T);
    }
    return this;
  }

  catch(callback: (error: E) => void): TResult<T, E> {
    if (this.isOk()) {
      callback(this._error as E);
    }
    return this;
  }
}

export default TResult;
