import { TResult } from "../../fp";

export type Translator<T, TReturn> = (data: T) => Promise<TResult<TReturn>>;
