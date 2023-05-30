/**
 * @todo add comments
 */
export interface IResult<T, E extends Error = Error> {
  ok: T | null;
  error: E | null;
  isOk(): boolean;
  isError(): boolean;
  then(callback: (value: T) => void): IResult<T, E>;
  catch(callback: (error: E) => void): IResult<T, E>;
  pipe<TReturn>(
    fn: (value: T) => TReturn,
  ): IResult<TReturn> | Promise<IResult<TReturn>> | IResult<T>;
  unwrap(): [T | null, E | null];
  toJSON(): { ok: T | null; error: E | null };
}
